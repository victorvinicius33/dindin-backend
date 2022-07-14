const yup = require('yup');

const schemaRegisterTransaction = yup.object().shape({
  description: yup.string(),
  amount: yup.number().required('É necessário informar o valor da transação.'),
  date: yup
    .string()
    .required('É necessário informar uma data.')
    .matches(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      'Informe um formato de data válido.'
    ),
  transaction_type: yup
    .string()
    .required('É necessário informar o tipo da transação.')
    .oneOf(['entrada', 'saída'], 'Tipo inválido de transação.'),
});

module.exports = schemaRegisterTransaction;
