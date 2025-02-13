import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeDrawer from '../navigators/WelcomeDrawer'; 
import SAT from '../screens/SAT';
import GRE from '../screens/GRE';
import TOEFL from '../screens/TOEFL';
import IELTS from '../screens/IELTS';
import ThemeSelection from '../screens/ThemeSelection';
import EditProfileScreen from '../screens/EditProfileScreen';


const Stack = createStackNavigator();
const initialBestScores = {
  GRE: 0,
  SAT: 0,
  TOEFL: 0,
  IELTS: 0,
};

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerStyle: { backgroundColor: '#1E88E5' },}} />
      <Stack.Screen name="Signup" component={Signup} options={{ headerStyle: { backgroundColor: '#1E88E5' },}}/>
      <Stack.Screen name="Profile" component={ProfileScreen}  options={{ headerStyle: { backgroundColor: '#E0F2F7' },}}/>
      <Stack.Screen name="Welcome" component={WelcomeDrawer} options={{ headerShown: false ,  headerStyle: { backgroundColor: '#E0F2F7' }}} />
      <Stack.Screen name="Theme" component={ThemeSelection} options={{ headerStyle: { backgroundColor: '#1E88E5' },}} />
      <Stack.Screen name="SAT" component={SAT} options={{ headerStyle: { backgroundColor: '#1E88E5' },}} initialBestScore={initialBestScores.SAT}/>
      <Stack.Screen name="GRE" component={GRE} options={{ headerStyle: { backgroundColor: '#1E88E5' }, }} initialBestScore={initialBestScores.GRE} />
      <Stack.Screen name="TOEFL" component={TOEFL} options={{ headerStyle: { backgroundColor: '#1E88E5' },}} initialBestScore={initialBestScores.TOEFL} />
      <Stack.Screen name="IELTS" component={IELTS} options={{ headerStyle: { backgroundColor: '#1E88E5' },}}  initialBestScore={initialBestScores.IELTS}/>
    
      <Stack.Screen name="EditProfile" component={EditProfileScreen}options={{ headerStyle: { backgroundColor: '#E0F2F7' },}} />

    </Stack.Navigator>
  );
};

export default RootStack;
