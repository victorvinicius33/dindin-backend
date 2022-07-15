const knex = require('../services/connection');
const jwt = require('jsonwebtoken');

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(401)
      .json({
        message:
          'Para acessar este recurso um token de autenticação válido deve ser enviado.',
      });
  }

  try {
    const token = authorization.replace('Bearer ', '').trim();

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const loggedUser = await knex('users').where({ id }).first();

    if (!loggedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const { password, ...user } = loggedUser;

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = verifyLogin;
