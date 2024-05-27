import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Icon} from 'react-native-elements';
import AlertMessage from '../../components/AlertMessage';
import SelectDropdownKsa from '../../components/KSADelegates/SelectDropdownKsa';

const {width, height} = Dimensions.get('screen');
const MeetingRequestKsa = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('Select Date');
  const [selectedTimeslot, setSelectedTimeslot] = useState('Select Timeslot');
  const [selectedLocation, setSelectedLocation] = useState(
    'Select Meeting Location',
  );
  const [message, setMessage] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const dates = ['2023-05-01', '2023-05-02', '2023-05-03'];
  const timeslots = [
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '01:00 PM - 02:00 PM',
  ];

  const locations = [
    'Jeddah Hilton, Jeddah',
    'InterContinental Jeddah, Jeddah',
    'Crowne Plaza, Riyadh',
    'Four Seasons Hotel Riyadh, Riyadh',
    'Mövenpick Hotel, Riyadh',
    'Ritz-Carlton, Riyadh',
    'Le Meridien, Al Khobar',
    'Sheraton Dammam Hotel, Dammam',
    'Hilton Garden Inn, Al Khobar',
    'Sofitel Al Khobar, Al Khobar',
    'Burj Al Arab, Dubai',
    'Atlantis The Palm, Dubai',
    'Jumeirah Beach Hotel, Dubai',
    'Armani Hotel, Dubai',
    'The Ritz-Carlton, Dubai',
    'Waldorf Astoria, Dubai',
    'Four Seasons Resort Dubai, Dubai',
    'Address Downtown, Dubai',
    'Raffles Dubai, Dubai',
    'Fairmont The Palm, Dubai',
  ];

  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  const handleTimeslotSelect = timeslot => {
    setSelectedTimeslot(timeslot);
  };

  const handleLocationSelect = location => {
    setSelectedLocation(location);
  };
  const handleMessageChange = text => {
    setMessage(text);
  };

  const handleSendMessage = () => {
    if (
      selectedDate === 'Select Date' ||
      selectedTimeslot === 'Select Timeslot' ||
      selectedLocation === 'Select Meeting Location' ||
      message === ''
    ) {
      setAlertMessage('Please fill all the fields');
      setAlertType('error');
    } else {
      setAlertMessage('Meeting request sent successfully!');
      setAlertType('success');
      setModalVisible(false);
      setSelectedDate('Select Date'),
        setSelectedTimeslot('Select Timeslot'),
        setSelectedLocation('Select Meeting Location'),
        setMessage('');
    }
    setAlertVisible(true);
  };

  const closeAlert = () => setAlertVisible(false);
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
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Meeting Request - Alkaram Textiles
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  name="close"
                  type="material"
                  size={26}
                  color={'#3C4B64'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalSeparator}></View>
            <View style={styles.modalContent}>
              <Text style={styles.modalSubTitle}>Send request for Meeting</Text>
              <View style={styles.dropdownContainer}>
                <View style={styles.dropdownSection}>
                  <Text style={styles.dropdownHeading}>Select Date</Text>
                  <SelectDropdownKsa
                    title={'Select Date'}
                    options={dates}
                    selectedValue={selectedDate}
                    onSelect={handleDateSelect}
                  />
                </View>
                <View style={styles.dropdownSection}>
                  <Text style={styles.dropdownHeading}>Select Timeslot</Text>
                  <SelectDropdownKsa
                    title={'Select Timeslot'}
                    options={timeslots}
                    selectedValue={selectedTimeslot}
                    onSelect={handleTimeslotSelect}
                  />
                </View>
              </View>
            </View>
            <View style={styles.modalSeparator}></View>
            <Text style={styles.meetingHeading}>Meeting Location</Text>
            <View style={styles.locationContainer}>
              <Text style={styles.locationHeading}>Select Location</Text>
              <SelectDropdownKsa
                title={'Select Location'}
                options={locations}
                selectedValue={selectedLocation}
                onSelect={handleLocationSelect}
              />
            </View>
            <View style={styles.separator}></View>
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
      <View style={styles.mainContent}>
        <Button title="Show Modal KSA" onPress={() => setModalVisible(true)} />
      </View>
    </View>
  );
};

export default MeetingRequestKsa;

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
    fontSize: 19,
  },
  modalSeparator: {
    borderBottomWidth: 1,
    width: '100%',
    borderColor: '#ccc',
  },
  modalContent: {
    width: '100%',
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
  mainContent: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  meetingHeading: {
    fontWeight: '600',
    fontSize: 22,
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
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderWidth: 1,
    padding: 15,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  sendButtonText: {
    color: '#3C4B64',
    fontWeight: 'bold',
  },
});
