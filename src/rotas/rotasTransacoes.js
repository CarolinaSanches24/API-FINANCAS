const express = require("express");
const {
  validarCamposObrigatorios,
  verificaSeNumeroTransacaoExiste,
  verificarSeCategoriaExiste,
} = require("../intermediarios/validacoesTransacoes");

const {
  exibirTransacoes,
  exibirTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  exibirExtrato,
} = require("../controladores/transacoes");

const rotas = express();

rotas.post("/transacao", cadastrarTransacao);
rotas.get("/transacao", exibirTransacoes);
rotas.get("/transacao/extrato", exibirExtrato);
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
