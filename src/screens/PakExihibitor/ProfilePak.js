import React, {useEffect, useState} from 'react';
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
import CustomDrawer from '../../components/CustomDrawer';
import axios from 'axios'; // Ensure axios is imported
import Api_Base_Url from '../../api/index';
import {connect, useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

const {width, height} = Dimensions.get('window');

const ProfilePak = props => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state?.userData?.user);
  console.log(props, 'checking data');
  const [fullName, setFullName] = useState();
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [updatedFullName, setUpdatedFullName] = useState('');
  const [updatedCompanyName, setUpdatedCompanyName] = useState('');
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState('');
  const [updatedWebsiteLink, setUpdatedWebsiteLink] = useState('');
  const openModal = () => {
    setIsModalVisible(true);
    setUpdatedFullName(fullName);
    setUpdatedCompanyName(companyName);
    setUpdatedPhoneNumber(phoneNumber);
    setUpdatedWebsiteLink(websiteLink);
  };

  const validateInputs = () => {
    if (!updatedFullName.trim()) {
      setAlertMessage('Full Name is required.');
      return false;
    }
    if (!updatedCompanyName.trim()) {
      setAlertMessage('Company Name is required.');
      return false;
    }
    if (!updatedPhoneNumber.trim()) {
      setAlertMessage('Phone Number must be between 10 to 15 digits.');
      return false;
    }
    if (!updatedWebsiteLink.trim()) {
      setAlertMessage('Invalid Website URL.');
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      const updateData = {
        contact_name: updatedFullName,
        category: 'required',
        phone: updatedPhoneNumber,
        country_code: 'required',
        country: 'required',
        website: updatedWebsiteLink,
        company_name: updatedCompanyName,
        is_pasha_member: 1,
        services_offered: 'services_offered',
        about_us: 'about_us',
      };
      const response = await axios.put(
        `${Api_Base_Url}updateProfile/1742`,
        updateData,
      );
      if (response.status === 200) {
        // props.actions.user(response.data.user);
        dispatch(user(response.data.user));
        setFullName(updatedFullName);
        setCompanyName(updatedCompanyName);
        setPhoneNumber(updatedPhoneNumber);
        setWebsiteLink(updatedWebsiteLink);
        setAlertMessage('Profile updated successfully.');
        setAlertType('success');
        setAlertVisible(true);
        setIsModalVisible(false);
      } else {
        setAlertMessage(response.data.message || 'Failed to update profile.');
        setAlertType('error');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage(
        error.response?.data?.message ||
          'An error occurred while updating the profile.',
      );
      setAlertType('error');
      setAlertVisible(true);
    }
  };

  const setData = () => {
    setLoading(true);
    setFullName(user?.userData?.name);
    setCompanyName(user?.userAdditionalData?.company_name);
    setEmail(user?.userData?.email);
    setPhoneNumber(user?.userAdditionalData?.phone);
    setWebsiteLink(user?.userAdditionalData?.website);
    setLoading(false);
  };
  useEffect(() => {
    setData();
  }, []);

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

        {/*Profile Section */}
        {loading && <CustomActivityIndicator />}
        {!loading && (
          <View style={styles.card}>
            <Text style={styles.profileTitle}>My Profile</Text>
            <TextInput
              style={[styles.input, {color: '#000'}]}
              value={fullName}
              placeholder="Full Name"
              placeholderTextColor="#000"
              editable={false}
            />
            <TextInput
              style={[styles.input, {color: '#000'}]}
              value={companyName}
              placeholder="Company Name"
              placeholderTextColor="#000"
              editable={false}
            />
            <TextInput
              style={[styles.input, {color: '#000'}]}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#000"
              editable={false}
            />
            <TextInput
              style={[styles.input, {color: '#000'}]}
              value={phoneNumber}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              placeholderTextColor="#000"
              editable={false}
            />
            <TextInput
              style={[styles.input, {color: '#000'}]}
              value={websiteLink}
              placeholder="Website Link"
              keyboardType="url"
              placeholderTextColor="#000"
              editable={false}
            />
          </View>
        )}

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
                value={updatedFullName}
                onChangeText={text => setUpdatedFullName(text)}
                placeholder="Full Name"
                placeholderTextColor="#000"
              />
              <TextInput
                style={styles.input}
                value={updatedCompanyName}
                onChangeText={text => setUpdatedCompanyName(text)}
                placeholder="Company Name"
                placeholderTextColor="#000"
              />
              <TextInput
                style={styles.input}
                value={updatedPhoneNumber}
                onChangeText={text => setUpdatedPhoneNumber(text)}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                placeholderTextColor="#000"
                maxLength={15}
              />
              <TextInput
                style={styles.input}
                value={updatedWebsiteLink}
                onChangeText={text => setUpdatedWebsiteLink(text)}
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
        navigation={props.navigation}
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

const mapStateToProps = state => ({
  userData: state.userData,
});

const ActionCreators = Object.assign({}, userActions);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePak);
