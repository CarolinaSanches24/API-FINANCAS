const knex = require("../configuracao/conexao");
const exibirCategorias = async (req, res) => {
  try {
    const categorias = await knex("categorias");

    return res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  exibirCategorias,
};
