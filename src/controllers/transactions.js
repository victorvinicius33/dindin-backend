const knex = require('../services/connection');

const listTransactions = async (req, res) => {
  const { user } = req;

  try {
    const transactions = await knex('transactions').where({ user_id: user.id });

    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(400).json(error.message);
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
    return res.status(400).json(error.message);
  }
};

const registerTransaction = async (req, res) => {
  const { user } = req;
  const { description, amount, date, category_id, transaction_type } = req.body;

  try {
    const registeredTransaction = await knex('transactions').insert({
      description,
      amount,
      date,
      category_id,
      transaction_type,
      user_id: user.id,
    });

    if (!registeredTransaction) {
      return res
        .status(400)
        .json({ message: 'Não foi possível cadastrar a transação.' });
    }

    return res.status(200).json(registeredTransaction);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateTransaction = async (req, res) => {
  const { user } = req;
  const { description, amount, date, category_id, category_type } = req.body;
  const { id } = req.params;

  if (!description || !amount || !date || !category_id || !category_type) {
    return res
      .status(400)
      .json({ mensagem: 'Todos os campos são obrigatórios.' });
  }

  try {
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
        user_id: user.id,
        id,
      })
      .where({ user_id: user.id, id });

    return res.status(200).json(updatedTransaction);
  } catch (error) {
    return res.status(400).json(error.message);
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
      .where({ id });

    return res.status(200).json(deletedTransaction);
  } catch (error) {
    return res.status(400).json(error.message);
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
        return transaction.transaction_type === 'saida';
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
    return res.status(400).json(error.message);
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
