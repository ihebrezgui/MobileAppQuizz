import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
  fullName: Yup.string().required('Champ requis'),
  email: Yup.string().email('Adresse email invalide').required('Champ requis'),
  dateOfBirth: Yup.date().nullable().required('Champ requis'),
  password: Yup.string()
    .min(6, 'Le mot de passe doit comporter au moins 6 caractères')
    .required('Champ requis'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
    .required('Champ requis'),

  acceptTerms: Yup.bool().oneOf([true], 'Veuillez accepter les conditions'),
});
