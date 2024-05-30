import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import SelectDropdown from '../../components/PakExhibitor/SelectDropdownPak';
import AlertMessage from '../../components/AlertMessage';

const {width, height} = Dimensions.get('screen');

const MeetingRequestPak = ({
  modalVisible,
  setModalVisible,
}) => {
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTimeslot, setSelectedTimeslot] = useState('Select Timeslot');
  const [selectedLocation, setSelectedLocation] = useState(
    'Select Meeting Location',
  );
  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

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

  const handleSendMessage = () => {
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
      setAlertMessage('Meeting request sent successfully!');
      setAlertType('success');
      setAlertVisible(true);
      setSelectedDate('Select Date');
      setSelectedTimeslot('Select Timeslot');
      setSelectedLocation('Select Meeting Location');
      setMessage('');
    }
  };

  const closeAlert = () => {
    setAlertVisible(false);
    setModalVisible(false);
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
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MeetingRequestPak;

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
    width: width / 1.1,
    height: height / 1.3,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalHeader: {
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#3C4B64',
    fontWeight: '600',
    fontSize: 20,
  },
  modalSeparator: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: '#ccc',
  },
  modalContent: {
    width: '100%',
  },
  mainContent: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalSubTitle: {
    color: '#3C4B64',
    fontWeight: '600',
    padding: 10,
    fontSize: 20,
    width: '100%',
  },
  dropdownContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownSection: {
    width: '48%',
  },
  dropdownHeading: {
    fontWeight: '600',
    fontSize: 14,
    color: '#3C4B64',
    marginLeft: 5,
  },
  meetingHeading: {
    fontWeight: '600',
    fontSize: 20,
    color: '#3C4B64',
    width: '94%',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
  },
  locationContainer: {
    width: '100%',
    padding: 10,
  },
  locationHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3C4B64',
    marginLeft: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  messageHeading: {
    width: '100%',
    fontSize: 14,
    color: '#3C4B64',
    fontWeight: '600',
    padding: 10,
  },
  messageInput: {
    height: '25%',
    width: '95%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    alignSelf: 'center',
    paddingHorizontal: 10,
    color: 'black',
  },
  sendButton: {
    width: '80%',
    backgroundColor: '#0059CF',
    borderWidth: 1,
    padding: 15,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
