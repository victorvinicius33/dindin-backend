const conexao = require('../conexao');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const listarCategorias = async (req, res) => {

    try {
        const query = 'select * from categorias';
        const categorias = await conexao.query(query);

        if (categorias.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Nenhuma categoria cadastrada.' });
        }

        return res.status(200).json(categorias.rows);
    }catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível listar as categorias.'});
    }

}

const listarTransacoes = async (req, res) => {
    const token = req.headers.authorization;

    const dadosUsuario = jwt.verify(token, jwtSecret);

    try {
        const query = 'select * from transacoes where usuario_id = $1';
        const transacoes = await conexao.query(query, [dadosUsuario.id]);

        return res.status(200).json(transacoes.rows);
    }catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível listar as transações.'});
    }
}

const detalharTransacao = async (req, res) => {
    const { id } = req.params;

    const token = req.headers.authorization;

    const dadosUsuario = jwt.verify(token, jwtSecret);

    try {
        const queryTransacoes = 'select * from transacoes where usuario_id = $1';
        const transacoes = await conexao.query(queryTransacoes, [dadosUsuario.id]);

        const transacaoDetalhada = transacoes.find((transacao) => {
            return Number(transacao.id) === Number(id);
        });

        if (!transacaoDetalhada) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        return res.status(200).json(transacaoDetalhada);
    } catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível detalhar a transação.' });
    }
}

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    const token = req.headers.authorization;

    const dadosUsuario = jwt.verify(token, jwtSecret);

    try {
        const query = 'insert into transacoes (valor, data, categoria_id, usuario_id, tipo, descricao) values ($1, $2, $3, $4, $5, $6)';
        const transacao = await conexao.query(query, [valor, data, categoria_id, dadosUsuario.id, tipo, descricao]);

        if (transacao.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Não foi possível cadastrar a transação.' });
        }

        return res.status(200).json({ mensagem: 'Transação cadastrada com sucesso.' });
    } catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível cadastrar a transação.' });
    }
}

const atualizarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;
    const { id } = req.params;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios.' });
    }

    const token = req.headers.authorization;

    const dadosUsuario = jwt.verify(token, jwtSecret);

    try {
        const queryAtualizarTransacao = 'update transacoes set descricao = $1, valor = $2, data = $3, categoria_id = $4, tipo = $5 where id = $6 and usuario_id = $7';
        const atualizarTransacao = await conexao.query(queryAtualizarTransacao, [descricao, valor, data, categoria_id, tipo, id, dadosUsuario.id]);

        if (atualizarTransacao.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        return res.status(200).send();
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const deletarTransacao = async (req, res) => {
    const { id } = req.params;

    const token = req.headers.authorization;

    const dadosUsuario = jwt.verify(token, jwtSecret);

    try {   
        const query = 'delete from transacoes where id = $1 and usuario_id = $2';
        const transacao = await conexao.query(query, [id, dadosUsuario.id]);

        if (transacao.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Não foi possível apagar a transação.' });
        }

        return res.status(200).json({ mensagem: 'Transação apagada com sucesso.' });
    } catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível apagar a transação.' });
    }
}

const obterExtratoDeTransacoes = async (req, res) => {
    const token = req.headers.authorization;

    const dadosUsuario = jwt.verify(token, jwtSecret);

    try {
        const query = 'select * from transacoes where usuario_id = $1';
        const transacoes = await conexao.query(query, [dadosUsuario.id]);

        const entrada = transacoes.rows.filter((transacao) => {
            return transacao.tipo === 'entrada';
        }).reduce((acumulador, valorAtual) =>
            acumulador + valorAtual.valor, 0
        );

        const saida = transacoes.rows.filter((transacao) => {
            return transacao.tipo === 'saida';
        }).reduce((acumulador, valorAtual) =>
            acumulador + valorAtual.valor, 0
        );

        const extrato = {
            entrada,
            saida
        }

        return res.status(200).json(extrato);
    } catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível listar as transações.' });
    }
}

module.exports = {
    listarCategorias,
    listarTransacoes,
    detalharTransacao,
    cadastrarTransacao,
    atualizarTransacao,
    deletarTransacao,
    obterExtratoDeTransacoes
}