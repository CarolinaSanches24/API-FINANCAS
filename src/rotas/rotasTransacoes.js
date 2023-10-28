const express = require("express");
const {
  validarCamposObrigatorios,
  verificaSeNumeroTransacaoExiste,
  verificarSeCategoriaExiste,
} = require("../intermediarios/validacoesTransacoes");

const {
  listarTransacoes,
  obterTransacao,
  cadastrarTransacao,
  atualizarTransacao,
  excluirTransacao,
  consultarExtrato,
} = require("../controladores/transacoes");

const rotas = express();

rotas.get("/transacao", listarTransacoes);
rotas.get("/transacao/extrato", consultarExtrato);
rotas.get("/transacao/:id", verificaSeNumeroTransacaoExiste, obterTransacao);
rotas.post("/transacao", validarCamposObrigatorios, cadastrarTransacao);
rotas.put(
  "/transacao/:id",
  verificaSeNumeroTransacaoExiste,
  validarCamposObrigatorios,
  verificarSeCategoriaExiste,
  atualizarTransacao
);
rotas.delete(
  "/transacao/:id",
  verificaSeNumeroTransacaoExiste,
  excluirTransacao
);

module.exports = rotas;
