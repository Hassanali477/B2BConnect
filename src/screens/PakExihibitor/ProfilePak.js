import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {Icon} from 'react-native-elements';
import AlertMessage from '../../components/AlertMessage'; // Import the AlertMessage component
import BottomNavigator from '../../components/BottomNavigator';

const {width, height} = Dimensions.get('window');

const ProfilePak = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updatedFullName, setUpdatedFullName] = useState(fullName);
  const [updatedCompanyName, setUpdatedCompanyName] = useState(companyName);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(phoneNumber);
  const [updatedEmail, setUpdatedEmail] = useState(email);
  const [updatedWebsiteLink, setUpdatedWebsiteLink] = useState(websiteLink);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const openModal = () => {
    setIsModalVisible(true);
  };

  const updateProfile = () => {
    if (
      !updatedFullName ||
      !updatedCompanyName ||
      !updatedPhoneNumber ||
      !updatedEmail ||
      !updatedWebsiteLink
    ) {
      setAlertMessage('All fields are required.');
      setAlertType('error');
      setAlertVisible(true);
      return;
    }

    setFullName(updatedFullName);
    setCompanyName(updatedCompanyName);
    setPhoneNumber(updatedPhoneNumber);
    setEmail(updatedEmail);
    setWebsiteLink(updatedWebsiteLink);
    setIsModalVisible(false);
    setAlertMessage('Profile updated successfully.');
    setAlertType('success');
    setAlertVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Icon
          name="keyboard-backspace"
          type="material-community"
          color="#000"
          size={30}
          onPress={() => navigation.goBack()}
        />
        <Image
          source={require('../../assets/images/SplashScreen.png')}
          style={styles.headerImage}
        />
        <Icon
          name="account-edit"
          type="material-community"
          color="#000"
          size={30}
          onPress={openModal}
        />
      </View>

      {/* Profile Section */}
      <View style={styles.card}>
        <Text style={styles.profileTitle}>My Profile</Text>
        <TextInput
          style={[styles.input, {color: '#000'}]}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          placeholderTextColor="#000"
        />
        <TextInput
          style={[styles.input, {color: '#000'}]}
          value={companyName}
          onChangeText={setCompanyName}
          placeholder="Company Name"
          placeholderTextColor="#000"
        />
        <TextInput
          style={[styles.input, {color: '#000'}]}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#000"
        />
        <TextInput
          style={[styles.input, {color: '#000'}]}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          placeholderTextColor="#000"
        />
        <TextInput
          style={[styles.input, {color: '#000'}]}
          value={websiteLink}
          onChangeText={setWebsiteLink}
          placeholder="Website Link"
          keyboardType="url"
          placeholderTextColor="#000"
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity
        style={[styles.updateButton, {marginTop: width * 0.1}]}
        onPress={openModal}>
        <Text style={styles.updateButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Modal for editing profile */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../assets/images/SplashScreen.png')}
              style={styles.modalImage}
            />
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeading}>Update Profile</Text>
              <Icon
                name="close"
                type="material-community"
                color="#000"
                size={30}
                onPress={() => setIsModalVisible(false)}
              />
            </View>
            <TextInput
              style={styles.input}
              value={updatedFullName}
              onChangeText={setUpdatedFullName}
              placeholder="Full Name"
              placeholderTextColor="#000"
            />
            <TextInput
              style={styles.input}
              value={updatedCompanyName}
              onChangeText={setUpdatedCompanyName}
              placeholder="Company Name"
              placeholderTextColor="#000"
            />
            <TextInput
              style={styles.input}
              value={updatedEmail}
              onChangeText={setUpdatedEmail}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#000"
            />
            <TextInput
              style={styles.input}
              value={updatedPhoneNumber}
              onChangeText={setUpdatedPhoneNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              placeholderTextColor="#000"
            />
            <TextInput
              style={styles.input}
              value={updatedWebsiteLink}
              onChangeText={setUpdatedWebsiteLink}
              placeholder="Website Link"
              keyboardType="url"
              placeholderTextColor="#000"
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={updateProfile}>
              <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Alert Message */}
      <AlertMessage
        message={alertMessage}
        type={alertType}
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
      />
      <BottomNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.04,
  },
  headerImageCont: {
    width: '100%',
    alignItems: 'center',
  },
  headerImage: {
    width: 200,
    height: 70,
    resizeMode: 'contain',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: height * 0.08,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: width * 0.1,
  },
  header: {
    fontSize: width * 0.07,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: width * 0.03,
    borderRadius: width * 0.02,
  },
  card: {
    marginTop: width * 0.1,
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    padding: width * 0.04,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: width * 0.015,
    padding: width * 0.035,
    marginTop: 10,
    marginBottom: 15,
  },
  dropdownContainer: {
    marginBottom: height * 0.02,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: width * 0.015,
    padding: width * 0.03,
  },
  categoryText: {
    color: '#007bff',
  },
  updateButton: {
    backgroundColor: '#000',
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: 'center',
    marginTop: width * 0.1,
  },
  updateButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    padding: width * 0.04,
    width: '90%',
  },
  modalImage: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeading: {
    color: 'black',
    padding: 10,
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '500',
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: width * 0.015,
    padding: width * 0.03,
    marginTop: 10,
    marginBottom: 15,
    color: '#000',
  },
  updateButton: {
    backgroundColor: '#000',
    padding: width * 0.04,
    borderRadius: width * 0.02,
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  updateButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
  profileTitle: {
    color: 'black',
    padding: 10,
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '500',
    alignSelf: 'center',
  },
});

export default ProfilePak;
