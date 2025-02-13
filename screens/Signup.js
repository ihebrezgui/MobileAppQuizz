import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup'; // Import yup for validation
import QuizzStyles from '../components/QuizStyles'; // Import QuizzStyles
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  StyledTextInput,
  TextLinkContent,
  TextError,
  Colors,
  PageLogo,
} from '../components/styles.js';

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const validationSchema = yup.object().shape({
    fullName: yup.string().required('Le nom complet est requis'),
    email: yup.string().email('Format d\'email invalide').required('L\'adresse email est requise'),
    dateOfBirth: yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Format de date invalide (YYYY-MM-DD)')
    .required('La date de naissance est requise'),
    password: yup.string().min(6, 'Le mot de passe doit avoir au moins 6 caractères').required('Le mot de passe est requis'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Les mots de passe doivent correspondre')
      .required('La confirmation du mot de passe est requise'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log('Soumission du formulaire de signup');
    try {
      const response = await axios.post('http://192.168.1.101:3000/signup', {
        fullName: values.fullName,
        email: values.email,
        dateOfBirth: values.dateOfBirth,
        password: values.password,
      });

      const { token, fullName, email, dateOfBirth } = response.data;

      //await AsyncStorage.setItem('token', token);
      //await AsyncStorage.setItem('userName', fullName);
      //await AsyncStorage.setItem('userEmail', email);
      //await AsyncStorage.setItem('userDOB', dateOfBirth);

      Alert.alert('Succès', 'Inscription réussie!');
      resetForm();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Signup error:', error);
      if (error.response) {
        Alert.alert('Erreur', 'Cette adresse email est déjà utilisée.');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  return (
    <StyledContainer style={QuizzStyles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={QuizzStyles.logoContainer}>
        <PageLogo
          resizeMode="contain"
          source={require('../assets/logo.png')}
          style={{ width: 200, height: 90, marginTop: -60 }}
        />
        <PageTitle style={[QuizzStyles.logoText, { marginTop: -20 }]}>Registration</PageTitle>
        <SubTitle style={[QuizzStyles.connexion]}>Create your account</SubTitle>

        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            dateOfBirth: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <StyledFormArea style={[QuizzStyles.inputContainer1, { width: '135%' }]}>
              <StyledTextInput
                label="Nom complet"
                icon="user"
                placeholder="full name"
                placeholderTextColor={Colors.darklight}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                style={QuizzStyles.input}
              />
              {errors.fullName && touched.fullName && <TextError>{errors.fullName}</TextError>}

              <StyledTextInput
                label="Adresse email"
                icon="mail"
                placeholder="example@example.com"
                placeholderTextColor={Colors.darklight}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                style={QuizzStyles.input}
              />
              {errors.email && touched.email && <TextError>{errors.email}</TextError>}

              <StyledTextInput
                label="Date de naissance"
                icon="calendar"
                placeholder="YYYY-MM-DD"
                placeholderTextColor={Colors.darklight} // Use Colors.darklight
                onChangeText={handleChange('dateOfBirth')}
                onBlur={handleBlur('dateOfBirth')}
                value={values.dateOfBirth}
                style={QuizzStyles.input}
              />
              {errors.dateOfBirth && touched.dateOfBirth && (
                <TextError>{errors.dateOfBirth}</TextError>
              )}

              <StyledTextInput
                label="Mot de passe"
                icon="lock"
                placeholder="********"
                placeholderTextColor={Colors.darklight}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
                style={QuizzStyles.input}
              />
              {errors.password && touched.password && <TextError>{errors.password}</TextError>}

              <StyledTextInput
                label="Confirmer le mot de passe"
                icon="lock"
                placeholder="********"
                placeholderTextColor={Colors.darklight}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={hidePassword}
                togglePasswordVisibility={() => setHidePassword(!hidePassword)}
                style={QuizzStyles.input}
              />
              {errors.confirmPassword && touched.confirmPassword && (
                <TextError>{errors.confirmPassword}</TextError>
              )}

              <StyledButton onPress={handleSubmit} style={QuizzStyles.signInButton}>
                <ButtonText style={QuizzStyles.signInButtonText}>Register</ButtonText>
              </StyledButton>

              <Line />

              <StyledButton google onPress={() => navigation.navigate('Login')} style={QuizzStyles.googleSignUpButton}>
                <ButtonText style={QuizzStyles.googleSignUpButtonText}>Sign In with Google</ButtonText>
              </StyledButton>

              <ExtraView>
                <ExtraText style={QuizzStyles.signUpText}>Already have an account ?</ExtraText>
                <TextLink onPress={() => navigation.navigate('Login')}>
                  <TextLinkContent style={QuizzStyles.signUpText}>Login</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Signup;
