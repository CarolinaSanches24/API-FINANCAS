const pool = require("../configuracao/conexao");
const validarCamposObrigatorios = async (req, res, next) => {
  const { tipo, descricao, valor, data, categoria_id } = req.body;
  try {
    if (!tipo || !descricao || !valor || !data || !categoria_id) {
      return res.status(400).json({
        mensagem: "Todos os campos obrigatórios devem ser informados.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};

const verificaSeNumeroTransacaoExiste = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rowCount } = await pool.query(
      "select *from transacoes where id=$1 and usuario_id = $2",
      [id, req.usuarioId]
    );
    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Transação não encontrada" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};
const verificarSeCategoriaExiste = async (req, res, next) => {
  const { categoria_id } = req.body;
  try {
    const { rowCount } = await pool.query(
      `select * from categorias where id=$1`,
      [categoria_id]
    );
    if (rowCount === 0) {
      return res.status(404).json({ mensagem: "Categoria não existe" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};
module.exports = {
  validarCamposObrigatorios,
  verificaSeNumeroTransacaoExiste,
  verificarSeCategoriaExiste,
};
