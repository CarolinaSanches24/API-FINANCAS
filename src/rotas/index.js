const rotasUsuarios = require("../rotas/rotasUsuario");
const rotasTransacoes = require("../rotas/rotasTransacoes");
const rotasCategoria = require("../rotas/rotasCategoria");

module.exports = app => {
  app.use(rotasUsuarios,
    rotasTransacoes,
    rotasCategoria)
};
