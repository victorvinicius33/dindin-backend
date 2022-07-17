const yup = require('yup');

const schemaSignUpUser = yup.object().shape({
  name: yup.string().required('O campo nome é obrigatório.'),
  email: yup
    .string()
    .email('Insira um email válido.')
    .required('O campo email é obrigatório.'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres.')
    .max(20, 'Sua senha deve ter no máximo 20 caracteres.')
    .required('O campo senha é obrigatório.'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais.'),
});

module.exports = schemaSignUpUser;
