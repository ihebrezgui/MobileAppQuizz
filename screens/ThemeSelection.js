import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const QuizSelection = () => {
  const navigation = useNavigation();

  const handleQuizSelection = (subject) => {
    switch (subject) {
      case 'SAT':
        navigation.navigate('SAT');
        break;
      case 'GRE':
        navigation.navigate('GRE');
        break;
      case 'IELTS':
        navigation.navigate('IELTS');
        break;
      case 'TOEFL':
        navigation.navigate('TOEFL');
        break;
      default:
        navigation.navigate('Questions', { subject });
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Choose the quiz subject</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleQuizSelection('SAT')}
        >
          <Text style={styles.buttonText}>SAT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleQuizSelection('GRE')}
        >
          <Text style={styles.buttonText}>GRE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleQuizSelection('IELTS')}
        >
          <Text style={styles.buttonText}>IELTS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleQuizSelection('TOEFL')}
        >
          <Text style={styles.buttonText}>TOEFL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    height: '80%',
    backgroundColor: '#E0F2F7',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#333',
  },
  button: {
    borderWidth: 2,
    borderColor: '#4A65FF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 20,
  },
  buttonText: {
    color: '#4A65FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizSelection;
