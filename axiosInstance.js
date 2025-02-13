const handleSubmit = async (values, { resetForm }) => {
  try {
    const response = await axios.post(
      'http://192.168.1.106:3000/signup',
      {
        fullName: values.fullName,
        email: values.email,
        dateOfBirth: dateOfBirth.toISOString().split('T')[0],
        password: values.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Signup successful:', response.data);
    Alert.alert('Succès', 'Inscription réussie!');
    resetForm();
    navigation.navigate('Home');
  } catch (error) {
    console.error('Signup error:', error);
    // Gestion des erreurs
  }
};
