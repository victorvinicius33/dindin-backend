const express = require('express');
const users = require('./controllers/users');
const login = require('./controllers/login');
const categories = require('./controllers/categories');
const transactions = require('./controllers/transactions');
const verifyLogin = require('./middlewares/verifyLogin');
const validation = require('./middlewares/validation');
const schemaSignUpUser = require('./validations/schemaSignUpUser');
const schemaLogin = require('./validations/schemaLogin');
const schemaUpdateUser = require('./validations/schemaUpdateUser');
const schemaRegisterTransaction = require('./validations/schemaRegisterTransaction');
const schemaUpdateTransaction = require('./validations/schemaUpdateTransaction');

const routes = express();

routes.post('/usuario', validation(schemaSignUpUser), users.signUpUser);

routes.post('/login', validation(schemaLogin), login);

routes.use(verifyLogin);

routes.get('/usuario', users.detailUser);
routes.put('/usuario', validation(schemaUpdateUser), users.updateUser);

routes.get('/categoria', categories.listCategories);

routes.get('/transacao', transactions.listTransactions);
routes.get('/transacao/extrato', transactions.getUserStatement);
routes.get('/transacao/:id', transactions.getTransactionDetails);
routes.post('/transacao', validation(schemaRegisterTransaction), transactions.registerTransaction);
routes.put('/transacao/:id', validation(schemaUpdateTransaction), transactions.updateTransaction);
routes.delete('/transacao/:id', transactions.deleteTransaction);

module.exports = routes;
