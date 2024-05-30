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
  ImageBackground,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AlertMessage from '../../components/AlertMessage';
import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('screen');

const LoginPak = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      setShowAlert(true);
    }
    navigation.navigate('DashboardPak');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPasswordPak');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconCont}>
          <Icon
            name="keyboard-backspace"
            type="material-community"
            color="grey"
            size={30}
            style={styles.IconArrow}
            onPress={() => navigation.goBack()}
          />
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.logoTop}
          />
        </View>
        <Text style={styles.headerText}>Sign in</Text>
        <Text style={styles.headerText2}>
          Welcome back! Please enter your details
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
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#000"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!passwordVisible} // Toggle secureTextEntry based on passwordVisible state
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <FontAwesome
              name={passwordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="grey"
            />
          </TouchableOpacity>
        </View>
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
            style={styles.logoBottom}
          />
        </View>
        <AlertMessage
          message="Login Successful. Welcome back!"
          type="success"
          visible={showAlert}
          onClose={() => setShowAlert(false)}
        />
      </View>
    </View>
  );
};

export default LoginPak;

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
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignItems: 'center',
  },
  logoTop: {
    height: 110,
    width: 180,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: width * 0.16,
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
    width: width * 0.15,
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    height: height * 0.05,
    color: 'black',
  },
  eyeIcon: {
    padding: 10,
  },
  logoBottom: {
    height: height * 0.11,
    width: width * 0.45,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
