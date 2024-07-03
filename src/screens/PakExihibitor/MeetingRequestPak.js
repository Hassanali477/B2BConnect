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
import SelectDropdown from '../../components/PakExhibitor/SelectDropdownPak';
import AlertMessage from '../../components/AlertMessage';
import Api_Base_Url from '../../api';
import axios from 'axios';
import {connect, useSelector} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';

const {width, height} = Dimensions.get('screen');

const generateDates = () => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]); // Format: YYYY-MM-DD
  }
  return dates;
};

// Define standard timeslots
const generateTimeslots = () => [
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '01:00 PM - 02:00 PM',
  '03:00 PM - 04:00 PM',
  '04:00 PM - 05:00 PM',
];

const MeetingRequestPak = ({modalVisible, setModalVisible, selectedRow}) => {
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

  const dates = generateDates();
  const timeslots = generateTimeslots();
  const locations = [
    'Pearl Continental Hotel, Karachi',
    'Marriott Hotel, Karachi',
    'Mövenpick Hotel, Karachi',
    'Avari Towers, Karachi',
    'Ramada Plaza, Karachi',
    'Regent Plaza Hotel & Convention Center, Karachi',
    'Beach Luxury Hotel, Karachi',
    'Hotel One, Karachi',
    'Ambassador Hotel, Karachi',
    'Dreamworld Resort, Karachi',
    'Islamabad Serena Hotel, Islamabad',
    'Pearl Continental Hotel, Lahore',
    'Nishat Hotel, Lahore',
    "Faletti's Hotel, Lahore",
    'Avari Hotel, Lahore',
    'Pearl Continental Hotel, Rawalpindi',
    'Ramada by Wyndham, Multan',
    'Pearl Continental Hotel, Peshawar',
    'Mövenpick Hotel, Islamabad',
    'Hotel One, Faisalabad',
    'The Residency Hotel, Lahore',
    'Marriott Hotel, Islamabad',
    'Hotel Crown Plaza, Islamabad',
    'Royalton Hotel, Faisalabad',
    'Hotel One, Sialkot',
    'Best Western Hotel, Islamabad',
    'Pearl Continental Hotel, Bhurban',
    'Shangrila Resort, Skardu',
    'Gilgit Serena Hotel, Gilgit',
    'Hunza Serena Inn, Hunza',
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
        exporter_id: user?.userData?.buyer_exporter_id,
        requested_by: user?.userData?.buyer_exporter_id,
        buyer_id: selectedRow.id,
        buyer_email: selectedRow.email,
        date: selectedDate,
        time: selectedTimeslot,
        location: selectedLocation,
        other_location: null,
        message: message,
      };

      try {
        setLoading(true);
        const response = await axios.post(
          `${Api_Base_Url}meetingRequestBuyer`,
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
              <Text style={styles.modalTitle}>Meeting Request - ELM</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="times" size={26} color={'#0059CF'} />
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
export default connect(mapStateToProps, mapDispatchToProps)(MeetingRequestPak);

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
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalSeparator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdownSection: {
    width: '48%',
  },
  dropdownHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  meetingHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  messageHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  messageInput: {
    height: height * 0.2,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#0059CF',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -20}, {translateY: -20}],
  },
});
