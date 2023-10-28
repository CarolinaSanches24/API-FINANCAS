const pool = require("../configuracao/conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validacaoCampo = (campo) => {
  if (campo === null || campo === "" || campo === undefined) {
    return true;
  } else {
    return false;
  }
};

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const emailValidado = validacaoCampo(email);
    const nomeValidado = validacaoCampo(nome);
    const senhaValidado = validacaoCampo(senha);

    if (emailValidado || nomeValidado || senhaValidado) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const usuarioExiste = await pool.query(
      "select count(*) from usuarios where email=$1",
      [email]
    );

    if (usuarioExiste.rows[0].count !== "0") {
      return res
        .status(400)
        .json({ mensagem: "Já existe usuário com o e-mail informado" });
    }

    const saltRounds = 12;
    const hash = bcrypt.hashSync(senha, saltRounds);

    const query = `insert into usuarios (nome, email, senha) values($1,$2,$3) returning *`;
    const params = [nome, email, hash];

    const usuario = await pool.query(query, params);

    return res.status(201).json({
      id: usuario.rows[0].id,
      nome: usuario.rows[0].nome,
      email: usuario.rows[0].email,
    });
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const emailValidado = validacaoCampo(email);
    const senhaValidado = validacaoCampo(senha);

    if (emailValidado || senhaValidado) {
      return res.status(400).json({ mensagem: "E-mail ou senha incorreto" });
    }
    const usuario = await pool.query("select * from usuarios where email=$1", [
      email,
    ]);

    if (usuario.rowCount === 0) {
      return res.status(400).json({ mensagem: "E-mail ou senha incorreto" });
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: "E-mail ou senha incorreto" });
    }

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ id: usuario.rows[0].id }, secretKey, {
      expiresIn: "8h",
    });

    return res.status(200).json({
      usuario: {
        id: usuario.rows[0].id,
        nome: usuario.rows[0].nome,
        email: usuario.rows[0].email,
      },
      token: token,
    });
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const exibirUsuario = async (req, res) => {
  try {
    const usuario = await pool.query("select * from usuarios where id=$1", [
      req.usuarioId,
    ]);

    return res.status(200).json({
      id: usuario.rows[0].id,
      nome: usuario.rows[0].nome,
      email: usuario.rows[0].email,
    });
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const emailValidado = validacaoCampo(email);
    const nomeValidado = validacaoCampo(nome);
    const senhaValidado = validacaoCampo(senha);

    if (emailValidado || nomeValidado || senhaValidado) {
      return res
        .status(400)
        .json({ mensagem: "Todos os campos são obrigatórios" });
    }

    const usuarioExiste = await pool.query(
      "select count(*) from usuarios where email=$1",
      [email]
    );

    if (usuarioExiste.rows[0].count !== "0") {
      return res.status(400).json({
        mensagem:
          "O e-mail informado já está sendo utilizado por outro usuário",
      });
    }

    const saltRounds = 12;
    const hash = bcrypt.hashSync(senha, saltRounds);

    const query = `update usuarios set nome=$1, email=$2, senha=$3 where id=$4 returning *`;
    const params = [nome, email, hash, req.usuarioId];

    const usuario = await pool.query(query, params);

    return res.status(204).send();
  } catch (erro) {
    return res.status(500).json({ mensagem: "Erro no servidor" });
  }
};

module.exports = {
  cadastrarUsuario,
  loginUsuario,
  exibirUsuario,
  atualizarUsuario,
};
