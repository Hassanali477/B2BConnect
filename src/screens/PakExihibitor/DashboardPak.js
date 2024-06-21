import React, {useCallback, useEffect, useState} from 'react';
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
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from 'react-native';
import HeaderComponent from '../../components/HeaderComponent';
import CustomDropdown from '../../components/CustomDropdown';
import CustomSelectEntries from '../../components/CustomSelectEntries';
import MeetingRequestPak from './MeetingRequestPak';
import CustomDrawer from '../../components/CustomDrawer';
import {Icon as RNElementsIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import BottomNavigator from '../../components/BottomNavigator';
import axios from 'axios';
import Api_Base_Url from '../../api';
import AlertMessage from '../../components/AlertMessage';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

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
  const [alertVisible, setAlertVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [showAlert, setAlertMessage] = useState(false);
  const entriesData = [10, 25, 50];

  const fetchDelegatesData = async () => {
    try {
      const response = await axios.get(`${Api_Base_Url}KSADelegate`, {
        params: {
          user_id: 1742,
        },
      });
      const data = await response.data;
      setLoading(false);
      setFilteredData(data);
      setApiData(data);
      setNoResultsFound(false);
    } catch (error) {
      console.error('Error fetching delegates data:', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDelegatesData();
    setIsFilterApplied(false);
    setIsSearchApplied(false);
    setNoResultsFound(false);
  }, []);

  const handleSelectJob = item => {
    setSelectedJob(item);
    setDropdownVisible(false);
    filterData(item);
    setIsFilterApplied(true);
  };

  const filterData = item => {
    if (item === 'All Sectors') {
      setFilteredData(apiData);
      setNoResultsFound(false);
    } else {
      const filtered = apiData?.buyers?.filter(delegate =>
        delegate?.industry?.toLowerCase()?.includes(item?.toLowerCase()),
      );
      var obj = {
        buyers: filtered,
      };
      setFilteredData(obj);
      setNoResultsFound(filtered.length === 0);
      setAlertMessage(filterData.length === 0);
    }
  };
  const handleRemoveFilter = () => {
    setSelectedJob(null);
    setSearchQuery('');
    setSearchTextInput('');
    filterData('All Sectors');
    setIsFilterApplied(false); // Reset filter applied flag
    setIsSearchApplied(false); // Reset search applied flag
    setNoResultsFound(false);
    setAlertMessage(false);
  };

  const handleSearch = (query, key) => {
    switch (key) {
      case 'Keyword':
        setSearchQuery(query);
        setIsSearchApplied(true);
        break;
      case 'Search':
        setSearchTextInput(query);
        setIsSearchApplied(true);
        break;
    }
    if (query === '') {
      fetchDelegatesData();
      setIsSearchApplied(false);
    } else {
      const filtered = apiData?.buyers?.filter(
        item =>
          item?.id?.toString()?.includes(query) ||
          item?.contact_name?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item?.company_name?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item?.industry?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item?.website?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item?.email?.toLowerCase()?.includes(query?.toLowerCase()) ||
          item?.phone?.toLowerCase()?.includes(query) ||
          item?.country?.toLowerCase()?.includes(query?.toLowerCase()),
      );
      var obj = {
        buyers: filtered,
      };
      setFilteredData(obj);
      setNoResultsFound(filtered.length === 0);
      setAlertMessage(filtered.length === 0);
    }
  };
  const handleAboutPress = userData => {
    setSelectedUserData(userData);
    setModalVisible1(true);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -width * 0.1}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
      <HeaderComponent onMenuPress={() => setDrawerVisible(!drawerVisible)} />
      <View style={styles.headerCont}>
        <Text style={styles.headerText}>List of KSA DELEGATES</Text>
      </View>
      <View style={styles.headerSubCont}>
        <View style={styles.headerTextSearch}>
          <Text style={styles.headerSubText}>Search Criteria</Text>
          {(isFilterApplied || isSearchApplied) && (
            <TouchableOpacity
              style={styles.removeFilterButton}
              onPress={handleRemoveFilter}>
              <Text style={styles.removeFilterButtonText}>Remove Filter</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setDropdownVisible(!dropdownVisible)}>
            <Text style={styles.text}>{selectedJob || 'All Sectors'}</Text>
            <Icon name="angle-down" size={24} color="#000" />
          </TouchableOpacity>
          {dropdownVisible && (
            <View style={styles.dropdownListContainer}>
              <ScrollView>
                {apiData?.industries.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => handleSelectJob(item)}>
                    <Text style={styles.text}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
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
              delegatesData={apiData?.buyers}
              setFilteredData={item => setFilteredData(item)}
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
      {/* <View
        style={{
          alignItems: 'flex-start',
          width: '90%',
          marginTop: 10,
        }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter Keyword"
          placeholderTextColor={'#000'}
          value={searchQuery}
          onChangeText={text => handleSearch(text, 'Keyword')}
        />
      </View> */}

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
              {loading === true ? (
                <CustomActivityIndicator />
              ) : Array.isArray(filteredData?.buyers) &&
                filteredData?.buyers?.length > 0 ? (
                <ScrollView
                  style={{height: height * 0.4}}
                  showsVerticalScrollIndicator={false}>
                  {filteredData?.buyers?.map((item, index) => {
                    return (
                      <View key={item.id} style={styles.row}>
                        <Text
                          style={[
                            styles.headerCell,
                            {width: 40, color: '#4a5f85'},
                          ]}>
                          {index + 1}
                        </Text>
                        <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                          {item.contact_name}
                        </Text>
                        <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                          {item.company_name}
                        </Text>
                        <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                          {item.industry}
                        </Text>
                        <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                          {item.website}
                        </Text>
                        <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                          {item.email}
                        </Text>
                        <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                          {item.phone}
                        </Text>
                        <Text style={[styles.headerCell, {color: '#4a5f85'}]}>
                          {item.country}
                        </Text>
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
                            onPress={() => {
                              setModalVisible(true);
                              setSelectedRow(item);
                            }}>
                            <Text style={styles.meetingButtonText}>
                              Request
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}></Text>
                </View>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>

      {modalVisible && (
        <MeetingRequestPak
          onClose={() => setModalVisible(false)}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedRow={selectedRow}
        />
      )}
      {modalVisible1 && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.header}>
                <Text style={styles.modalHeading}>Buyer Details</Text>
                <TouchableOpacity onPress={() => setModalVisible1(false)}>
                  <Icon name="times" size={28} color="#0059CF" />
                </TouchableOpacity>
              </View>
              <View style={styles.card}>
                {selectedUserData && (
                  <>
                    <View style={styles.cardItem}>
                      <Text style={styles.cardLabel}>Name:</Text>
                      <Text style={styles.cardValue}>
                        {selectedUserData.contact_name}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.cardLabel}>Email:</Text>
                      <Text style={styles.cardValue}>
                        {selectedUserData.email}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.cardLabel}>Company:</Text>
                      <Text style={styles.cardValue}>
                        {selectedUserData.company_name}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.cardLabel}>Sector:</Text>
                      <Text style={styles.cardValue}>
                        {selectedUserData.industry}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.cardLabel}>Mobile:</Text>
                      <Text style={styles.cardValue}>
                        {selectedUserData.phone}
                      </Text>
                    </View>
                    <View style={styles.cardItem}>
                      <Text style={styles.cardLabel}>Location:</Text>
                      <Text style={styles.cardValue}>
                        {selectedUserData.country}
                      </Text>
                    </View>
                  </>
                )}
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible1(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <AlertMessage
        message="No results found for your search query."
        visible={alertVisible}
        onClose={() => setAlertMessage(false)}
      />
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
  headerSubCont: {
    width: '100%',
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 20,
    zIndex: 999,
  },
  headerTextSearch: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
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
    width: '100%',
    position: 'relative',
    zIndex: 999,
    marginTop: 10,
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
    fontSize: 15,
    color: '#000',
  },
  icon: {
    marginLeft: 10,
  },
  dropdownListContainer: {
    // position: 'absolute',
    // top: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    zIndex: 999,
    maxHeight: 180,
  },
  scrollViewContent: {
    paddingBottom: 10, // Adjust this value according to your need
  },
  dropdownItem: {
    padding: 6,
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
    marginTop: width * 0.03,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    marginBottom: 20,
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a5f85',
    flex: 1,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    flex: 2,
    textAlign: 'right',
  },
  closeButton: {
    backgroundColor: '#0059CF',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  button: {
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: 'grey',
  },
  exitButton: {
    backgroundColor: 'red',
  },
  removeFilterButton: {
    backgroundColor: '#DD2C00',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  removeFilterButtonText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '500',
    alignSelf: 'center',
  },
  noResultsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, // Adjust as needed
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555', // Adjust the color as needed
  },
});

export default DashboardPak;
