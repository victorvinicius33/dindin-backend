const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../services/connection');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex('users').where('email', email).first();
    if (!user) {
      return res
        .status(400)
        .json({ message: 'O e-mail ou senha estão incorretos.' });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res
        .status(400)
        .json({ message: 'O e-mail ou senha estão incorretos.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    const { password: _, ...userData } = user;

    return res.status(200).json({
      user: userData,
      token,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = login;
