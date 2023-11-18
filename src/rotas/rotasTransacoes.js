const express = require("express");
const {
  validarCorpoRequisicao,
  verificaSeNumeroTransacaoExiste,
} = require("../intermediarios/validacoes");

const {
  exibirTransacoes,
  exibirTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  exibirExtrato,
} = require("../controladores/transacoes");

const { schemaTrasacao } = require("../schemas/schemaTransacoes");

const rotas = express();

rotas.post(
  "/transacao",
  validarCorpoRequisicao(schemaTrasacao),
  cadastrarTransacao
);
rotas.get("/transacao", exibirTransacoes);
rotas.get("/transacao/extrato", exibirExtrato);
rotas.get("/transacao/:id", verificaSeNumeroTransacaoExiste, exibirTransacao);

rotas.put(
  "/transacao/:id",
  validarCorpoRequisicao(schemaTrasacao),
  verificaSeNumeroTransacaoExiste,
  atualizarTransacao
);
rotas.delete(
  "/transacao/:id",
  verificaSeNumeroTransacaoExiste,
  excluirTransacao
);

module.exports = rotas;
