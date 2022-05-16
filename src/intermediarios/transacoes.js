const express = require('express');
const conexao = require('../conexao');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const verificarDadosCadastro = async (req, res, next) => {
    const token = req.headers.authorization;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!token) {
        return res.status(400).json({ mensagem: 'Token não informado.' });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: 'O campo valor é obrigatório' });
    }

    if (!categoria_id) {
        return res.status(400).json({ mensagem: 'O campo categoria é obrigatório' });
    }

    if (!tipo) {
        return res.status(400).json({ mensagem: 'O campo tipo é obrigatório' });
    }

    try {
        const dadosDoUsuario = jwt.verify(token, jwtSecret);

        const query = 'select * from categorias where id = $1';
        const categoria = await conexao.query(query, [categoria_id]);

        if (categoria.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Categoria não encontrada.' });
        }

        next();
    } catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível cadastrar a transação.' });
    }

}

const verificarTransacao = async (req, res, next) => {
    const token = req.headers.authorization;
    const { id } = req.params;

    if (!token) {
        return res.status(400).json({ mensagem: 'Token não informado.' });
    }

    try {
        const dadosUsuario = jwt.verify(token, jwtSecret);

        const query = 'select * from transacoes where id = $1 and usuario_id = $2';
        const transacao = await conexao.query(query, [id, dadosUsuario.id]);

        if (transacao.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Transação não encontrada.' });
        }

        next();
    } catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível apagar a transação.' });
    }

}

module.exports = {
    verificarDadosCadastro,
    verificarTransacao
}