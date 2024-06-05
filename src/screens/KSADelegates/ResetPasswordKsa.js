import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomNavigator from '../../components/BottomNavigator';
import AlertMessage from '../../components/AlertMessage';
import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('screen');

const ResetPasswordKsa = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const validatePassword = password => {
    return password.length >= 8;
  };

  const handleResetPassword = () => {
    let valid = true;

    if (!oldPassword) {
      setOldPasswordError('Old Password is required');
      valid = false;
    } else {
      setOldPasswordError('');
    }

    if (!newPassword) {
      setNewPasswordError('New Password is required');
      valid = false;
    } else if (!validatePassword(newPassword)) {
      setNewPasswordError('New Password must be at least 8 characters');
      valid = false;
    } else {
      setNewPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      valid = false;
    } else if (confirmPassword !== newPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (valid) {
      setAlertType('success');
      setAlertMessage('Password Reset Successful');
      setAlertVisible(true);
      setTimeout(() => {
        navigation.navigate('LoginPak');
      }, 1000);
    }
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <AlertMessage
        message={alertMessage}
        type={alertType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <View style={styles.header}>
        <View style={styles.headerIconCont}>
          <View style={styles.IconArrow}>
            <Icon
              name="keyboard-backspace"
              type="material-community"
              color="#4a5f85"
              size={28}
              style={styles.IconArrow}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.heading}>KSA</Text>
        <Text style={styles.headerText}>Change Password</Text>
        <Text style={styles.headerText2}>Enter your old and new password</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Old Password"
            placeholderTextColor="#000"
            secureTextEntry={!oldPasswordVisible}
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
          />
          <TouchableOpacity onPress={toggleOldPasswordVisibility}>
            <FontAwesome
              name={oldPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="grey"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
        {oldPasswordError ? (
          <Text style={styles.errorText}>{oldPasswordError}</Text>
        ) : null}
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="New Password"
            placeholderTextColor="#000"
            secureTextEntry={!newPasswordVisible}
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
          />
          <TouchableOpacity onPress={toggleNewPasswordVisibility}>
            <FontAwesome
              name={newPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="grey"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
        {newPasswordError ? (
          <Text style={styles.errorText}>{newPasswordError}</Text>
        ) : null}
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            placeholderTextColor="#000"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            <FontAwesome
              name={confirmPasswordVisible ? 'eye' : 'eye-slash'}
              size={20}
              color="grey"
              style={{marginRight: 10}}
            />
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        ) : null}
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <Image
          source={require('../../assets/images/A2Z.png')}
          style={styles.logo1}
        />
      </View>
    </View>
  );
};

export default ResetPasswordKsa;

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
  IconArrow: {
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
    marginLeft: width * 0.13,
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
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    marginVertical: 10,
  },
  passwordInput: {
    width: '90%',
    height: height * 0.05,
    color: 'black',
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
    marginVertical: 5,
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
