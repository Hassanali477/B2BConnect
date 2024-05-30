import React from 'react';
import {StyleSheet, Text, View, LogBox, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MeetingRequest from '../screens/PakExihibitor/MeetingRequestPak';
import MeetingRequestKsa from '../screens/KSADelegates/MeetingRequestKsa';
import SplashScreen from '../screens/SplashScreen';
import AppStarterScreen from '../screens/AppStarterScreen';
import LoginPak from '../screens/PakExihibitor/LoginPak';
import ForgotPasswordPak from '../screens/PakExihibitor/ForgotPasswordPak';
import LoginKSA from '../screens/KSADelegates/LoginKSA';
import ForgotPasswordKSA from '../screens/KSADelegates/ForgotPasswordKSA';
import DashboardPak from '../screens/PakExihibitor/DashboardPak';
import ProfilePak from '../screens/PakExihibitor/ProfilePak';
import ResetPassword from '../screens/PakExihibitor/ResetPassword';
import MeetingRequestPak from '../screens/PakExihibitor/MeetingRequestPak';
const Stack = createStackNavigator();

const Navigation = () => {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}>
        {/* Pak Exhibitor */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AppStarter" component={AppStarterScreen} />
        <Stack.Screen name="LoginPak" component={LoginPak} />
        <Stack.Screen name="ForgotPasswordPak" component={ForgotPasswordPak} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="DashboardPak" component={DashboardPak} />
        <Stack.Screen name="ProfilePak" component={ProfilePak} />
        <Stack.Screen name="MeetingRequestPak" component={MeetingRequestPak} />

        {/* KSA Exhibitor */}
        <Stack.Screen name="LoginKSA" component={LoginKSA} />
        <Stack.Screen name="ForgotPasswordKSA" component={ForgotPasswordKSA} />
        {/* <Stack.Screen name="MeetingRequestKsa" component={MeetingRequestKsa} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
