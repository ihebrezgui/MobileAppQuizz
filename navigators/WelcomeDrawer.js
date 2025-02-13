import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Linking, StyleSheet, TouchableOpacity } from 'react-native';
import Welcome from '../screens/Welcome';
import ProfileScreen from '../screens/ProfileScreen';
import ThemeSelection from '../screens/ThemeSelection';
import { useNavigation } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Logique de déconnexion à implémenter ici (ex. effacer les données de session)
    // Après la déconnexion, naviguer vers l'écran de connexion
    navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      
       
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
        
        <Text style={styles.copyrightText}>Copyright © 2024 - Made with ♥ Iheb</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/ihebrezgui')}>
          <Text style={styles.githubLink}>REZGUI</Text>
        </TouchableOpacity>
        </View>
      
    </DrawerContentScrollView>
  );
};

const WelcomeDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Welcome"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Welcome" component={Welcome} options={{ headerStyle: { backgroundColor: '#E0F2F7' } }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ headerStyle: { backgroundColor: '#E0F2F7' } }} />
      <Drawer.Screen name="Topic" component={ThemeSelection} options={{ headerStyle: { backgroundColor: '#1E88E5' } }} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    marginTop: 455,
  },
  githubLink: {
    fontSize: 14,
    color: '#1E88E5',
    textAlign: 'center',
    marginTop: 5,
  },
  copyrightText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
    
  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#E0F2F7',
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default WelcomeDrawer;
