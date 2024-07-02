import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import axios from 'axios';
import AlertMessage from '../../components/AlertMessage';
import Api_Base_Url from '../../api'; // Ensure this is the correct path to your API base URL

const {width, height} = Dimensions.get('screen');

const ForgotPasswordPak = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      try {
        const response = await axios.post(`${Api_Base_Url}forgotPassword`, {
          email: email,
        });
        console.log('Response:', response.data); // Log the response
        if (response.data.status === 1) {
          setAlertType('success');
          setAlertMessage('A password reset link has been sent to your email.');
        } else if (response.data.status === 0) {
          setAlertType('error');
          setAlertMessage('Email not found. Please check and try again.');
        } else {
          setAlertType('error');
          setAlertMessage('Something went wrong. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error.response || error.message || error); // Log the error
        setAlertType('error');
        setAlertMessage('Something went wrong. Please try again later.');
      }
      setAlertVisible(true);
    }
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconCont}>
          <View style={styles.IconArrowCont}>
            <Icon
              name="keyboard-backspace"
              type="material-community"
              color="#4a5f85"
              size={30}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerText}>Forgot Password</Text>
        <Text style={styles.headerText2}>
          Enter your email address to reset your password
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textInputHeadingCont}>
          <Text style={styles.textInputHeading}>PAK EXHIBITOR</Text>
          <Image
            source={require('../../assets/images/PakistanFlag.jpg')}
            style={styles.imageFlagPak}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/A2Z.png')}
          style={styles.logo1}
        />
      </View>
      <AlertMessage
        message={alertMessage}
        type={alertType}
        visible={alertVisible}
        onClose={closeAlert}
      />
    </View>
  );
};

export default ForgotPasswordPak;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  header: {
    width: width / 1.2,
    alignItems: 'flex-start',
  },
  IconArrowCont: {
    borderWidth: 1,
    borderColor: '#4a5f85',
    borderRadius: 10,
    padding: width * 0.01,
  },
  headerIconCont: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: width * 0.46,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: width * 0.12,
  },
  logo1: {
    height: 100,
    width: width * 0.43,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  headerText2: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
    marginTop: 10,
  },
  mainContainer: {
    width: width / 1.1,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textInputHeadingCont: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInputHeading: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginBottom: 5,
  },
  imageFlagPak: {
    width: 55,
    height: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    color: 'black',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4a5f85',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
