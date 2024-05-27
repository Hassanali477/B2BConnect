import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CustomDropdown from '../../components/CustomDropdown';
import CustomSelectEntries from '../../components/CustomSelectEntries';
import MeetingRequestPak from './MeetingRequestPak';
import CustomDrawer from '../../components/CustomDrawer';
import {Icon} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const DashboardPak = () => {
  const navigation = useNavigation();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showEntries, setShowEntries] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTextInput, setSearchTextInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const jobData = [
    {label: 'Developer', value: 'developer'},
    {label: 'Designer', value: 'designer'},
    {label: 'Manager', value: 'manager'},
    {label: 'Analyst', value: 'analyst'},
    {label: 'React Developer', value: 'react developer'},
    {label: 'Node JS', value: 'node js'},
  ];

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

  const handleSelectJob = item => {
    setSelectedJob(item);
    setDropdownVisible(false);
    const filteredData = delegatesData.filter(
      delegate => delegate.sector.toLowerCase() === item.value.toLowerCase(),
    );
    setFilteredData(filteredData);
  };

  useEffect(() => {
    setFilteredData(delegatesData);
  }, []);

  const handleSearch = (query, key) => {
    switch (key) {
      case 'Keyword':
        setSearchQuery(query);
        break;
      case 'Search':
        setSearchTextInput(query);
        break;
    }
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
  const handleAboutPress = userData => {
    setSelectedUserData(userData);
    setModalVisible1(true);
  };
  return (
    <View style={styles.container}>
      <HeaderComponent onMenuPress={() => setDrawerVisible(!drawerVisible)} />
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>List of KSA DELEGATES</Text>
      </View>
      <View style={styles.headerSubCont}>
        <Text style={styles.headerSubText}>Search Criteria</Text>
        <View style={styles.headerSubTextInput}>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setDropdownVisible(!dropdownVisible)}>
              <Text style={styles.text}>
                {selectedJob ? selectedJob.label : 'All Sectors ...'}
              </Text>
              <Icon
                name="keyboard-arrow-down"
                size={24}
                color="black"
                style={styles.icon}
              />
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={styles.dropdownListContainer}>
                <FlatList
                  data={jobData}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.dropdownItem}
                      onPress={() => handleSelectJob(item)}>
                      <Text style={styles.text}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.value}
                />
              </View>
            )}
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter Keyword"
            placeholderTextColor={'#000'}
            value={searchQuery}
            onChangeText={text => handleSearch(text, 'Keyword')}
          />
        </View>
      </View>
      <View style={styles.mainHeadCont}>
        <View style={{width: '45%'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 15, fontWeight: '600'}}>
              Show
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: '600',
                marginLeft: 3,
              }}>
              Entries
            </Text>
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
            value={searchTextInput}
            onChangeText={text => handleSearch(text, 'Search')}
          />
        </View>
      </View>

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
              <Text style={styles.headerCell}>About</Text>
              <Text style={styles.headerCell}>Meeting</Text>
            </View>
            <ScrollView
              style={{height: height * 0.4}}
              showsVerticalScrollIndicator={false}>
              {filteredData.map(item => (
                <View key={item.id} style={styles.row}>
                  <Text style={[styles.headerCell, {width: 20, color: 'grey'}]}>
                    {item.id}
                  </Text>
                  <Text style={styles.headerCell}>{item.name}</Text>
                  <Text style={styles.headerCell}>{item.company}</Text>
                  <Text style={styles.headerCell}>{item.sector}</Text>
                  <Text style={styles.headerCell}>{item.website}</Text>
                  <Text style={styles.headerCell}>{item.email}</Text>
                  <Text style={styles.headerCell}>{item.mobile}</Text>
                  <Text style={styles.headerCell}>{item.location}</Text>
                  <View style={styles.headerCell}>
                    <TouchableOpacity
                      style={styles.meetingButton}
                      onPress={() => handleAboutPress(item)}>
                      <Text style={styles.meetingButtonText}>About</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.headerCell}>
                    <TouchableOpacity
                      style={styles.meetingButton}
                      onPress={() => setModalVisible(true)}>
                      <Text style={styles.meetingButtonText}>Request</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <MeetingRequestPak
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => setModalVisible1(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeading}>About</Text>
            <View style={styles.card}>
              <View style={styles.cardItem}>
                <Text style={styles.cardLabel}>Name:</Text>
                <Text style={styles.cardValue}>{selectedUserData?.name}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardLabel}>Email:</Text>
                <Text style={styles.cardValue}>{selectedUserData?.email}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardLabel}>Company:</Text>
                <Text style={styles.cardValue}>
                  {selectedUserData?.company}
                </Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardLabel}>Sector:</Text>
                <Text style={styles.cardValue}>{selectedUserData?.sector}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardLabel}>Mobile:</Text>
                <Text style={styles.cardValue}>{selectedUserData?.mobile}</Text>
              </View>
              <View style={styles.cardItem}>
                <Text style={styles.cardLabel}>Location:</Text>
                <Text style={styles.cardValue}>
                  {selectedUserData?.location}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible1(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
    </View>
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
  headerSubCont: {
    width: '100%',
    borderColor: '#ccc',
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 20,
    zIndex: 999,
  },
  headerSubText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubTextInput: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  searchInput: {
    width: '45%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    color: '#000',
  },
  dropdownContainer: {
    width: '45%',
    position: 'relative',
    zIndex: 999,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
  },
  icon: {
    marginLeft: 10,
  },
  dropdownListContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    zIndex: 999,
  },
  dropdownList: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
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
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: '#ccc',
    marginBottom: 15,
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
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  meetingButtonText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalHeading: {
    alignSelf: 'center',
    padding: 5,
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  cardLabel: {
    fontWeight: 'bold',
    marginRight: 5,
    color: '#007bff', // Blue color
    fontSize: 16,
  },
  cardValue: {
    flex: 1,
    color: '#333', // Dark gray color
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 1,
  },

  closeButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default DashboardPak;
