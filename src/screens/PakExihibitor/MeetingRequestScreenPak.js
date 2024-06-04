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
          item.location?.toLowerCase()?.includes(query?.toLowerCase()),
      );
      setFilteredData(filtered);
    }
  };

  const renderRequests = () => (
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
            <Text style={styles.headerCell}>Website</Text>
            <Text style={styles.headerCell}>Email</Text>
            <Text style={styles.headerCell}>Mobile</Text>
            <Text style={styles.headerCell}>Location</Text>
            <Text style={styles.headerCell}>Status</Text>
          </View>
          <ScrollView
            style={{height: height * 0.4}}
            showsVerticalScrollIndicator={false}>
            {filteredData.map(item => (
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
                  {item.website}
                </Text>
                <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                  {item.email}
                </Text>
                <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                  {item.mobile}
                </Text>
                <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                  {item.location}
                </Text>
                <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                  {selectedTab === 'received' ? 'Pending' : 'Requested'}
                </Text>
              </View>
            ))}
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
      {renderRequests()}
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
    width: width / 1.16,
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTab: {
    backgroundColor: '#4a5f85',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainHeadCont: {
    width: width / 1.16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: '#0059CF',
    borderRadius: 5,
    alignItems: 'center',
  },
  meetingButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#0059CF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mainHeadText: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 3,
  },
});

export default MeetingRequestScreenPak;
