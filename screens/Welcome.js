// Welcome.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import WelcomeDrawer from '../navigators/WelcomeDrawer';
import { DrawerActions } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello.</Text>
      <Image source={require('../assets/image1.png')} style={styles.image} />
      <Text style={styles.text}>Have you been preparing for a test lately?</Text>
      <TouchableOpacity onPress={openDrawer} style={styles.drawerButton}>
        <Text style={styles.drawerButtonText}>Open the side drawer!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F2F7',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#3C5096',
  },
  image: {
    width: width * 0.8,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#3C5096',
  },
  drawerButton: {
    backgroundColor: '#3C5096',
    padding: 15,
    borderRadius: 5,
  },
  drawerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Welcome;