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

const IELTS = () => {
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
    { question: 'Question 1 : What is the main purpose of an introduction in an academic essay?'
     , options: ['To present detailed evidence', "To summarize the essay", "To introduce the main topic and purpose", " To provide a conclusion"]
     , correctAnswer: 2 },

    { question: 'Question 2 : Which of the following is a common linking word used to contrast ideas?'
      , options: ["Furthermore", " Moreover", "Therefore", "However"]
      , correctAnswer: 3 },

    { question: 'Question 3 : The graph shows a significant increase in sales in July. What is the best synonym for "significant" in'
      , options: ["Insignificant", "Minor", "Substantial", "Negligible"]
      , correctAnswer: 2 },

    { question: 'Question 4 : Which of the following is NOT typically included in a conclusion of an academic essay?'
      , options: ["A restatement of the thesis", "New evidence or arguments", " A summary of main points", "A final thought or recommendation"]
      , correctAnswer: 1 },


    { question: 'Question 5 : In the listening section, you hear: "The professor emphasized the importance of the deadline." What does the word "emphasized" most likely mean?'
      , options: [" Ignored", "Highlighted", "Denied", "Questioned"]
      , correctAnswer: 1 },

    { question: 'Question 6 : Which of the following sentences is grammatically correct?'
        , options: [" She don't like ice cream", "She doesn't likes ice cream", "She doesn't like ice cream", " She didn't liked ice cream."]
        , correctAnswer: 1 },

   { question: "Question 7 : In reading comprehension, what is skimming?"
          , options: ["Reading in detail to understand the main idea", "Reading quickly to get a general overview", "Reading slowly to find specific information", "Reading and translating every word"]
          , correctAnswer: 1 },

    { question: "Question 8 : What is the main purpose of a topic sentence in a paragraph?"
            , options: ["To conclude the paragraph", "To state the main idea of the paragraph", "To summarize the paragraph", "To provide examples"]
            , correctAnswer: 1 },

      { question: "Question 9 :Which of the following is a compound sentence?"
         , options: ["The cat sat on the mat", "After the meeting, we went for lunch", "Because it was raining, we stayed inside", "She likes to read books, and he enjoys playing sports."]
              , correctAnswer: 0 },

       { question: "Question 10 : In writing, what is a thesis statement?"
                , options: ["A question about the topic", "A brief anecdote", "A detailed description of the topic", "The main argument or point of the essay"]
                , correctAnswer: 3 },

     
  ];

  const totalQuestions = quizData.length;
  const theme = 'IELTS'; 
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

export default IELTS;
