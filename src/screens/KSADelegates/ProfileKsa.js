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
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Icon as RNElementsIcon} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';

import AlertMessage from '../../components/AlertMessage'; // Import the AlertMessage component
import BottomNavigator from '../../components/BottomNavigator';
import HeaderComponent from '../../components/HeaderComponent';
import CustomDrawer from '../../components/CustomDrawer';

const {width, height} = Dimensions.get('window');

const ProfileKsa = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [profile, setProfile] = useState({
    fullName: 'Hassan',
    companyName: 'A2Z Creatorz',
    phoneNumber: '03497070872',
    email: 'hassanmarwat326@gmail.com',
    websiteLink: 'https://marwat477.insta',
  });

  const [updatedProfile, setUpdatedProfile] = useState({
    fullName: 'Hassan',
    companyName: 'A2Z Creatorz',
    phoneNumber: '03497070872',
    email: 'hassanmarwat326@gmail.com',
    websiteLink: 'https://marwat477.insta',
  });

  const openModal = () => {
    setIsModalVisible(true);
    setUpdatedProfile(profile);
  };

  const updateProfile = () => {
    const {fullName, companyName, phoneNumber, email, websiteLink} =
      updatedProfile;

    if (!fullName || !companyName || !phoneNumber || !email || !websiteLink) {
      setAlertMessage('All fields are required.');
      setAlertType('error');
      setAlertVisible(true);
      return;
    }

    setProfile(updatedProfile);
    setIsModalVisible(false);
    setAlertMessage('Profile updated successfully.');
    setAlertType('success');
    setAlertVisible(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -width * 0.1}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => setDrawerVisible(!drawerVisible)}>
            <IoniconsIcon name="menu" size={30} color="#000" />
          </TouchableOpacity>
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.headerImage}
          />
          <RNElementsIcon
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
            value={profile.fullName}
            onChangeText={text =>
              setUpdatedProfile({...updatedProfile, fullName: text})
            }
            placeholder="Full Name"
            placeholderTextColor="#000"
          />
          <TextInput
            style={[styles.input, {color: '#000'}]}
            value={profile.companyName}
            onChangeText={text =>
              setUpdatedProfile({...updatedProfile, companyName: text})
            }
            placeholder="Company Name"
            placeholderTextColor="#000"
          />
          <TextInput
            style={[styles.input, {color: '#000'}]}
            value={profile.email}
            onChangeText={text =>
              setUpdatedProfile({...updatedProfile, email: text})
            }
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#000"
            editable={false}
          />
          <TextInput
            style={[styles.input, {color: '#000'}]}
            value={profile.phoneNumber}
            onChangeText={text =>
              setUpdatedProfile({...updatedProfile, phoneNumber: text})
            }
            placeholder="Phone Number"
            keyboardType="phone-pad"
            placeholderTextColor="#000"
            maxLength={15}
          />
          <TextInput
            style={[styles.input, {color: '#000'}]}
            value={profile.websiteLink}
            onChangeText={text =>
              setUpdatedProfile({...updatedProfile, websiteLink: text})
            }
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
          <KeyboardAvoidingView
            style={styles.modalContainer}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -width * 0.1}
            behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
            <View style={styles.modalContent}>
              <Image
                source={require('../../assets/images/SplashScreen.png')}
                style={styles.modalImage}
              />
              <View style={styles.modalHeader}>
                <Text style={styles.modalHeading}>Update Profile</Text>
                <FontAwesomeIcon
                  name="times"
                  size={28}
                  color={'#0059CF'}
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
              <TextInput
                style={styles.input}
                value={updatedProfile.fullName}
                onChangeText={text =>
                  setUpdatedProfile({...updatedProfile, fullName: text})
                }
                placeholder="Full Name"
                placeholderTextColor="#000"
              />
              <TextInput
                style={styles.input}
                value={updatedProfile.companyName}
                onChangeText={text =>
                  setUpdatedProfile({...updatedProfile, companyName: text})
                }
                placeholder="Company Name"
                placeholderTextColor="#000"
              />
              <TextInput
                style={styles.input}
                value={updatedProfile.email}
                onChangeText={text =>
                  setUpdatedProfile({...updatedProfile, email: text})
                }
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#000"
                editable={false}
              />
              <TextInput
                style={styles.input}
                value={updatedProfile.phoneNumber}
                onChangeText={text =>
                  setUpdatedProfile({...updatedProfile, phoneNumber: text})
                }
                placeholder="Phone Number"
                keyboardType="phone-pad"
                placeholderTextColor="#000"
                maxLength={15}
              />
              <TextInput
                style={styles.input}
                value={updatedProfile.websiteLink}
                onChangeText={text =>
                  setUpdatedProfile({...updatedProfile, websiteLink: text})
                }
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
          </KeyboardAvoidingView>
        </Modal>
        {/* Alert Message */}
        <AlertMessage
          message={alertMessage}
          type={alertType}
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
      <BottomNavigator />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: width * 0.04,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.1,
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
    paddingHorizontal: 5,
    borderRadius: 10,
    marginTop: width * 0.1,
  },
  IconArrow: {
    borderWidth: 1,
    borderColor: '#4a5f85',
    borderRadius: 10,
    padding: width * 0.01,
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
    color: '#000',
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
    backgroundColor: '#4a5f85',
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
    width: 180,
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
});

export default ProfileKsa;
