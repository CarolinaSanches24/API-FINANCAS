require("dotenv").config();
const express = require("express");
const routes = require("./rotas/index");

const server = express();

server.use(express.json());

routes(server);

const porta = 3000;
server.listen(porta, () => {
  console.log("Servidor Rodando na Porta 3000");
});
