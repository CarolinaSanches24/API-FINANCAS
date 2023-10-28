const express = require("express");
const { exibirCategorias } = require("../controladores/categorias");

const rotas = express();

rotas.get("/categoria", exibirCategorias);

module.exports = rotas;
