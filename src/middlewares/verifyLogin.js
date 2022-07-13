const knex = require('../services/connection');
const jwt = require('jsonwebtoken');
const hashPassword = require('../jwt_secret');

const verifyLogin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json('Não autorizado.');
  }

  try {
    const token = authorization.replace('Bearer ', '').trim();

    const { id } = jwt.verify(token, hashPassword);

    const loggedUser = await knex('users').where({ id }).first();

    if (!loggedUser) {
      return res.status(404).json('Usuário não encontrado.');
    }

    const { password, ...user } = loggedUser;

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = verifyLogin;
