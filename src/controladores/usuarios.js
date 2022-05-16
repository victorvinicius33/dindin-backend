const conexao = require('../conexao');
const securePassword = require('secure-password');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../jwt_secret');

const pwd = securePassword()

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
        const query = 'insert into usuarios (nome, email, senha) values ($1, $2, $3)';
        const usuario = await conexao.query(query, [nome, email, hash]);

        if (usuario.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Não foi possivel cadastrar o usuário' });
        }

        const queryUsuarioCadastrado = await conexao.query('select * from usuarios where email = $1', [email]);

        const dadosUsuarioCadastrado = {
            id: queryUsuarioCadastrado.rows[0].id,
            nome,
            email
        }

        return res.status(201).json(dadosUsuarioCadastrado);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const loginUsuario = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const query = 'select * from usuarios where email = $1';
        const usuarios = await conexao.query(query, [email]);

        const usuario = usuarios.rows[0];

        const result = await pwd.verify(Buffer.from(senha), Buffer.from(usuario.senha, "hex"));

        switch (result) {
            case securePassword.INVALID_UNRECOGNIZED_HASH:
            case securePassword.INVALID:
                return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s).' });
            case securePassword.VALID:
                break;
            case securePassword.VALID_NEEDS_REHASH:
                try {
                    const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");
                    const query = 'update usuarios set senha = $1 where email = $2';
                    await conexao.query(query, [hash, email]);
                } catch {
                }
                break;
        }

        const token = jwt.sign({
            id: usuario.id,
        }, jwtSecret);

        const dadosDoUsuario = {
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            },
            token
        };

        return res.status(200).json(dadosDoUsuario);
    } catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível fazer login.' });
    }

};

const detalharUsuario = async (req, res) => {
    const token = req.headers.authorization;

    try {
        const dadosToken = jwt.verify(token, jwtSecret);
        const query = 'select * from usuarios where id = $1';
        const usuarios = await conexao.query(query, [dadosToken.id]);
        const usuario = usuarios.rows[0];

        const dadosUsuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }

        return res.status(200).json(dadosUsuario);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    const token = req.headers.authorization;

    try {
        const dadosToken = jwt.verify(token, jwtSecret);

        const hash = (await pwd.hash(Buffer.from(senha))).toString("hex");

        const queryAtualizarUsuario = 'update usuarios set nome = $1, email = $2, senha = $3 where id = $4';
        const atualizarUsuario = await conexao.query(queryAtualizarUsuario, [nome, email, hash, dadosToken.id]);

        if (atualizarUsuario.rowCount === 0) {
            return res.status(400).json({ mensagem: 'Não foi possível atualizar o usuário.' });
        }

        return res.status(200).send();

    } catch (error) {
        return res.status(400).json({ mensagem: 'Não foi possível atualizar o usuário' });
    }
}

module.exports = {
    cadastrarUsuario,
    loginUsuario,
    detalharUsuario,
    atualizarUsuario
}