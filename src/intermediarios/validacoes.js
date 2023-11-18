const knex = require("../configuracao/conexao");

const validarCorpoRequisicao = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
};

const verificaSeNumeroTransacaoExiste = async (req, res, next) => {
  const { id } = req.params;
  try {
    const transacao = await knex("transacoes")
      .where({ id })
      .andWhere("usuario_id", "=", req.usuario.id)
      .first();

    if (!transacao) {
      return res.status(404).json({ mensagem: "Transação não encontrada" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do Servidor" });
  }
};

module.exports = {
  verificaSeNumeroTransacaoExiste,
  validarCorpoRequisicao,
};
