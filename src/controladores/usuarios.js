const knex = require("../configuracao/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuarioExiste = await knex("usuarios").where({ email }).first();

    if (usuarioExiste) {
      return res
        .status(400)
        .json({ mensagem: "Já existe usuário com o e-mail informado" });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(senha, saltRounds);

    const novoUsuario = await knex("usuarios")
      .insert({
        nome,
        email,
        senha: hash,
      })
      .returning(["id", "nome", "email"]);

    return res.status(201).json(novoUsuario);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuarioExiste = await knex("usuarios").where({ email }).first();

    if (!usuarioExiste) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    const senhaValida = bcrypt.compare(senha, usuarioExiste.senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: "E-mail ou senha incorretos" });
    }

    const dadosTokenUsuario = {
      id: usuarioExiste.id,
      nome: usuarioExiste.nome,
    };
    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(dadosTokenUsuario, SECRET_KEY, { expiresIn: "8h" });
    delete usuarioExiste.senha;
    return res.status(200).json({
      usuario: usuarioExiste,
      token,
    });
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro intern do servidor" });
  }
};

const exibirUsuario = async (req, res) => {
  try {
    return res.status(200).json(req.usuario);
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const { id } = req.usuario;

    if (email !== req.usuario.email) {
      const emailUsuarioExiste = await knex("usuarios")
        .where({ email })
        .first();
      if (emailUsuarioExiste) {
        return res.status(400).json({ mensagem: "O Email já existe" });
      }
    }

    const saltRounds = 12;
    const hash = bcrypt.hashSync(senha, saltRounds);

    const usuarioAtualizado = await knex("usuarios").where({ id }).update({
      nome,
      email,
      senha: hash,
    });

    return res
      .status(200)
      .json({ mensagem: "Usuário foi atualizado com sucesso" });
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
const excluirUsuario = async (req, res) => {
  const { id } = req.usuario;
  try {
    const usuarioExiste = await knex("usuarios").where({ id }).first();
    if (!usuarioExiste) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }
    const deletarUsuario = await knex("usuarios").where({ id }).del();
    return res.json({ mensagem: "Usuário excluido com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};
module.exports = {
  cadastrarUsuario,
  loginUsuario,
  exibirUsuario,
  atualizarUsuario,
  excluirUsuario,
};
