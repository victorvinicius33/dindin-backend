const express = require('express');
const usuarios = require('./controladores/usuarios');
const transacoes = require('./controladores/transacoes');
const intermediariosUsuarios = require('./intermediarios/usuarios');
const intermediariosTransacoes = require('./intermediarios/transacoes');

const rotas = express();

rotas.post('/usuario', intermediariosUsuarios.verificarUsuario, usuarios.cadastrarUsuario);
rotas.post('/login', intermediariosUsuarios.verificarDadosLogin, usuarios.loginUsuario);
rotas.get('/usuario',intermediariosUsuarios.verificarToken, usuarios.detalharUsuario);
rotas.put('/usuario', intermediariosUsuarios.verificarAtualizacaoDados, usuarios.atualizarUsuario);

rotas.get('/categoria', intermediariosUsuarios.verificarToken, transacoes.listarCategorias);
rotas.get('/transacao', intermediariosUsuarios.verificarToken, transacoes.listarTransacoes);
rotas.get('/transacao/:id', intermediariosUsuarios.verificarToken, transacoes.detalharTransacao);
rotas.post('/transacao', intermediariosTransacoes.verificarDadosCadastro, transacoes.cadastrarTransacao);
rotas.put('/transacao/:id', intermediariosUsuarios.verificarToken, transacoes.atualizarTransacao);
rotas.delete('/transacao/:id', intermediariosTransacoes.verificarTransacao, transacoes.deletarTransacao);
rotas.get('/extrato', intermediariosUsuarios.verificarToken, transacoes.obterExtratoDeTransacoes);

module.exports = rotas;