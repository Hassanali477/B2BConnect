import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Ensure axios is imported
import Api_Base_Url from '../api';
import {connect, useDispatch} from 'react-redux';
import * as userActions from '../redux/actions/user';
import {bindActionCreators} from 'redux';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import { user } from '../redux/actions/user';
const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserCredentials = async () => {
      try {
        const userCredentials = await AsyncStorage?.getItem('@usercredentials');
        console.log('Retrieved user credentials:', userCredentials); // Debugging log
        if (userCredentials) {
          const parsedCredentials = JSON.parse(userCredentials);
          console.log('Parsed user credentials:', parsedCredentials); // Debugging log
          const {email, password, type} = parsedCredentials;

          if (email && password) {
            try {
              const response = await axios.post(
                `${Api_Base_Url}loginAPI`,
                parsedCredentials,
              );
              if (response.status === 200) {
                console.log('Login successful', response.data);
                const userData = response.data.userData;
                const userAdditionalData = response.data.userAdditionalData;
                var obj = {userData, userAdditionalData};
                dispatch(user(obj));
                if (type === 'PakExhibitor') {
                  await AsyncStorage?.setItem(
                    '@usercredentials',
                    JSON.stringify({
                      email: email,
                      password: password,
                      type: 'PakExhibitor',
                    }),
                  );
                  navigation.navigate('DashboardPak');
                } else {
                  await AsyncStorage?.setItem(
                    '@usercredentials',
                    JSON.stringify({
                      email: email,
                      password: password,
                      type: 'KSADelegate',
                    }),
                  );
                  navigation.navigate('DashboardKSA');
                }
              } else {
                console.log('Login failed', response.data);
                navigation.navigate('AppStarter');
              }
            } catch (apiError) {
              console.error('API request failed', apiError);
              navigation.navigate('AppStarter');
            }
          } else {
            navigation.navigate('AppStarter');
          }
        } else {
          navigation.navigate('AppStarter');
        }
      } catch (error) {
        console.error('Error retrieving user credentials', error);
        navigation.navigate('AppStarter');
      }
    };

    checkUserCredentials();

    return () => {};
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/SplashScreen.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const mapStateToProps = state => ({
  userData: state.userData,
});

const ActionCreators = Object.assign({}, userActions);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 250,
  },
});
