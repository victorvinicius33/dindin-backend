const knex = require('../services/connection');
const bcrypt = require('bcrypt');

const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const emailAlreadyExists = await knex('users').where({ email }).first();

    if (emailAlreadyExists) {
      return res.status(400).json({
        message:
          'O e-mail informado já está sendo utilizado por outro usuário.',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await knex('users')
      .insert({ name, email, password: hashPassword })
      .returning('*');

    if (!newUser) {
      return res
        .status(400)
        .json({ message: 'Não foi possivel cadastrar o usuário.' });
    }

    const { password: _, ...newUserData } = newUser[0];

    return res.status(201).json(newUserData);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const detailUser = async (req, res) => {
  return res.status(200).json(req.user);
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { name, email, password } = req.body;

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
          return res.status(400).json({
            message:
              'O e-mail informado já está sendo utilizado por outro usuário.',
          });
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
          .json({ message: 'O usuário não pôde ser atualizado.' });
      }

      return res.status(204).send();
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
        .json({ message: 'O usuário não pôde ser atualizado.' });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  signUpUser,
  detailUser,
  updateUser,
};
