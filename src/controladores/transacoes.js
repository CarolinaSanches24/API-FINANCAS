const knex = require("../configuracao/conexao");

const cadastrarTransacao = async (req, res) => {
  const { tipo, descricao, valor, data, categoria_id } = req.body;

  const categoria = await knex("categorias")
    .columns(["descricao as categoria_nome"])
    .where("id", categoria_id)
    .first();
  if (!categoria) {
    return res.status(404).json({ mensagem: "Categoria não encontrada" });
  }
  if (tipo != "entrada" && tipo != "saida") {
    return res.status(400).json({ mensagem: "Tipo de Transação Inválida!" });
  }

  try {
    const transacao = await knex("transacoes")
      .insert({
        tipo,
        descricao,
        valor,
        data,
        usuario_id: req.usuario.id,
        categoria_id,
      })
      .returning("*");
    const novaTransacao = {
      ...transacao[0],
      ...categoria,
    };
    return res.json(novaTransacao);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
const listarTransacoes = async (req, res) => {
  try {
    const query = `select t.id, t.tipo, t.descricao, 
    t.valor, t.data, t.usuario_id, t.categoria_id , 
    c.descricao as categoria_nome
    from transacoes as t
    join categorias as c on t.categoria_id = c.id
    where t.usuario_id=$1;`;

    const params = [req.usuarioId];

    const filtros = req.query.filtro;

    if (filtros) {
      let query2 = `select t.id, t.tipo, t.descricao, 
      t.valor, t.data, t.usuario_id, t.categoria_id , 
      c.descricao as categoria_nome
      from transacoes as t
      join categorias as c on t.categoria_id = c.id
      where t.usuario_id=$1 `;

      let condicaoFiltro = "";
      if (Array.isArray(filtros)) {
        condicaoFiltro += ` and c.descricao SIMILAR TO '%(${filtros.join(
          "|"
        )})%' `;
      } else {
        condicaoFiltro += ` and c.descricao ilike '%${filtros}%'`;
      }

      const resultado = await pool.query(query2 + condicaoFiltro, [
        req.usuarioId,
      ]);

      res.json(resultado.rows);
    } else {
      const listaTransacoes = await pool.query(query, params);

      return res.status(200).json(listaTransacoes.rows);
    }
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};

const obterTransacao = async (req, res) => {
  const { id } = req.params;

  try {
    const transacao = await knex("transacoes")
      .select(
        "transacoes.id",
        "transacoes.tipo",
        "transacoes.descricao",
        "transacoes.valor",
        "transacoes.data",
        "transacoes.usuario_id",
        "transacoes.categoria_id",
        "categorias.descricao as categoria_nome"
      )
      .where("transacoes.id", id)
      .andWhere("transacoes.usuario_id", req.usuario.id)
      .leftJoin("categorias", "transacoes.categoria_id", "categorias.id");
    return res.status(200).json(transacao);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};

const atualizarTransacao = async (req, res) => {
  const { descricao, valor, data, categoria_id, tipo } = req.body;
  const { id } = req.params;

  try {
    const query = `update transacoes SET tipo = $1, descricao = $2,
    valor = $3, data = $4 ,categoria_id = $5 where usuario_id =$6 and id = $7`;
    const params = [
      tipo.toLowerCase(),
      descricao,
      valor,
      data,
      categoria_id,
      req.usuarioId,
      id,
    ];

    if (params[0] != "entrada" && params[0] != "saida") {
      return res.status(400).json({ mensagem: "Tipo de Transação Inválida!" });
    }

    await pool.query(query, params);

    return res.send();
  } catch (error) {
    res.status(500).json({ messagem: "Erro interno do servidor" });
  }
};

const excluirTransacao = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("delete from transacoes where id = $1 and usuario_id=$2", [
      id,
      req.usuarioId,
    ]);
    return res.status(200).send();
  } catch (error) {
    res.status(500).json({ messagem: "Erro interno do servidor" });
  }
};

const consultarExtrato = async (req, res) => {
  try {
    const entradas = await pool.query(
      `select sum(valor) entrada from transacoes where tipo=$1 and usuario_id=$2`,
      ["entrada", req.usuarioId]
    );

    const saidas = await pool.query(
      `select sum(valor) saida from transacoes where tipo=$1 and usuario_id=$2`,
      ["saida", req.usuarioId]
    );

    const extrato = {
      entrada: entradas.rows[0].entrada ? entradas.rows[0].entrada : 0,
      saida: saidas.rows[0].saida ? saidas.rows[0].saida : 0,
    };
    return res.status(200).json(extrato);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor " });
  }
};

module.exports = {
  listarTransacoes,
  obterTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  consultarExtrato,
};
