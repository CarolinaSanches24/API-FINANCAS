const express = require("express");
const {
  cadastrarUsuario,
  loginUsuario,
  exibirUsuario,
  atualizarUsuario,
  excluirUsuario,
} = require("../controladores/usuarios");
// const { autenticacao } = require("../intermediarios/autenticacao");
const validarCorpoRequisicao = require("../intermediarios/validarCorpoRequisicao");
const schemaUsuario = require("../schemas/schemaUsuario");

const rotas = express();

rotas.post("/usuario", validarCorpoRequisicao(schemaUsuario), cadastrarUsuario);
// rotas.post("/login", loginUsuario);

// rotas.use(autenticacao);
// rotas.get("/usuario", exibirUsuario);
// rotas.put("/usuario", atualizarUsuario);

module.exports = rotas;
