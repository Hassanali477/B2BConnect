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
import BottomNavigator from '../../components/BottomNavigator';
import CustomDrawer from '../../components/CustomDrawer';

const {width, height} = Dimensions.get('screen');

const MeetingRequestScreenPak = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState('received');
  const [showEntries, setShowEntries] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const entriesData = [10, 25, 50];

  const generateDummyData = () => {
    const dummyData = [];
    for (let i = 1; i <= 60; i++) {
      dummyData.push({
        id: i,
        name: `Delegate ${i}`,
        company: `Company ${i}`,
        sector:
          i % 6 === 0
            ? 'Node JS'
            : i % 5 === 0
            ? 'React Developer'
            : i % 4 === 0
            ? 'Analyst'
            : i % 3 === 0
            ? 'Manager'
            : i % 2 === 0
            ? 'Designer'
            : 'Developer',
        website: `www.company${i}.com`,
        email: `delegate${i}@company${i}.com`,
        mobile: `${Math.floor(Math.random() * 900000000) + 100000000}`,
        location: i % 2 === 0 ? 'Riyadh' : i % 3 === 0 ? 'Jeddah' : 'Mecca',
        address: `Address ${i}`,
        requestedDate: `2024-06-${i < 10 ? `0${i}` : i}`,
        requestedTime: `${i % 12 || 12}:00 ${i % 2 === 0 ? 'PM' : 'AM'}`,
        newTime: `${(i % 12) + 1}:00 ${i % 2 === 0 ? 'PM' : 'AM'}`,
      });
    }
    return dummyData;
  };

  const delegatesData = generateDummyData();

  useEffect(() => {
    setFilteredData(delegatesData);
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredData(delegatesData);
    } else {
      const filtered = delegatesData.filter(
        item =>
          item.name?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.id?.toString()?.includes(query) ||
          item.company?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.sector?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.website?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.email?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.mobile?.toLowerCase()?.includes(query) ||
          item.location?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.address?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.requestedDate?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.requestedTime?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item.newTime?.toLowerCase()?.includes(query?.toLowerCase()),
      );
      setFilteredData(filtered);
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
                  <Text
                    style={[styles.headerCell, {width: 20, color: '#4a5f85'}]}>
                    {item.id}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.company}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.sector}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.mobile}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.email}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.address}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.requestedDate}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.requestedTime}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.newTime}
                  </Text>
                  <View style={styles.headerCell}>
                    <TouchableOpacity style={styles.meetingButton}>
                      <Text style={styles.meetingButtonText}>Revoke</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
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
            <Text style={[styles.headerCell, {width: 20}]}>ID</Text>
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
                  <Text
                    style={[styles.headerCell, {width: 20, color: '#4a5f85'}]}>
                    {item.id}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.sector}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.mobile}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.email}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.location}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.newTime}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {item.requestedDate}
                  </Text>
                  <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                    {selectedTab === 'received' ? 'Pending' : 'Requested'}
                  </Text>
                  <View style={styles.headerCell}>
                    <TouchableOpacity style={styles.meetingButton}>
                      <Text style={styles.meetingButtonText}>Revoke</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
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
          onPress={() => setSelectedTab('received')}>
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
          onPress={() => setSelectedTab('sent')}>
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
              delegatesData={delegatesData}
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
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
      <BottomNavigator />
    </KeyboardAvoidingView>
  );
};

export default MeetingRequestScreenPak;

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
});
