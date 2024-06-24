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
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CustomSelectEntries from '../../components/CustomSelectEntries';
import {useNavigation} from '@react-navigation/native';
import {connect, useSelector} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import Api_Base_Url from '../../api';
import AlertMessage from '../../components/AlertMessage';
import BottomNavigatorKSA from '../../components/KSADelegates/BottomNavigatorKSA';
import CustomDrawerKSA from '../../components/KSADelegates/CustomDrawerKSA';

const {width, height} = Dimensions.get('screen');

const MeetingRequestScreenKsa = () => {
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
  const entriesData = [10, 25, 50];

  const user = useSelector(state => state?.userData);
  useEffect(() => {
    if (user && user?.user?.userData && user?.user?.userData?.id) {
      fetchDelegatesData();
    } else {
      console.error('User ID is undefined');
      setLoading(false);
    }
  }, []);

  const fetchDelegatesData = async key => {
    try {
      const response = await axios.get(`${Api_Base_Url}showMeetings`, {
        params: {user_id: user?.user?.userData?.id},
      });
      const {received_requests, sent_requests} = response.data;
      if (key === undefined) {
        setReceivedRequests(received_requests);
        setSentRequests(sent_requests);
      } else if (key === 'sent') {
        setSentRequests(sent_requests);
        setFilteredData(sent_requests);
      } else {
        setReceivedRequests(received_requests);
        setFilteredData(received_requests);
      }
    } catch (error) {
      console.error('Error fetching delegates data:', error);
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
          item.exporter.contact_name
            ?.toLowerCase()
            ?.includes(query?.toLowerCase()) ||
          item.id?.toString()?.includes(query) ||
          item.exporter.company_name
            ?.toLowerCase()
            ?.includes(query?.toLowerCase()) ||
          item.exporter.industry
            ?.toLowerCase()
            ?.includes(query?.toLowerCase()) ||
          item.exporter.website
            ?.toLowerCase()
            ?.includes(query?.toLowerCase()) ||
          item.exporter.email?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.exporter.phone?.toLowerCase()?.includes(query) ||
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
      console.error('Error deleting meeting:', error);
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
            <Text style={[styles.headerCell, {width: 40}]}>ID</Text>
            <Text style={styles.headerCell}>Name</Text>
            <Text style={styles.headerCell}>Company</Text>
            <Text style={styles.headerCell}>Sector</Text>
            <Text style={styles.headerCell}>Phone</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>Address</Text>
            <Text style={styles.headerCell}>Requested Date</Text>
            <Text style={styles.headerCell}>Requested Time</Text>
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
                <View key={item?.id} style={styles.row}>
                  <Text
                    style={[styles.headerCell, {width: 40, color: '#4a5f85'}]}>
                    {item?.exporter?.id}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.contact_name}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.company_name}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.industry}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.phone}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.email}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.address}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.date}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.time}
                  </Text>

                  <View style={styles.headerCell}>
                    <TouchableOpacity style={styles.meetingButton}>
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
                <View key={item?.id} style={styles.row}>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.industry}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.phone}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item?.exporter?.email}
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
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
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
      <AlertMessage
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
      <CustomDrawerKSA
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
      <BottomNavigatorKSA />
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
)(MeetingRequestScreenKsa);

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
    marginLeft: 2,
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
});
