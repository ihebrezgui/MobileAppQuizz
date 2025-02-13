import React, { useState ,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { View, Alert } from 'react-native';
import axios from 'axios';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyledContainer,
  InnerContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  
  TextError,
  Colors,
  StyledTextInput,
} from '../components/styles.js';
import QuizzStyles from '../components/QuizStyles.js';

const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '239307898296-mdg621joq8869psacsoekfbqt4avdmml.apps.googleusercontent.com',
    iosClientId: '239307898296-mdg621joq8869psacsoekfbqt4avdmml.apps.googleusercontent.com',
    androidClientId: '239307898296-mdg621joq8869psacsoekfbqt4avdmml.apps.googleusercontent.com',
    webClientId: '239307898296-mdg621joq8869psacsoekfbqt4avdmml.apps.googleusercontent.com',
  });

  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      console.log('Google login result:', result);
  
      if (result.type === 'success') {
        const { authentication } = result;
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${authentication.accessToken}` },
        });
  
        console.log('User info from Google:', userInfoResponse.data);
  
        const user = userInfoResponse.data;
        await AsyncStorage.setItem('userEmail', user.email);
        await AsyncStorage.setItem('userName', user.name);
        await AsyncStorage.setItem('userDOB', user.birthday);
  
        navigation.navigate('Welcome');
      } else if (result.type === 'cancel') {
        console.log('Google login cancelled by user.');
      } else {
        console.log('Google login failed.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion Google :', error);
      Alert.alert('Erreur', 'Impossible de se connecter avec Google. Veuillez réessayer.');
    }
  };
  

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://192.168.1.101:3000/login', {
        email: values.email,
        password: values.password,
      });

      await AsyncStorage.setItem('userEmail', response.data.user.email);
      await AsyncStorage.setItem('userName', response.data.user.fullName);
      await AsyncStorage.setItem('userDOB', response.data.user.dateOfBirth);

      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      Alert.alert('Erreur', 'Identifiants invalides. Veuillez réessayer.');
    }
  };

 
  

  return (
    <StyledContainer style={QuizzStyles.container}>
      <StatusBar style="dark" />
      <InnerContainer style={QuizzStyles.logoContainer}>
        <PageLogo
          resizeMode="contain"
          source={require('../assets/logo.png')}
          style={{ width: 200, height: 100 }}
        />
        <PageTitle style={QuizzStyles.logoText}>Challenge your skills</PageTitle>
        <SubTitle style={QuizzStyles.connexion}>Connexion</SubTitle>

        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <StyledFormArea style={[QuizzStyles.inputContainer, { width: '135%' }]}>
              <StyledTextInput
                label="Email"
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
                label="Password"
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

              <StyledButton onPress={handleSubmit} style={QuizzStyles.signInButton}>
                <ButtonText style={QuizzStyles.signInButtonText}>Sign In</ButtonText>
              </StyledButton>

              <Line />

              <StyledButton google onPress={handleGoogleLogin} style={QuizzStyles.googleSignInButton}>
                <ButtonText style={QuizzStyles.googleSignInButtonText}>Sign In with Google</ButtonText>
              </StyledButton>

              <ExtraView>
                <ExtraText style={QuizzStyles.signUpText}>Don't have an account?</ExtraText>
                <TextLink onPress={() => navigation.navigate('Signup')}>
                  <TextLinkContent style={QuizzStyles.signUpText}>Sign Up</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

export default Login;
