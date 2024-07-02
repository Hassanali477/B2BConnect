import React, {useEffect} from 'react';
import {StyleSheet, Text, View, LogBox, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AppStarterScreen from '../screens/AppStarterScreen';
import LoginPak from '../screens/PakExihibitor/LoginPak';
import ForgotPasswordPak from '../screens/PakExihibitor/ForgotPasswordPak';
import DashboardPak from '../screens/PakExihibitor/DashboardPak';
import ProfilePak from '../screens/PakExihibitor/ProfilePak';
import ResetPassword from '../screens/PakExihibitor/ResetPassword';
import MeetingRequestPak from '../screens/PakExihibitor/MeetingRequestPak';
import MeetingRequestScreenPak from '../screens/PakExihibitor/MeetingRequestScreenPak';
import ConfirmAppointment from '../screens/PakExihibitor/ConfirmAppointment';
import FeedbackScreen from '../screens/PakExihibitor/FeedbackScreen';
import CustomActivityIndicator from '../components/CustomActivityIndicator';

// KSA DELEGATES
import LoginKSA from '../screens/KSADelegates/LoginKSA';
import ForgotPasswordKSA from '../screens/KSADelegates/ForgotPasswordKSA';
import DashboardKSA from '../screens/KSADelegates/DashboardKSA';
import MeetingRequestScreenKsa from '../screens/KSADelegates/MeetingRequestScreenKsa';
import ConfirmAppointmentKsa from '../screens/KSADelegates/ConfirmAppointmentKsa';
import FeedbackScreenKsa from '../screens/KSADelegates/FeedbackScreenKsa';
import ResetPasswordKsa from '../screens/KSADelegates/ResetPasswordKsa';
import ProfileKsa from '../screens/KSADelegates/ProfileKsa';
import StateLifeDemo from '../screens/StateLifeDemo';

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
        {/* <Stack.Screen name="StateLife" component={StateLifeDemo} /> */}
        {/* Pak Exhibitor */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AppStarter" component={AppStarterScreen} />
        <Stack.Screen name="LoginPak" component={LoginPak} />
        <Stack.Screen name="ForgotPasswordPak" component={ForgotPasswordPak} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="DashboardPak" component={DashboardPak} />
        <Stack.Screen
          name="MeetingRequestScreen"
          component={MeetingRequestScreenPak}
        />
        <Stack.Screen
          name="ConfirmAppointment"
          component={ConfirmAppointment}
        />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="ProfilePak" component={ProfilePak} />
        <Stack.Screen name="MeetingRequestPak" component={MeetingRequestPak} />

        {/* KSA Exhibitor */}
        <Stack.Screen name="LoginKSA" component={LoginKSA} />
        <Stack.Screen name="ForgotScreenKSA" component={ForgotPasswordKSA} />
        <Stack.Screen name="DashboardKSA" component={DashboardKSA} />
        <Stack.Screen
          name="MeetingRequestScreenKsa"
          component={MeetingRequestScreenKsa}
        />
        <Stack.Screen
          name="ConfirmAppointmentKsa"
          component={ConfirmAppointmentKsa}
        />
        <Stack.Screen name="FeedbackKsa" component={FeedbackScreenKsa} />
        <Stack.Screen name="ProfileKsa" component={ProfileKsa} />
        <Stack.Screen name="ResetPasswordKsa" component={ResetPasswordKsa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
