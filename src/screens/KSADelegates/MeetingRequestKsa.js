import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AlertMessage from '../../components/AlertMessage';
import Api_Base_Url from '../../api';
import axios from 'axios'; // Ensure axios is imported
import {connect, useSelector} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import SelectDropdownKsa from '../../components/KSADelegates/SelectDropdownKsa';
import SelectDropdown from '../../components/PakExhibitor/SelectDropdownPak';

const {width, height} = Dimensions.get('screen');

const MeetingRequestKsa = ({modalVisible, setModalVisible, selectedRow}) => {
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTimeslot, setSelectedTimeslot] = useState('Select Timeslot');
  const [selectedLocation, setSelectedLocation] = useState(
    'Select Meeting Location',
  );
  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [loading, setLoading] = useState(false);

  const dates = [
    '2023-05-01',
    '2023-05-02',
    '2023-05-03',
    '2023-05-03',
    '2023-05-03',
  ];
  const timeslots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '11:00 AM - 12:00 PM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
  ];
  const locations = [
    'Ritz-Carlton, Riyadh',
    'Four Seasons Hotel, Riyadh',
    'Al Faisaliah Hotel, Riyadh',
    'Rosewood Jeddah, Jeddah',
    'Hilton Jeddah, Jeddah',
    'InterContinental Jeddah, Jeddah',
    'Mövenpick Hotel, Jeddah',
    'Sheraton Dammam Hotel, Dammam',
    'Kempinski Al Othman Hotel, Al Khobar',
    'Le Meridien, Al Khobar',
    'Marriott Hotel, Riyadh',
    'Hyatt Regency, Riyadh',
    'Narcissus Hotel, Riyadh',
    'Crowne Plaza, Riyadh',
    'Park Hyatt, Jeddah',
    'Radisson Blu, Jeddah',
    'Holiday Inn, Riyadh',
    'Novotel Al Anoud, Riyadh',
    'Holiday Inn Al Qasr, Riyadh',
    'InterContinental Al Khobar',
    'Radisson Blu, Al Khobar',
  ];

  const handleDateSelect = date => setSelectedDate(date);
  const handleTimeslotSelect = timeslot => setSelectedTimeslot(timeslot);
  const handleLocationSelect = location => setSelectedLocation(location);
  const handleMessageChange = text => setMessage(text);

  const user = useSelector(state => state?.userData?.user);
  const handleSendMessage = async () => {
    if (
      selectedDate === 'Select Date' ||
      selectedTimeslot === 'Select Timeslot' ||
      selectedLocation === 'Select Meeting Location' ||
      message === ''
    ) {
      setAlertMessage('Please fill all the fields');
      setAlertType('error');
      setAlertVisible(true);
    } else {
      const data = {
        user_id: user?.userData?.id,
        buyer_id: user?.userData?.buyer_exporter_id,
        requested_by: user?.userData?.buyer_exporter_id,
        exporter_id: selectedRow.id,
        exporter_email: selectedRow.email,
        date: selectedDate,
        time: selectedTimeslot,
        location: selectedLocation,
        other_location: null,
        message: message,
      };

      try {
        setLoading(true);
        const response = await axios.post(
          `${Api_Base_Url}meetingRequestExporter`,
          data,
        );
        if (response.status === 200) {
          setAlertMessage('Meeting request sent successfully!');
          setAlertType('success');
          setAlertVisible(true);
          setSelectedDate('Select Date');
          setSelectedTimeslot('Select Timeslot');
          setSelectedLocation('Select Meeting Location');
          setMessage('');
          setLoading(false);
        } else {
          setAlertMessage('Failed to send meeting request. Please try again.');
          setAlertType('error');
          setAlertVisible(true);
          setLoading(false);
        }
      } catch (error) {
        setAlertMessage('Failed to send meeting request. Please try again.');
        setAlertType('error');
        setAlertVisible(true);
        setLoading(false);
      }
    }
  };

  const closeAlert = () => {
    setAlertVisible(false);
  };

  return (
    <View style={styles.container}>
      <AlertMessage
        message={alertMessage}
        type={alertType}
        visible={alertVisible}
        onClose={closeAlert}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Alkaram Meeting Request</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  name="times"
                  type="material"
                  size={26}
                  color={'#0059CF'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalSeparator} />
            <View style={styles.modalContent}>
              <Text style={styles.modalSubTitle}>Send request for Meeting</Text>
              <View style={styles.dropdownContainer}>
                <View style={styles.dropdownSection}>
                  <Text style={styles.dropdownHeading}>Select Date</Text>
                  <SelectDropdown
                    title={'Select Date'}
                    options={dates}
                    selectedValue={selectedDate}
                    onSelect={handleDateSelect}
                  />
                </View>
                <View style={styles.dropdownSection}>
                  <Text style={styles.dropdownHeading}>Select Timeslot</Text>
                  <SelectDropdown
                    title={'Select Timeslot'}
                    options={timeslots}
                    selectedValue={selectedTimeslot}
                    onSelect={handleTimeslotSelect}
                  />
                </View>
              </View>
            </View>
            <View style={styles.modalSeparator} />
            <Text style={styles.meetingHeading}>Meeting Location</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationHeading}>Select Location</Text>
              <SelectDropdown
                title={'Select Location'}
                options={locations}
                selectedValue={selectedLocation}
                onSelect={handleLocationSelect}
              />
            </View>
            <View style={styles.separator} />
            <Text style={styles.messageHeading}>Type Message...</Text>
            <TextInput
              style={styles.messageInput}
              onChangeText={handleMessageChange}
              value={message}
              multiline={true}
              placeholder="Message..."
              placeholderTextColor={'#ccc'}
              textAlignVertical="top"
            />
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendMessage}>
              <Text style={styles.sendButtonText}>Send Meeting Request</Text>
            </TouchableOpacity>
            {loading && (
              <ActivityIndicator
                style={styles.activityIndicator}
                color="#4a5f85"
                size={40}
              />
            )}
          </View>
        </View>
      </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(MeetingRequestKsa);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
    width: width,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: width * 0.9,
    height: height * 0.75,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  modalTitle: {
    color: '#3C4B64',
    fontWeight: '600',
    fontSize: width * 0.05,
  },
  modalSeparator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  modalContent: {
    width: '100%',
  },
  modalSubTitle: {
    color: '#3C4B64',
    fontWeight: '600',
    fontSize: width * 0.05,
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownSection: {
    width: '48%',
  },
  dropdownHeading: {
    fontWeight: '600',
    fontSize: width * 0.04,
    color: '#3C4B64',
    marginBottom: 5,
  },
  meetingHeading: {
    fontWeight: '600',
    fontSize: width * 0.05,
    color: '#3C4B64',
    marginVertical: 10,
  },
  locationContainer: {
    marginBottom: 10,
  },
  locationHeading: {
    fontSize: width * 0.04,
    fontWeight: '600',
    color: '#3C4B64',
    marginBottom: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 10,
  },
  messageHeading: {
    fontSize: width * 0.04,
    color: '#3C4B64',
    fontWeight: '600',
    marginBottom: 10,
  },
  messageInput: {
    height: height * 0.15,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    color: 'black',
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: '#0059CF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 999,
  },
});
