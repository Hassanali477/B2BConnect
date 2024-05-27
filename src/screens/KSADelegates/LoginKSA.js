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
import CheckBox from '@react-native-community/checkbox';

const {width, height} = Dimensions.get('screen');

const LoginKSA = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignIn = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }

    if (validateEmail(email) && password.length >= 6) {
      Alert.alert('Login Successful', 'Welcome back!');
      // Perform login action
    }
  };

  // const handleSignUp = () => {
  //   navigation.navigate('SignUpKSA'); // Navigate to the SignUp screen
  // };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordKSA'); // Navigate to the Forgot Password screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconCont}>
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.headerText}>Sign in</Text>
        <Text style={styles.headerText2}>
          Welcome back! Please enter your details
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textInputHeadingCont}>
          <Text style={styles.textInputHeading}>KSA DELEGATE</Text>
          <Image
            source={require('../../assets/images/SaudiFlag.jpg')}
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
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#000"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <View style={styles.rememberForgotContainer}>
          <View style={styles.rememberMe}>
            <CheckBox
              value={rememberMe}
              onValueChange={setRememberMe}
              tintColors={{true: '#007BFF', false: '#999'}}
            />
            <Text style={styles.rememberMeText}>Remember me</Text>
          </View>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View>
          <Image
            source={require('../../assets/images/A2Z.png')}
            style={[styles.logo, {marginTop: 10}]}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginKSA;

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
  headerIconCont: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    height: 110,
    width: 170,
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
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },

  forgotPasswordText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    width: '100%',
    textDecorationLine: 'underline',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#000',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  signUpText: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  signUpButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
