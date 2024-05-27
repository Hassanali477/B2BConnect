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

const {width, height} = Dimensions.get('screen');

const ForgotPasswordPak = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = email => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleResetPassword = () => {
    if (!email) {
      setEmailError('Email is required');
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
      Alert.alert(
        'Reset Link Sent',
        'A password reset link has been sent to your email.',
      );
      // Perform reset password action
    }
  };

  const handleSignIn = () => {
    navigation.navigate('LoginPak'); // Navigate to the Login screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconCont}>
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.logo}
          />
          <Image
            source={require('../../assets/images/A2Z.png')}
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
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Remember your password? </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signUpButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerIconCont: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    height: 110,
    width: 160,
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
