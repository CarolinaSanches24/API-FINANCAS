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
const exibirTransacoes = async (req, res) => {
  try {
    const listaTransacoes = await knex("transacoes as t")
      .select(
        "t.id",
        "t.tipo",
        "t.descricao",
        "t.valor",
        "t.data",
        "t.usuario_id",
        "t.categoria_id",
        "c.descricao as categoria_nome"
      )
      .join("categorias as c", "t.categoria_id", "c.id")
      .where("t.usuario_id", req.usuario.id);

    const { filtro } = req.query;

    if (filtro) {
      const listaTransacoesFiltro = await knex("transacoes as t")
        .select(
          "t.id",
          "t.tipo",
          "t.descricao",
          "t.valor",
          "t.data",
          "t.usuario_id",
          "t.categoria_id",
          "c.descricao as categoria_nome"
        )
        .join("categorias as c", "t.categoria_id", "c.id")
        .where("t.usuario_id", req.usuario.id)
        .andWhere(function () {
          if (Array.isArray(filtro)) {
            this.whereRaw(`c.descricao SIMILAR TO '%(${filtro.join("|")})%'`);
          } else {
            this.whereRaw(`c.descricao ilike '%${filtro}%'`);
          }
        });

      return res.status(200).json(listaTransacoesFiltro);
    }
    return res.status(200).json(listaTransacoes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};

const exibirTransacao = async (req, res) => {
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
      .update({
        tipo,
        descricao,
        valor,
        data,
        usuario_id: req.usuario.id,
        categoria_id,
      })
      .where({ id })
      .andWhere("usuario_id", req.usuario.id);

    return res.status(204).send();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const excluirTransacao = async (req, res) => {
  const { id } = req.params;
  try {
    const trasacao = await knex("transacoes")
      .where({ id })
      .andWhere("usuario_id", req.usuario.id)
      .del();

    return res.status(204).send();
  } catch (error) {
    res.status(500).json({ messagem: "Erro interno do servidor" });
  }
};

const exibirExtrato = async (req, res) => {
  try {
    const entradas = await knex("transacoes")
      .sum("valor as entrada")
      .where({ tipo: "entrada" })
      .andWhere("usuario_id", req.usuario.id);

    const saidas = await knex("transacoes")
      .sum("valor as saida")
      .where({ tipo: "saida" })
      .andWhere("usuario_id", req.usuario.id);

    const extrato = {
      entrada: entradas[0].entrada || 0,
      saida: saidas[0].saida || 0,
    };

    return res.status(200).json(extrato);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor " });
  }
};

module.exports = {
  exibirTransacoes,
  exibirTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  exibirExtrato,
};
