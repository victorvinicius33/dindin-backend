const knex = require('../services/connection');

const listCategories = async (req, res) => {
  const { user } = req;

  try {
    const categories = await knex('categories').where({ user_id: user.id });

    if (!categories) {
      return res
        .status(400)
        .json({ mensagem: 'Nenhuma categoria cadastrada.' });
    }

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listCategories,
};
