const express = require('express');
const users = require('./controllers/users');
const login = require('./controllers/login');
const categories = require('./controllers/categories');
const transactions = require('./controllers/transactions');
const verifyLogin = require('./middlewares/verifyLogin');

const routes = express();

routes.post('/cadastrar', users.signUpUser);

routes.post('/login', login);

routes.use(verifyLogin);

routes.get('/usuario', users.detailUser);
routes.put('/usuario', users.updateUser);

routes.get('/categoria', categories.listCategories);

routes.get('/transacao', transactions.listTransactions);
routes.get('/transacao/:id', transactions.getTransactionDetails);
routes.post('/transacao', transactions.registerTransaction);
routes.put('/transacao/:id', transactions.updateTransaction);
routes.delete('/transacao/:id', transactions.deleteTransaction);
routes.get('/transacao/extrato', transactions.getUserStatement);

module.exports = routes;
