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

const SAT = () => {
  
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
    { question: 'Question 1 : When you become an adult, [one] must assume many responsibilities such as money management, food preparation, and housekeeping.'
     , options: ['NO CHANGE', "They", "You", "He"]
     , correctAnswer: 2 },

    { question: 'Question 2 : After a catastrophic storm, charitable organizations will help repair both [a resident home and a shop owner storefront].'
      , options: ["NO CHANGE", "a residents home and a shop owners storefront", "a resident's home and a shop owners storefront", "a resident's home and a shop owner's storefront"]
      , correctAnswer: 3 },

    { question: "Question 3 : The thesis of Malcolm Gladwell's book Outliers, contrary to what many people might expect, [are] that opportunity and luck are more important to achievement than a high IQ."
      , options: ["NO CHANGE", "is", "were", "have been"]
      , correctAnswer: 1 },

    { question: 'Question 4 : Although the black-tailed jackrabbit and the antelope jackrabbit appear nearly identical, tiny differences in ear size, fur coloring, and speed mark them as separate species.'
      , options: ["NO CHANGE", "It", "Us", "This"]
      , correctAnswer: 0 },


    { question: "Question 5 : While investigating the feeding strategies of two Middle Eastern beetle species, one scientist at Tel-Aviv University in Palastine observed a larva which not only survived being eaten by a toad, but subsequently ate [it's] predator."
      , options: ["NO CHANGE", "Their", "its", "they're"]
      , correctAnswer: 2 },

    { question: "Question 6 : Alma and her brother Jose [has won] the state robotics competition for high school students."
        , options: ["NO CHANGE", "have won", "is winning", "was winning"]
        , correctAnswer: 1 },

   { question: "Question 7 : Initially launched in 1930 as The Nancy Drew Mystery Stories, [the book series has cultivated a following across generations]."
          , options: ["NO CHANGE", "have won", "is winning", "was winning"]
          , correctAnswer: 0 },

    { question: "Question 8 : Historians suggest that biological warfare [is first being used in] 1347, when the Mongols intentionally spread the Black Plague to exterminate their enemies."
            , options: ["NO CHANGE", "was first used in", "was first using", "was first being used in"]
            , correctAnswer: 1 },

      { question: "Question 9 : Nobody knows why the trees of the Crooked Forest bow out at such strange angles. While some people think that the trees [were shaped for] a purpose, such as furniture or boat carving, others believe that they were bent by strange weather."
              , options: ["NO CHANGE", "are shaping", "shaped", "be shaped for"]
              , correctAnswer: 0 },

       { question: "Question 10 : [Elon Musk's first spacecrafts] name was Dragon, named after the 1963 song Puff, the Magic Dragon."
                , options: ["NO CHANGE", "Elon Musk's first spacecraft's", "Elon Musk's first spacecrafts'", "Elon Musks first spacecraft's"]
                , correctAnswer: 1 },

     
  ];

  const totalQuestions = quizData.length;
  const theme = 'SAT'; 
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

export default SAT;
