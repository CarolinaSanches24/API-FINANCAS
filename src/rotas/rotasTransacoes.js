const express = require("express");
const {
  validarCamposObrigatorios,
  verificaSeNumeroTransacaoExiste,
  verificarSeCategoriaExiste,
} = require("../intermediarios/validacoesTransacoes");

const {
  listarTransacoes,
  exibirTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  consultarExtrato,
} = require("../controladores/transacoes");

const rotas = express();

rotas.post("/transacao", cadastrarTransacao);
// rotas.get("/transacao", listarTransacoes);
// rotas.get("/transacao/extrato", consultarExtrato);
rotas.get("/transacao/:id", verificaSeNumeroTransacaoExiste, exibirTransacao);

rotas.put(
  "/transacao/:id",
  verificaSeNumeroTransacaoExiste,
  atualizarTransacao
);
rotas.delete(
  "/transacao/:id",
  verificaSeNumeroTransacaoExiste,
  excluirTransacao
);

module.exports = rotas;
