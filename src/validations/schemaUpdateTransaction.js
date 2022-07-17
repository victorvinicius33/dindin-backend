const yup = require('yup');

const schemaUpdateTransaction = yup.object().shape({
  description: yup.string(),
  amount: yup.number().required('É necessário informar o valor da transação.'),
  date: yup
    .date('Informe um formato de data válido')
    .required('É necessário informar uma data.'),
  transaction_type: yup
    .string()
    .required('É necessário informar o tipo da transação.')
    .oneOf(['entrada', 'saída'], 'Tipo inválido de transação.'),
  category_id: yup.number().required('É necessário informar uma categoria.'),
});

module.exports = schemaUpdateTransaction;
