import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ActivityIndicator,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CustomSelectEntries from '../../components/CustomSelectEntries';
import {useNavigation} from '@react-navigation/native';
import BottomNavigator from '../../components/BottomNavigator';
import CustomDrawer from '../../components/CustomDrawer';
import {connect, useSelector} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import Api_Base_Url from '../../api';
import AlertMessage from '../../components/AlertMessage';
import {Icon} from 'react-native-elements';
import SelectDropdown from '../../components/PakExhibitor/SelectDropdownPak';

const {width, height} = Dimensions.get('screen');

const MeetingRequestScreenPak = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('received');
  const [showEntries, setShowEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const entriesData = [10, 25, 50];
  const [showModal, setShowModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [newTime, setNewTime] = useState('');
  const [newDate, setNewDate] = useState('');
  const [meetingID, setMeetingID] = useState(null);
  const user = useSelector(state => state?.userData);

  useEffect(() => {
    if (user && user?.user?.userData && user?.user?.userData?.id) {
      setLoading(true);
      fetchDelegatesData(selectedTab);
    } else {
      console.error('User ID is undefined');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setFilteredData(
      selectedTab === 'received' ? receivedRequests : sentRequests,
    );
  }, [selectedTab, receivedRequests, sentRequests]);

  const fetchDelegatesData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Api_Base_Url}showMeetings`, {
        params: {user_id: user?.user?.userData?.id},
      });
      const {received_requests, sent_requests} = response.data;
      setReceivedRequests(received_requests);
      setSentRequests(sent_requests);
    } catch (error) {
      console.error('Error fetching delegates data:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(
        selectedTab === 'received' ? receivedRequests : sentRequests,
      );
      setNoResults(false);
    } else {
      const filtered = (
        selectedTab === 'received' ? receivedRequests : sentRequests
      ).filter(
        item =>
          item.buyer.contact_name
            ?.toLowerCase()
            ?.includes(query?.toLowerCase()) ||
          item.id?.toString()?.includes(query) ||
          item.buyer.company_name
            ?.toLowerCase()
            ?.includes(query?.toLowerCase()) ||
          item.buyer.industry?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.buyer.website?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.buyer.email?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.buyer.phone?.toLowerCase()?.includes(query) ||
          item.location?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.date?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.time?.toLowerCase()?.includes(query?.toLowerCase()),
      );
      setFilteredData(filtered);
      setNoResults(filtered.length === 0);
    }
  };

  const onRemoveMeeting = async (meetingID, key) => {
    try {
      const response = await axios.delete(
        `${Api_Base_Url}meetingRevoke/` + meetingID,
      );
      if (response.status === 200) {
        fetchDelegatesData(key);
        setAlertMessage('Meeting deleted successfully!');
        setAlertVisible(true);
      }
    } catch (error) {
      setAlertMessage('Error revoking meeting');
      setAlertVisible(true);
      console.error('Error fetching delegates data:', error.message);
      console.error('Error response data:', error.response?.data);
      console.error('Error response status:', error.response?.status);
    }
  };

  const handleApprove = async (meetingID, key, retryCount = 0) => {
    try {
      const response = await axios.get(
        `${Api_Base_Url}meetingApprove/` + meetingID,
      );
      if (response.status === 200) {
        setAlertMessage('Meeting approved successfully!');
        setAlertVisible(true);
        fetchDelegatesData(key); // Refresh the data
        const updatedData = filteredData.filter(item => item.id !== meetingID);
        setFilteredData(updatedData);
      } else {
        setAlertMessage('Error approving meeting.');
        setAlertVisible(true); // Ensure to set alertVisible for error case as well
      }
    } catch (error) {
      if (error.response?.status === 429) {
        const delay = Math.pow(2, retryCount) * 1000; // Exponential backoff
        setTimeout(() => handleApprove(meetingID, key, retryCount + 1), delay);
      } else {
        console.error('Error fetching delegates data:', error);
        setAlertMessage('Error approving meeting.'); // Set error message for catch block
        setAlertVisible(true); // Set alertVisible to true in case of error
      }
    }
  };
  const handleDecline = meetingID => {
    setMeetingID(meetingID);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setDeclineReason('');
    setMeetingID(null);
  };

  const handleDeclineRequest = async () => {
    try {
      const response = await axios.post(
        `${Api_Base_Url}meetingDecline/${meetingID}`,
        {
          reason_for_decline: declineReason,
        },
      );
      if (response.status === 200) {
        setAlertMessage('Meeting declined successfully!');
        setAlertVisible(true);
        fetchDelegatesData();
        const updatedData = filteredData.filter(item => item.id !== meetingID);
        setFilteredData(updatedData);
      } else {
        setAlertMessage('Failed to decline meeting.');
        setAlertVisible(true);
        console.error('Error response data:', response.data);
        console.error('Error response status:', response.status);
        console.log(
          `Declining meeting ${meetingID} for reason: ${reason_for_decline}`,
        );
      }
    } catch (error) {
      console.error('Error declining meeting:', error);
      setAlertMessage('Failed to decline meeting.');
      setAlertVisible(true);
    } finally {
      handleModalClose();
    }
  };

  const handleReschedule = meetingID => {
    setMeetingID(meetingID);
    setRescheduleModalVisible(true);
  };

  const sendRequest = () => {
    handleRescheduleRequest();
  };

  const handleRescheduleRequest = async () => {
    const data = {
      meeting_id: meetingID,
      date: newDate,
      time: newTime,
    };

    try {
      const response = await axios.post(
        `${Api_Base_Url}meetingReschedule`,
        data,
      );

      if (response.status === 200) {
        setAlertMessage('Your reschedule request has been sent successfully!');
        setAlertVisible(true);
        fetchDelegatesData();
        const updatedData = filteredData.filter(item => item.id !== meetingID);
        setFilteredData(updatedData);
      } else {
        setAlertMessage('Failed to send reschedule request.');
        setAlertVisible(true);
      }
    } catch (error) {
      console.error('Error rescheduling meeting:', error);
      setAlertMessage('Failed to send reschedule request.');
      setAlertVisible(true);
    } finally {
      setRescheduleModalVisible(false);
    }
  };

  const renderReceivedRequests = () => (
    <View style={styles.tableContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
        }}>
        <View>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, {width: 20}]}>ID</Text>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Company</Text>
            <Text style={styles.headerCell}>Sector</Text>
            <Text style={styles.headerCell}>Phone</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>Address</Text>
            <Text style={styles.headerCell}>Requested Date</Text>
            <Text style={styles.headerCell}>Requested Time</Text>
            <Text style={styles.headerCell}>New Time</Text>
            <Text style={styles.headerCell}>Approve</Text>
            <Text style={styles.headerCell}>Decline</Text>
          </View>

          <ScrollView
            style={{height: height * 0.4}}
            showsVerticalScrollIndicator={false}>
            {filteredData.length === 0 ? (
              <View style={styles.noDataRow}>
                <Text style={styles.noDataText}>
                  No data available in table
                </Text>
              </View>
            ) : (
              <>
                {filteredData.map((item, index) => (
                  <View key={item.id} style={styles.row}>
                    <Text
                      style={[
                        styles.headerCell,
                        {width: 20, color: '#4a5f85'},
                      ]}>
                      {index + 1}
                    </Text>
                    <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                      {item.buyer?.contact_name}
                    </Text>
                    <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                      {item.buyer?.company_name}
                    </Text>
                    <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                      {item.buyer?.industry}
                    </Text>
                    <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                      {item.buyer?.phone}
                    </Text>
                    <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                      {item.buyer?.email}
                    </Text>
                    <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                      {item.location}
                    </Text>
                    <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                      {item.date}
                    </Text>
                    <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                      {item.time}
                    </Text>
                    <View style={styles.headerCell}>
                      <TouchableOpacity
                        style={styles.meetingButton}
                        onPress={() => handleReschedule(item?.id)}>
                        <Text style={styles.meetingButtonText}>Reschedule</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.headerCell}>
                      <TouchableOpacity
                        style={styles.meetingButton}
                        onPress={() => handleApprove(item?.id, selectedTab)}>
                        <Text style={styles.meetingButtonText}>Approve</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.headerCell}>
                      <TouchableOpacity
                        style={[
                          styles.meetingButton,
                          {backgroundColor: '#FF6347'},
                        ]}
                        onPress={() => {
                          handleDecline(item?.id);
                        }}>
                        <Text style={styles.meetingButtonText}>Decline</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            )}
            {noResults && (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No results found.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );

  const renderSentRequests = () => (
    <View style={styles.tableContainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'flex-start',
          alignSelf: 'flex-start',
        }}>
        <View>
          <View style={styles.headerRow}>
            <Text style={styles.headerCell}>Sector</Text>
            <Text style={styles.headerCell}>Phone</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>City</Text>
            <Text style={styles.headerCell}>Time</Text>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Action</Text>
          </View>
          <ScrollView
            style={{height: height * 0.4}}
            showsVerticalScrollIndicator={false}>
            {filteredData.length === 0 ? (
              <View style={styles.noDataRow}>
                <Text style={styles.noDataText}>
                  No data available in table
                </Text>
              </View>
            ) : (
              filteredData.map(item => (
                <View key={item.id} style={styles.row}>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.buyer.industry}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.buyer.phone}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.buyer.email}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.location}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.time}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.date}
                  </Text>
                  <Text
                    style={[
                      styles.headerCell,
                      {
                        backgroundColor:
                          item.is_approved === 1 ? '#2EB85C' : '#E03232',
                        padding: width * 0.025,
                      },
                    ]}>
                    {item.is_approved === 1 ? 'Approved' : 'Pending'}
                  </Text>
                  <View style={styles.headerCell}>
                    <TouchableOpacity
                      style={styles.meetingButton}
                      onPress={() => onRemoveMeeting(item?.id, 'sent')}>
                      <Text style={styles.meetingButtonText}>Revoke</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
            {noResults && (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No results found.</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );

  // const handleShowEntriesChange = value => {
  //   setShowEntries(value);

  //   let newData = [];
  //   setFilteredData(newData);
  // };

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
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -width * 0.1}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
      <HeaderComponent onMenuPress={() => setDrawerVisible(!drawerVisible)} />

      <View style={styles.headerCont}>
        <Text style={styles.headerText}>Meeting Request</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'received' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('received');
            setFilteredData(receivedRequests);
          }}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'received' && {color: '#fff'},
            ]}>
            Received Requests
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'sent' && styles.activeTab]}
          onPress={() => {
            setSelectedTab('sent');
            setFilteredData(sentRequests);
          }}>
          <Text
            style={[styles.tabText, selectedTab === 'sent' && {color: '#fff'}]}>
            Sent Requests
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainHeadCont}>
        <View style={{width: '45%'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.mainHeadText}>Show</Text>
            <Text style={styles.mainHeadText}>Entries</Text>
            <CustomSelectEntries
              data={entriesData}
              selectedValue={showEntries}
              onSelect={setShowEntries}
              delegatesData={filteredData}
              setFilteredData={setFilteredData}
            />
          </View>
        </View>
        <View style={{width: '45%'}}>
          <TextInput
            style={styles.searchInput2}
            placeholder="Search..."
            placeholderTextColor={'#000'}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      {selectedTab === 'received'
        ? renderReceivedRequests()
        : renderSentRequests()}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeadingContainer}>
              <Text style={styles.modalHeading}>Decline Request</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleModalClose}>
                <Icon name="close" type="material" color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
            <Text style={styles.reasonHeading}>Reason for Decline:</Text>
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter reason..."
              multiline={true}
              value={declineReason}
              onChangeText={text => setDeclineReason(text)}
            />
            <TouchableOpacity
              style={styles.declineButton}
              onPress={handleDeclineRequest}>
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={rescheduleModalVisible}
        onRequestClose={() => setRescheduleModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, {width: '90%'}]}>
            <View style={styles.modalHeadingContainer}>
              <Text style={styles.modalHeading}>New Meeting Time</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setRescheduleModalVisible(false)}>
                <Icon name="close" type="material" color="#000" />
              </TouchableOpacity>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.dropdownContainer}>
              <View style={[styles.dropdownWrapper, {zIndex: 999}]}>
                <SelectDropdown
                  title="Select New Time"
                  options={[
                    '10:00 AM',
                    '11:00 AM',
                    '12:00 PM',
                    '01:00 PM',
                    '02:00 PM',
                    '03:00 PM',
                    '04:00 PM',
                    '05:00 PM',
                  ]}
                  selectedValue={newTime}
                  onSelect={setNewTime}
                />
              </View>
              <View style={[styles.dropdownWrapper, {zIndex: 999}]}>
                <SelectDropdown
                  title="Select New Date"
                  options={generateDates()}
                  selectedValue={newDate}
                  onSelect={setNewDate}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.rescheduleButton}
              onPress={() => {
                sendRequest();
              }}>
              <Text style={styles.rescheduleButtonText}>Send Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <AlertMessage
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
      <BottomNavigator />
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color="#4a5f85"
          size={40}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MeetingRequestScreenPak);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
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
  headerText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTab: {
    backgroundColor: '#4a5f85',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  mainHeadCont: {
    width: width / 1.16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainHeadText: {
    fontSize: 16,
    marginRight: 5,
    color: 'black',
    fontWeight: 'bold',
  },
  searchInput2: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  tableContainer: {
    width: '95%',
    backgroundColor: '#fff',
    marginTop: width * 0.06,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ccc',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    padding: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerCell: {
    fontSize: 16,
    width: 180,
    alignItems: 'center',
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    padding: 13,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  meetingButton: {
    width: 100,
    padding: 10,
    backgroundColor: '#4a5f85',
    borderRadius: 5,
    alignItems: 'center',
  },
  meetingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noDataRow: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  noDataText: {
    fontSize: 16,
  },
  noResultsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  modalHeading: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    // position: 'absolute',
    // top: 10,
    // right: 10,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdownWrapper: {
    width: '48%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    margin: 10,
  },
  divider: {
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
    borderColor: '#ccc',
  },
  reasonHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    alignSelf: 'flex-start',
  },
  reasonInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: '#000',
    textAlignVertical: 'top',
  },
  selectContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  selectDropdown: {
    borderBottomWidth: 1,
  },
  declineButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  declineButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rescheduleButton: {
    marginTop: 20,
    backgroundColor: '#4a5f85',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '60%', // Center vertically
    zIndex: 999,
  },
});
