import { StyleSheet } from 'react-native';

const QuizzStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E88E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
    width: '100%', // Utilisation de 100% de la largeur disponible
    paddingHorizontal: 20,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%', // Utilisation de 100% de la largeur du conteneur parent
    height: '65%',
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
  marginTop: 85, // Ajustez la marge supérieure pour déplacer vers le haut

  
  },
  inputContainer1: {
    width: '100%', // Utilisation de 100% de la largeur du conteneur parent
    height: '110%',
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
  marginTop:0, // Ajustez la marge supérieure pour déplacer vers le haut

  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginVertical: 8,
    width: '100%', // Utilisation de 100% de la largeur du champ
  },
  signInButton: {
    backgroundColor: '#1E88E5',
    borderRadius: 4,
    paddingVertical: 14,
    marginVertical: 8,
    width: '100%', // Utilisation de 100% de la largeur du bouton
    marginTop: 5,
    marginBottom: 0,
    
  },
  

  
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleSignInButton: {
    backgroundColor: '#bf0603',
    borderRadius: 4,
    paddingVertical: 14,
    marginVertical: 8,
    width: '100%', // Utilisation de 100% de la largeur du bouton Google
  },
  googleSignUpButton: {
    backgroundColor: '#bf0603',
    borderRadius: 4,
    paddingVertical: 14,
    marginVertical: 8,
    width: '100%', // Utilisation de 100% de la largeur du bouton Google
    marginTop: 0,
  },
  googleSignInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleSignUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signUpText: {
    color: '#4361ee',
    fontSize: 15,
    textAlign: 'center',
    marginTop: -5,
  },

  connexion: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 0,
  },
  
  
});


export default QuizzStyles;
