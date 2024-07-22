import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import BottomNavigator from '../../components/BottomNavigator';
import CustomDrawer from '../../components/CustomDrawer';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';
import AlertMessage from '../../components/AlertMessage';
import {KeyboardAvoidingView} from 'react-native';
import axios from 'axios';
import Api_Base_Url from '../../api';
import {connect, useSelector} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import RNFS from 'react-native-fs';

const {width, height} = Dimensions.get('screen');

const ConfirmAppointment = () => {
  const user = useSelector(state => state?.userData?.user);
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${Api_Base_Url}confirmAppointment`, {
        params: {
          user_id: user?.userData?.id,
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to fetch data');
      }

      const data = response.data;
      const appointments = Object.values(data.confirmAppointment);
      setAppointments(appointments);
      setFilteredAppointments(appointments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      showAlertMessage('Error', 'Failed to fetch appointment data.');
      setLoading(false);
    }
  };

  // Check Permissions
  const checkPermissions = async () => {
    if (Platform.OS === 'android' && Platform.Version < 29) {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (!granted) {
        const result = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (result !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('WRITE_EXTERNAL_STORAGE permission denied');
        }
      }
    }
  };

  // Download PDF
  const downloadPDF = async () => {
    try {
      if (appointments.length === 0) {
        showAlertMessage('Error', 'No Pak Exhibitor appointments to download.');
        return;
      }

      setLoading(true);

      const htmlContent = `
        <html>
        <head>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Appointments</h1>
          <table>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Company</th>
              <th>Sector</th>
              <th>Phone</th>
              <th>Email</th>
              <th>City</th>
            </tr>
            ${appointments
              .map(
                item => `
              <tr>
                <td>${item.date}</td>
                <td>${item.time}</td>
                <td>${item.buyer.contact_name}</td>
                <td>${item.buyer.company_name}</td>
                <td>${item.buyer.industry}</td>
                <td>${item.buyer.phone}</td>
                <td>${item.buyer.email}</td>
                <td>${item.buyer.country}</td>
              </tr>
            `,
              )
              .join('')}
          </table>
        </body>
        </html>
      `;

      const options = {
        html: htmlContent,
        fileName: 'PakExhibitorAppointments',
        directory: 'Documents', // Save to Documents directory initially
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log('Generated PDF path:', file.filePath);

      // Save to /storage/emulated/0/Download
      const downloadsDir = '/storage/emulated/0/Download';
      let destPath = `${downloadsDir}/PakExhibitorAppointments.pdf`;
      let fileCounter = 1;
      while (await RNFS.exists(destPath)) {
        destPath = `${downloadsDir}/PakExhibitorAppointments_${fileCounter}.pdf`;
        fileCounter++;
      }

      console.log('Saving PDF to:', destPath);

      await RNFS.moveFile(file.filePath, destPath);
      setLoading(false);
      showAlertMessage('Success', 'PDF file downloaded successfully.');

      RNFetchBlob.android.actionViewIntent(destPath, 'application/pdf');
    } catch (error) {
      setLoading(false);
      showAlertMessage('Error', 'Failed to download PDF file.');
      console.error('PDF download error:', error);
    }
  };

  // Handle Download PDF
  const handleDownloadPDF = async () => {
    console.log('Handling PDF download');
    try {
      await checkPermissions();
      await downloadPDF();
    } catch (error) {
      console.error('Error handling permissions:', error);
      showAlertMessage('Error', 'Failed to handle permissions.');
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    setNoResultsFound(false);
    const filtered = appointments.filter(item =>
      Object.values(item).some(
        val =>
          typeof val === 'string' &&
          val.toLowerCase().includes(text.toLowerCase()),
      ),
    );
    setFilteredAppointments(filtered);
    setNoResultsFound(filtered.length === 0);
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -width * 0.1}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}>
      <HeaderComponent onMenuPress={() => setDrawerVisible(!drawerVisible)} />
      <AlertMessage
        message={alertMessage}
        type={alertType}
        visible={showAlert}
        onClose={() => setShowAlert(false)}
      />
      <View style={styles.headerCont}>
        <Text style={styles.heading}>Confirm Appointment</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={'#000'}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.button} onPress={handleDownloadPDF}>
          <Text style={styles.buttonText}>Download PDF</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            alignItems: 'flex-start',
            alignSelf: 'flex-start',
          }}>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.headerCell}>Date</Text>
              <Text style={styles.headerCell}>Time</Text>
              <Text style={styles.headerCell}>Name</Text>
              <Text style={styles.headerCell}>Company</Text>
              <Text style={styles.headerCell}>Sector</Text>
              <Text style={styles.headerCell}>Phone</Text>
              <Text style={styles.headerCell}>Email</Text>
              <Text style={styles.headerCell}>City</Text>
            </View>
            <ScrollView
              style={{height: height * 0.4}}
              showsVerticalScrollIndicator={true}>
              {filteredAppointments.map(item => (
                <View key={item.id} style={styles.row}>
                  <Text style={styles.cell}>{item.date}</Text>
                  <Text style={styles.cell}>{item.time}</Text>
                  <Text style={styles.cell}>{item?.buyer?.contact_name}</Text>
                  <Text style={styles.cell}>{item?.buyer?.company_name}</Text>
                  <Text style={styles.cell}>{item.buyer.industry}</Text>
                  <Text style={styles.cell}>{item?.buyer?.phone}</Text>
                  <Text style={styles.cell}>{item?.buyer?.email}</Text>
                  <Text style={styles.cell}>{item?.buyer?.country}</Text>
                </View>
              ))}
              {/* <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No results found.</Text>
              </View> */}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
      {loading && (
        <ActivityIndicator
          style={styles.activityIndicator}
          color="#4a5f85"
          size={40}
        />
      )}
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
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    alignSelf: 'flex-start',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#000',
    width: '48%',
  },
  button: {
    width: '48%',
    backgroundColor: '#4a5f85',
    paddingVertical: width * 0.035,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    width: '95%',
    backgroundColor: 'rgba(0, 0, 0, 0.075)',
    marginTop: width * 0.06,
    borderRadius: 10,
    overflow: 'hidden',
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
  cell: {
    fontSize: 16,
    width: 180,
    alignItems: 'center',
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
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
  activityIndicator: {
    position: 'absolute',
    alignSelf: 'center',
    top: '60%', // Center vertically
    zIndex: 999,
  },
});

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(userActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmAppointment);
