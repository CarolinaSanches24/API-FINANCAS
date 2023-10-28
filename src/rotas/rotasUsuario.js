const express = require("express");
const {
  cadastrarUsuario,
  loginUsuario,
  exibirUsuario,
  atualizarUsuario,
} = require("../controladores/usuarios");
const autenticacao = require("../intermediarios/autenticacao");

const rotas = express();

rotas.post("/usuario", cadastrarUsuario);
rotas.post("/login", loginUsuario);

rotas.use(autenticacao);
rotas.get("/usuario", exibirUsuario);
rotas.put("/usuario", atualizarUsuario);
module.exports = rotas;
