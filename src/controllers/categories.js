const knex = require('../services/connection');

const listCategories = async (req, res) => {
  try {
    const categories = await knex.select('*').from('categories');

    if (!categories) {
      return res.status(404).json('Nenhuma categoria encontrada.');
    }

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  listCategories,
};
