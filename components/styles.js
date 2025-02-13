import styled from 'styled-components/native';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';
const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary: '#ffffff',
  secondary: '#E5E7EB',
  tertiary: '#1F2937',
  darklight: '#9CA3AF',
  brand: '#6D28D9',
  green: '#10B981',
  red: '#EF4444',
};

const { primary, secondary, tertiary, darklight, brand, green, red } = Colors;


export const StyledContainer = styled.View`
  padding: 25px;
  flex: 1;
  background-color: ${primary};
  padding-top: ${StatusBarHeight + 10}px;
`;

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
  height: 220px;
  min-width: 100px;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;

  ${(props) =>
    props.welcome &&
    `
    margin-top: 35px;
  `}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const StyledTextInput = styled(TextInput)`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled(TouchableOpacity)`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled(TouchableOpacity)`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;

  ${(props) =>
    props.google &&
    `
    background-color: ${green};
    flex-direction: row;
    justify-content: center;
  `}
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-weight: bold;
  font-size: 16px;

  ${(props) =>
    props.google &&
    `
    padding: 25px;
  `}
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${red};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darklight};
  margin-vertical: 10px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled(TouchableOpacity)`
  color: ${brand};
  font-size: 15px;
  padding-top: 5px;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
  font-weight: bold;
`;

export const TextError = styled.Text`
  color: ${red};
  font-size: 12px;
  margin: 2px 0;
`;

// question
export const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      
      
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  progressContainer: {
      width: '100%',
      marginBottom: 10,
  },
  scoreContainer: {
      alignSelf: 'flex-start',
      marginBottom: 10,
  },
  scoreText: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  questionText: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
  },
  optionButton: {
      backgroundColor: '#e0e0e0',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      width: '100%',
      alignItems: 'center',
  },
  correctOption: {
      backgroundColor: '#a5d6a7', // Green for correct answer
  },
  incorrectOption: {
      backgroundColor: '#ef9a9a', // Red for incorrect answer
  },
  selectedOption: {
      backgroundColor: '#64b5f6', // Blue for selected option
  },
  buttonContainer: {
      width: '100%',
      marginTop: 20,
  },
  button: {
      backgroundColor: '#2196f3',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
  },
  answersContainer: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
  },
  answersTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  answerContainer: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      width: '100%',
      marginBottom: 10,
      borderRadius: 5,
  },
  answerText: {
      fontSize: 16,
  },
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  },
  modalText: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});

//profile scrren 
export const  styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2F7', // Couleur de fond légère
    
  },
  themeButton: {
    backgroundColor: '#3498db', // Couleur de fond du bouton
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginVertical: 10,
    borderRadius: 25, // Coins arrondis
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5, // Ombre pour la profondeur sur Android
  },
  themeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // Couleur du texte
  },
});


