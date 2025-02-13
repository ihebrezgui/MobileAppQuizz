import React, { useState, useEffect, useRef } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to install @react-native-async-storage/async-storage
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const  TOEFL = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [userResponses, setUserResponses] = useState(new Array(10).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [userName, setUserName] = useState('');
  const [bestScore, setBestScore] = useState(0);
  const scrollViewRef = useRef(null);

  const quizData = [
    { 
        question: 'Question 1: Which of the following is the closest synonym for "elicit"?', 
        options: ['Suppress', 'Extract', 'Confuse', 'Ignore'], 
        correctAnswer: 1 
    },
    { 
        question: 'Question 2: If the temperature drops 15 degrees from 40 degrees, what is the new temperature?', 
        options: ['20 degrees', '25 degrees', '30 degrees', '35 degrees'], 
        correctAnswer: 1 
    },
    { 
        question: 'Question 3: Which of the following words is most opposite in meaning to "prohibit"?', 
        options: ['Allow', 'Prevent', 'Ban', 'Restrict'], 
        correctAnswer: 0 
    },
    { 
        question: 'Question 4: If 2x + 5 = 13, what is the value of x?', 
        options: ['2', '3', '4', '5'], 
        correctAnswer: 1 
    },
    { 
        question: "Question 5: The passage primarily discusses:", 
        options: ["A recent scientific breakthrough", "A historical event", "A complex legal issue", "An environmental concern"], 
        correctAnswer: 3 
    },
    { 
        question: 'Question 6: The word "ambiguous" most nearly means:', 
        options: ['Clear', 'Vague', 'Certain', 'Precise'], 
        correctAnswer: 1 
    },
    { 
        question: "Question 7: What is the perimeter of a rectangle with length 8 and width 5?", 
        options: ['26', '40', '30', '24'], 
        correctAnswer: 3 
    },
    { 
        question: "Question 8: Which of the following integers is a multiple of both 4 and 6?", 
        options: ['12', '18', '20', '24'], 
        correctAnswer: 3 
    },
    { 
        question: "Question 9: The primary purpose of the lecture is to:", 
        options: ["Explain a historical trend", "Describe a scientific process", "Discuss a philosophical concept", "Analyze a piece of literature"], 
        correctAnswer: 1 
    },
    { 
        question: "Question 10: Which of the following decimals is equivalent to 3/5?", 
        options: ['0.3', '0.5', '0.6', '0.8'], 
        correctAnswer: 2 
    }
];


  const totalQuestions = quizData.length;
  const theme = 'TOEFL'; 
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem('userName');
        if (name) {
          setUserName(name);
        }
      } catch (error) {
        console.error('Failed to fetch user name:', error);
      }
    };

    const fetchBestScore = async () => {
      try {
        const storedBestScore = await AsyncStorage.getItem(`bestScore_${theme}`);
        if (storedBestScore !== null) {
          setBestScore(parseInt(storedBestScore, 10));
        }
      } catch (error) {
        console.error('Failed to fetch best score:', error);
      }
    };

    fetchUserName();
    fetchBestScore();
  }, 
  [theme]);
  useEffect(() => {
    // Mettre à jour le meilleur score si le score actuel est meilleur
    if (score > bestScore) {
      AsyncStorage.setItem(`bestScore_${theme}`, score.toString())
        .then(() => {
          setBestScore(score);
        })
        .catch((error) => {
          console.error('Failed to save best score:', error);
        });
    }
  }, [score, theme]);


  const handleAnswer = (selectedOptionIndex) => {
    if (!answered) {
      const updatedResponses = [...userResponses];
      updatedResponses[currentQuestionIndex] = selectedOptionIndex;
      setUserResponses(updatedResponses);

      if (selectedOptionIndex === quizData[currentQuestionIndex].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestionIndex === totalQuestions - 1) {
        setQuizCompleted(true);
        checkQuizPassed();
      }

      setAnswered(true);
    }
  };

  const nextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < totalQuestions) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
      checkQuizPassed();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(false);
    setUserResponses(new Array(totalQuestions).fill(null));
    setQuizCompleted(false);
    setQuizPassed(false);
    setShowCorrectAnswers(false);
  };

  const checkQuizPassed = () => {
    const correctAnswersCount = userResponses.filter(
      (response, index) => response === quizData[index].correctAnswer
    ).length;
    const quizPassedCriteria = correctAnswersCount >= Math.ceil(totalQuestions / 2);
    setQuizPassed(quizPassedCriteria);
    setShowScoreModal(true);

    
  };

  const showAnswers = () => {
    setShowCorrectAnswers(true);
  };

  const hideAnswers = () => {
    setShowCorrectAnswers(false);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
        <Image source={require('../assets/img.png')} style={styles.profileImage}  />
        <Text style={styles.profileName}>{userName}</Text>
        <Text style={styles.profileScore}>Score: {score}</Text>
        <Text style={styles.profileScore}>Best Score: {bestScore}</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/image.png')} style={styles.image} />
            <Text style={styles.questionText}>
              {quizData[currentQuestionIndex].question}
            </Text>
          </View>
          {quizData[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                answered &&
                (index === quizData[currentQuestionIndex].correctAnswer
                  ? styles.correctOption
                  : index === userResponses[currentQuestionIndex]
                    ? styles.selectedOption
                    : styles.incorrectOption),
              ]}
              onPress={() => handleAnswer(index)}
              disabled={answered}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
          {answered && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerText}>
                Correct Answer: {quizData[currentQuestionIndex].options[quizData[currentQuestionIndex].correctAnswer]}
              </Text>
            </View>
          )}
          <View style={styles.buttonContainer}>
            {answered && !quizCompleted && (
              <TouchableOpacity style={styles.button} onPress={nextQuestion}>
                <Text>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {quizCompleted && !showCorrectAnswers && (
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={showAnswers}
          >
            <Text>Show All Correct Answers</Text>
          </TouchableOpacity>
        )}

        {showCorrectAnswers && (
          <View style={styles.answersContainer}>
            <Text style={styles.answersTitle}>Correct Answers</Text>
            {quizData.map((data, index) => (
              <View key={index} style={styles.answerContainer}>
                <Text style={styles.answerText}>{data.question}</Text>
                <Text style={styles.answerText}>
                  Correct Answer: {data.options[data.correctAnswer]}
                </Text>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={hideAnswers}
            >
              <Text>Hide Correct Answers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={resetQuiz}
            >
              <Text>Restart Quiz</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={showScoreModal}
          onRequestClose={() => {
            setShowScoreModal(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowScoreModal(false)}
              >
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
              <Text style={styles.modalText}>Quiz Completed!</Text>
              <Text style={styles.modalText}>Your Score: {score}</Text>
              <Text style={styles.modalText}>
                {quizPassed
                  ? 'Congratulations! You passed the quiz.'
                  : 'You did not pass the quiz.'}
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={showAnswers}
              >
                <Text>View Correct Answers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.modalButton]}
                onPress={resetQuiz}
              >
                <Text>Restart Quiz</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#1E88E5',
    
  },
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'flex-start', // Pour aligner le contenu en haut
    paddingTop: 40, // Ajoute un espace supplémentaire en haut
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 10, // Ajuste la marge verticale du profil
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
   
    marginTop: -30,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    
 
    

  },
  profileScore: {
    fontSize: 16,
    color: '#FFF',
  },
  innerContainer: {
    width: '90%',
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
    marginBottom: 20,
    marginTop: 20,
    minHeight: 400, // Augmente la hauteur minimale du conteneur intérieur
    marginTop: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
    
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  questionText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 20,
    
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  correctOption: {
    backgroundColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#F44336',
  },
  selectedOption: {
    backgroundColor: '#2196F3',
  },
  answerContainer: {
    backgroundColor: '#E0F2F7',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    
  },
  answerText: {
    fontSize: 16,
    marginTop: -5,
    
  },
  buttonContainer: {
    alignItems: 'center',
    
  },
  button: {
    backgroundColor: '#1E88E5',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: -5,
    
    
  },
  answersContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  answersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default TOEFL;
