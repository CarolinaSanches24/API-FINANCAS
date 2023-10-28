const pool = require("../configuracao/conexao");

const exibirCategorias = async (req, res) => {
  try{
    const categorias = await pool.query(
      "select * from categorias"
    );
  
    return res.status(200).json(categorias.rows);
  }catch (erro) {
    return res.status(500).json({ mensagem: "Erro no servidor"});
  }
};

module.exports = {
  exibirCategorias
};