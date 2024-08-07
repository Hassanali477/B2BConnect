import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AlertMessage from '../../components/AlertMessage';
import {Icon} from 'react-native-elements';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import Api_Base_Url from '../../api/index';

const {width, height} = Dimensions.get('screen');

const LoginKSA = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRememberedCredentials = async () => {
      try {
        const rememberedCredentials = await AsyncStorage.getItem(
          '@usercredentials',
        );
        console.log('Retrieved user credentials:', rememberedCredentials);
        if (rememberedCredentials) {
          const {email, password, remember} = JSON.parse(rememberedCredentials);
          setEmail(email);
          setPassword(password);
          setRememberMe(remember);
        }
      } catch (error) {
        console.error('Failed to load remembered credentials', error);
      }
    };

    loadRememberedCredentials();
  }, []);

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateInputs = () => {
    let valid = true;
    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const apiCall = async userData => {
    try {
      const response = await axios.post(`${Api_Base_Url}loginAPI`, userData);
      return response;
    } catch (error) {
      console.error('API call failed', error);
      throw error;
    }
  };

  const handleSignIn = async () => {
    if (!validateInputs()) {
      return;
    }
    setLoading(true);

    try {
      const userCredentialsLogin = {
        email: email,
        password: password,
      };

      const response = await apiCall(userCredentialsLogin);

      if (response.data.status) {
        console.log('Login successfully', response.data);
        const {userData, userAdditionalData} = response.data;
        const {actions} = props;

        if (rememberMe) {
          await AsyncStorage.setItem(
            '@usercredentials',
            JSON.stringify({
              email: email,
              password: password,
              type: 'KSADelegate',
            }),
          );
        } else {
          await AsyncStorage.removeItem('@usercredentials');
        }

        var obj = {userData, userAdditionalData};
        actions.user(obj);
        props.navigation.navigate('DashboardKSA');
        setLoading(false);
      } else {
        console.error(
          'Login failed: Unexpected response status',
          response.status,
        );
      }
    } catch (error) {
      console.error('Login failed', error);
      setEmailError('Incorrect email and password.');
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotScreenKSA');
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );
  return (
    <View style={styles.container}>
      {loading && <CustomActivityIndicator />}
      {!loading && (
        <>
          <View style={styles.header}>
            <View style={styles.headerIconCont}>
              <View style={styles.IconArrowCont}>
                <Icon
                  name="keyboard-backspace"
                  type="material-community"
                  color="#4a5f85"
                  size={30}
                  onPress={() => navigation.navigate('AppStarter')}
                />
              </View>
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
              <Text style={styles.textInputHeading}>DELEGATE LOGIN</Text>
              <Image
                source={require('../../assets/images/Delegates.png')}
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
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#000"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry={!passwordVisible}
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
              <Text style={styles.buttonText} disabled={loading}>
                Sign In
              </Text>
            </TouchableOpacity>
            {loading ? <Text>Loading...</Text> : null}
            <View>
              <Image
                source={require('../../assets/images/A2Z.png')}
                style={styles.logoBottom}
              />
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('SignupKSA')}>
                  <Text style={styles.signupLink}>Sign up here</Text>
                </TouchableOpacity>
              </View>
            </View>
            <AlertMessage
              message="Login Successful. Welcome back!"
              type="success"
              visible={showAlert}
              onClose={() => setShowAlert(false)}
            />
          </View>
        </>
      )}
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginKSA);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  activityIndicator: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensure it's above other components
  },
  header: {
    width: width / 1.2,
    alignItems: 'flex-start',
  },
  headerIconCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  IconArrowCont: {
    borderWidth: 1,
    borderColor: '#4a5f85',
    borderRadius: 10,
    padding: width * 0.01,
  },
  logoTop: {
    height: 110,
    width: width * 0.46,
    resizeMode: 'contain',
    marginLeft: width * 0.12,
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
    height: 40,
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
    backgroundColor: '#4a5f85',
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
    width: width * 0.43,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  signupText: {
    fontSize: 16,
    color: 'grey',
  },
  signupLink: {
    fontSize: 16,
    color: '#4a5f85',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
