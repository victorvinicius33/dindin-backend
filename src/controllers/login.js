const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const hashPassword = require('../jwt_secret');
const knex = require('../services/connection');
const schemaLogin = require('../validations/login/schemaLogin');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    try {
      await schemaLogin.validate(req.body);
    } catch (error) {
      return res.status(400).json(error.message);
    }

    const user = await knex('users')
      .where('email', email)
      .returning('*')
      .first();
    if (!user) {
      return res.status(400).json('O usuário não foi encontrado.');
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(400).json('O e-mail ou senha estão incorretos.');
    }

    const token = jwt.sign({ id: user.id }, hashPassword, { expiresIn: '2h' });

    const { password: _, ...userData } = user;

    return res.status(200).json({
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = login;
