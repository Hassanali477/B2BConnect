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
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Icon as RNElementsIcon} from 'react-native-elements';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import AlertMessage from '../../components/AlertMessage'; // Import the AlertMessage component
// import BottomNavigator from '../../components/BottomNavigator';
// import CustomDrawer from '../../components/CustomDrawer';
import axios from 'axios'; // Ensure axios is imported
import Api_Base_Url from '../../api/index';
import {connect, useDispatch, useSelector} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import CustomDrawerKSA from '../../components/KSADelegates/CustomDrawerKSA';
import BottomNavigatorKSA from '../../components/KSADelegates/BottomNavigatorKSA';

const {width, height} = Dimensions.get('window');

const ProfileKsa = props => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state?.userData?.user);

  const [fullName, setFullName] = useState('');
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
      setAlertType('error');
      setAlertVisible(true);
      return false;
    }
    if (!updatedCompanyName.trim()) {
      setAlertMessage('Company Name is required.');
      setAlertType('error');
      setAlertVisible(true);
      return false;
    }
    if (
      !updatedPhoneNumber.startsWith('+966') ||
      updatedPhoneNumber.length !== 13
    ) {
      setAlertMessage(
        'Phone Number must be 13 digits long and start with +966.',
      );
      setAlertType('error');
      setAlertVisible(true);
      return false;
    }
    if (!updatedPhoneNumber.startsWith('+966')) {
      setAlertMessage('Phone Number must contain only digits after +966..');
      setAlertType('error');
      setAlertVisible(true);
      return false;
    }

    if (!updatedWebsiteLink.trim()) {
      setAlertMessage('Invalid Website URL.');
      setAlertType('error');
      setAlertVisible(true);
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    if (!validateInputs()) {
      return;
    }
    try {
      setLoading(true);

      const updateData = {
        contact_name: updatedFullName,
        category: 'Hello',
        phone: updatedPhoneNumber,
        country_code: '+92',
        country: 'Pakistan',
        website: updatedWebsiteLink,
        company_name: updatedCompanyName,
        is_pasha_member: 1,
        services_offered: 'services_offered',
        about_us: 'about_us',
        address: 'House no 33',
      };

      const userId = user?.userData?.id;
      const response = await axios.put(
        `${Api_Base_Url}updateProfile/${userId}`,
        updateData,
      );
      if (response.status === 200) {
        setFullName(response?.data?.buyer?.contact_name);
        setCompanyName(response?.data?.buyer?.company_name);
        setPhoneNumber(response?.data?.buyer?.phone);
        setWebsiteLink(response?.data?.buyer?.website);

        user.userAdditionalData.company_name =
          response?.data?.buyer.company_name;
        user.userAdditionalData.phone = response?.data?.exporter?.phone;
        user.userAdditionalData.website = response?.data?.buyer.website;
        user.userAdditionalData.contact_name =
          response?.data?.buyer.contact_name;

        user.userData.name = response?.data?.buyer?.contact_name;
        dispatch(userActions.user(user));

        setAlertMessage('Profile updated successfully.');
        setAlertType('success');
        setAlertVisible(true);
      } else {
        setAlertMessage(response?.data?.message || 'Failed to update profile.');
        setAlertType('error');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlertMessage(
        error?.response?.data?.message ||
          'An error occurred while updating the profile.',
      );
      setAlertType('error');
      setAlertVisible(true);
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const setData = () => {
    if (user) {
      setFullName(user?.userData?.name || '');
      setCompanyName(user?.userAdditionalData?.company_name || '');
      setEmail(user?.userData?.email || '');
      setPhoneNumber(user?.userAdditionalData?.phone || '');
      setWebsiteLink(user?.userAdditionalData?.website || '');
    }
  };
  useEffect(() => {
    setData();
  }, [user]);
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
        <View style={styles.card}>
          <Text style={styles.profileTitle}>Profile</Text>
          <View style={styles.profileItem}>
            <FontAwesomeIcon
              name="user"
              size={25}
              color="#4a5f85"
              style={styles.icon}
            />
            <View style={styles.profileDetail}>
              <Text style={styles.label}>Full Name:</Text>
              <Text style={styles.value}>{fullName}</Text>
            </View>
          </View>
          <View style={styles.profileItem}>
            <FontAwesomeIcon
              name="building"
              size={25}
              color="#4a5f85"
              style={styles.icon}
            />
            <View style={styles.profileDetail}>
              <Text style={styles.label}>Company Name:</Text>
              <Text style={styles.value}>{companyName}</Text>
            </View>
          </View>
          <View style={styles.profileItem}>
            <FontAwesomeIcon
              name="envelope"
              size={25}
              color="#4a5f85"
              style={styles.icon}
            />
            <View style={styles.profileDetail}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
          </View>
          <View style={styles.profileItem}>
            <FontAwesomeIcon
              name="phone"
              size={25}
              color="#4a5f85"
              style={styles.icon}
            />
            <View style={styles.profileDetail}>
              <Text style={styles.label}>Phone Number:</Text>
              <Text style={styles.value}>{phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.profileItem}>
            <FontAwesomeIcon
              name="link"
              size={25}
              color="#4a5f85"
              style={styles.icon}
            />
            <View style={styles.profileDetail}>
              <Text style={styles.label}>Website Link:</Text>
              <Text style={styles.value}>{websiteLink}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.updateButton, {marginTop: width * 0.1}]}
          onPress={openModal}>
          <Text
            style={[
              styles.updateButtonText,
              {
                letterSpacing: 2,
                textTransform: 'uppercase',
                fontSize: 18,
              },
            ]}>
            Edit Profile
          </Text>
        </TouchableOpacity>
        {loading && <CustomActivityIndicator />}
        {!loading && (
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
                  <Text
                    style={[
                      styles.updateButtonText,
                      {
                        letterSpacing: 2,
                        textTransform: 'uppercase',
                        fontSize: 16,
                      },
                    ]}>
                    Update Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Modal>
        )}

        {/* Alert Message */}
        <AlertMessage
          message={alertMessage}
          type={alertType}
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
        />
      </ScrollView>
      <CustomDrawerKSA
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={props.navigation}
      />
      <BottomNavigatorKSA />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: width * 0.04,
    paddingBottom: height * 0.1,
  },
  profileTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#4a5f85',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  icon: {
    marginRight: 10,
  },
  profileDetail: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
    color: '#4a5f85',
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: width * 0.015,
    padding: width * 0.035,
    marginTop: 10,
    marginBottom: 15,
    color: '#000',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '20%',
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
    marginTop: width * 0.05,
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
    color: '#4a5f85',
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileKsa);
