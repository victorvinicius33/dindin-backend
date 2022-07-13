const connect = require('../services/connection');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const verificarUsuario = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório.'});
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório.' });
    }

    try {
        const query = 'select * from usuarios where email = $1';
        const usuario = await connect.query(query, [email]);

        if (usuario.rowCount > 0) {
            return res.status(400).json({ mensagem: 'Já existe um usuário cadastrado com o e-mail informado.' });
        }

        next();
    } catch (error) {
        return res.status(400).json(error.message);
    }

};

const verificarDadosLogin = async (req, res, next) => {
    const { email, senha } = req.body;

    const token = req.headers.authorization;

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório.' });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório.' });
    }

    try {
        const query = 'select * from usuarios where email = $1';
        const usuarios = await connect.query(query, [email]);

        if (usuarios.rowCount === 0) {
            return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
        }

        next();
    }catch (error) {
        return res.status(400).json(error.message);
    }

};

const verificarToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não informado.' });
    }

    try {
        const dadosUsuario = jwt.verify(token, jwtSecret);

        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token inválido.' });
    }
}

const verificarAtualizacaoDados = async (req, res, next) => {
    const { nome, email, senha } = req.body;
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ mensagem: 'Token não informado.' });
    }

    if (!nome) {
        return res.status(400).json({ mensagem: 'O campo nome é obrigatório.' });
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'O campo email é obrigatório.'});
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório.' });
    }

    try{
        const dadosUsuario = jwt.verify(token, jwtSecret);

        const query = 'select * from usuarios where id = $1';
        const usuario = await connect.query(query, [dadosUsuario.id]);

        if (usuario.rowCount === 0) {
            return res.status(401).json({ mensagem: 'Usuário não encontrado.' });
        }
        
        if (email !== usuario.rows[0].email) {
            const query = 'select * from usuarios where email = $1';
            const usuario = await connect.query(query, [email]);

            if (usuario.rowCount > 0) {
                return res.status(400).json({ mensagem: 'Já existe um usuário cadastrado com o e-mail informado.' });
            }
        }

        return next();
    }catch(error) {
        return res.status(400).json({ mensagem: 'Não foi possível atualizar os dados.' });
    }
}

module.exports = {
    verificarUsuario,
    verificarDadosLogin,
    verificarToken,
    verificarAtualizacaoDados
}