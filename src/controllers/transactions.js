const knex = require('../services/connection');
const schemaRegisterTransaction = require('../validations/transactions/schemaRegisterTransaction');
const schemaUpdateTransaction = require('../validations/transactions/schemaUpdateTransaction');

const listTransactions = async (req, res) => {
  const { user } = req;

  try {
    const transactions = await knex('transactions').where({ user_id: user.id });

    if (!transactions) {
      return res.status(404).json('Nenhuma transação encontrada.');
    }

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getTransactionDetails = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    const transaction = await knex('transactions')
      .where({
        user_id: user.id,
        id,
      })
      .first();

    if (!transaction) {
      return res.status(404).json({ mensagem: 'Transação não encontrada.' });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const registerTransaction = async (req, res) => {
  const { user } = req;
  const { transaction_type, description, amount, date, category_id } = req.body;

  try {
    try {
      await schemaRegisterTransaction.validate(req.body);
    } catch (error) {
      return res.status(400).json(error.message);
    }

    const category = await knex('categories')
      .where({ id: category_id })
      .first();

    if (!category) {
      return res.status(400).json('Categoria inválida.');
    }

    const registeredTransaction = await knex('transactions')
      .insert({
        transaction_type,
        description,
        amount,
        date,
        category_id,
        user_id: user.id,
      })
      .returning('*');

    if (!registeredTransaction) {
      return res
        .status(400)
        .json({ message: 'Não foi possível cadastrar a transação.' });
    }

    return res.status(201).json(registeredTransaction[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateTransaction = async (req, res) => {
  const { user } = req;
  const { description, amount, date, category_id, transaction_type } = req.body;
  const { id } = req.params;

  try {
    try {
      await schemaUpdateTransaction.validate(req.body);
    } catch (error) {
      return res.status(400).json(error.message);
    }

    const transactionFound = await knex('transactions')
      .where({ user_id: user.id, id })
      .first();

    if (!transactionFound) {
      return res.status(404).json({ message: 'Transação não encontrada.' });
    }

    const updatedTransaction = await knex('transactions')
      .update({
        description,
        amount,
        date,
        category_id,
        transaction_type,
      })
      .where({ user_id: user.id, id })
      .returning('*');

    return res.status(200).json(updatedTransaction[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteTransaction = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  try {
    const foundTransaction = await knex('transactions')
      .where({ user_id: user.id, id })
      .first();

    if (!foundTransaction) {
      return res
        .status(400)
        .json({ message: 'Não foi possível encontrar a transação.' });
    }

    const deletedTransaction = await knex('transactions')
      .delete()
      .where({ id })
      .returning('*');

    return res.status(200).json(deletedTransaction[0]);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserStatement = async (req, res) => {
  const { user } = req;

  try {
    const transactions = await knex('transactions').where({ user_id: user.id });

    if (!transactions) {
      return res
        .status(404)
        .json({ message: 'não foi encontrada nenhuma transação.' });
    }

    const cashIn = transactions
      .filter((transaction) => {
        return transaction.transaction_type === 'entrada';
      })
      .reduce(
        (totalAmount, currentAmount) => totalAmount + currentAmount.amount,
        0
      );

    const cashOut = transactions
      .filter((transaction) => {
        return transaction.transaction_type === 'saída';
      })
      .reduce(
        (totalAmount, currentAmount) => totalAmount + currentAmount.amount,
        0
      );

    const statement = {
      cashIn,
      cashOut,
    };

    return res.status(200).json(statement);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  listTransactions,
  getTransactionDetails,
  registerTransaction,
  updateTransaction,
  deleteTransaction,
  getUserStatement,
};
