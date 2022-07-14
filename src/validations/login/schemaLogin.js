const yup = require('yup');

const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .email('Insira um email válido.')
    .required('O campo e-mail é obrigatório.'),
  password: yup
    .string()
    .required('O campo senha é obrigatório')
    .min(6, 'A senha precisa ter no mínimo 6 caracteres.'),
});

module.exports = schemaLogin;
