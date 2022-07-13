const knex = require('../services/connection');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await knex('users')
      .insert({ name, email, password: hashPassword })
      .returning('*');

    if (!newUser) {
      return res
        .status(400)
        .json({ message: 'Não foi possivel cadastrar o usuário.' });
    }

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const detailUser = async (req, res) => {
  return res.status(200).json(req.user);
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { name, email, password } = req.body;

  if (!name && !email && !password) {
    return res.status(400).json({
      message: 'É necessário informar ao menos um campo para ser atualizado.',
    });
  }

  try {
    const user = await knex('users').where({ id }).first();

    if (!user) {
      return res
        .status(400)
        .json({ message: 'Não foi possível encontrar o usuário.' });
    }

    if (email) {
      if (email !== req.user.email) {
        const emailAlreadyExists = await knex('users')
          .select('*')
          .where({ email })
          .first();

        if (emailAlreadyExists) {
          return res
            .status(400)
            .json({ message: 'O email digitado já existe.' });
        }
      }
    }

    if (password) {
      const updatedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await knex('users')
        .update({
          name,
          email,
          password: updatedPassword,
        })
        .where('id', req.user.id)
        .returning('*');

      if (!updatedUser) {
        return res
          .status(400)
          .json({ message: 'O usuário não pode ser atualizado.' });
      }

      return res.status(200).json(updatedUser[0]);
    }

    const updatedUser = await knex('users')
      .update({
        name,
        email,
        password,
      })
      .where('id', req.user.id)
      .returning('*');

    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: 'O usuário não pode ser atualizado.' });
    }

    return res.status(200).json(updatedUser[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  registerUser,
  detailUser,
  updateUser,
};
