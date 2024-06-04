import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CustomDrawer from '../../components/CustomDrawer';
import BottomNavigator from '../../components/BottomNavigator';
import AlertMessage from '../../components/AlertMessage';

const { width, height } = Dimensions.get('screen');

const FeedbackScreen = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [numberOfVisitors, setNumberOfVisitors] = useState('');
  const [numberOfCompanies, setNumberOfCompanies] = useState('');
  const [numberOfBooked, setNumberOfBooked] = useState('');
  const [ordersBooked, setOrdersBooked] = useState('');
  const [comments, setComments] = useState('');

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error');

  const handleNumberChange = (text) => setNumberOfVisitors(text);
  const handleNumberOfCompanies = (text) => setNumberOfCompanies(text);
  const handleNumberOfBooked = (text) => setNumberOfBooked(text);
  const handleOrdersBooked = (text) => setOrdersBooked(text);
  const handleComments = (text) => setComments(text);

  const validateForm = () => {
    if (!numberOfVisitors) {
      setAlertMessage('Number of Visitors is required.');
      return false;
    }
    if (!numberOfCompanies) {
      setAlertMessage('Number of Companies is required.');
      return false;
    }
    if (!numberOfBooked) {
      setAlertMessage('Number of Orders is required.');
      return false;
    }
    if (!ordersBooked) {
      setAlertMessage('Value of Orders is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Number of Visitors:', numberOfVisitors);
      console.log('Number of Companies:', numberOfCompanies);
      console.log('Number of Orders:', numberOfBooked);
      console.log('Orders Booked:', ordersBooked);
      console.log('Comments:', comments);
      setAlertType('success');
      setAlertMessage('Feedback submitted successfully!');
      setAlertVisible(true);
    } else {
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -width * 0.1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <HeaderComponent onMenuPress={() => setDrawerVisible(!drawerVisible)} />
      <View style={styles.headerCont}>
        <Text style={styles.heading}>Feedback Form</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Number of visitors received during exhibition
          </Text>
          <TextInput
            style={styles.numberInput}
            keyboardType="numeric"
            value={numberOfVisitors}
            onChangeText={handleNumberChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Number of companies that showed interest
          </Text>
          <TextInput
            style={styles.textInput}
            value={numberOfCompanies}
            onChangeText={handleNumberOfCompanies}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Number of orders booked</Text>
          <TextInput
            style={styles.textInput}
            value={numberOfBooked}
            onChangeText={handleNumberOfBooked}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>
            Approximate value of orders booked (USD)
          </Text>
          <TextInput
            style={styles.textInput}
            value={ordersBooked}
            onChangeText={handleOrdersBooked}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Your Comments</Text>
          <TextInput
            style={styles.commentsInput}
            multiline={true}
            value={comments}
            onChangeText={handleComments}
            placeholder="Enter your comments"
            placeholderTextColor="#ccc"
            textAlignVertical="top"
          />
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
      <BottomNavigator />
      <AlertMessage
        message={alertMessage}
        type={alertType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    padding: 10,
  },
  headerCont: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: width * 0.04,
  },
  inputLabel: {
    color: '#3C4B64',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
  },
  commentsInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#000',
    width: '100%',
    height: 100,
  },
  submitButton: {
    width: '40%',
    backgroundColor: '#4a5f85',
    borderWidth: 1,
    borderColor: '#4a5f85',
    paddingVertical: 12,
    borderRadius: 10,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FeedbackScreen;
