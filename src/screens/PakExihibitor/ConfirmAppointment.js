import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
  Dimensions,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import XLSX from 'xlsx';
import BottomNavigator from '../../components/BottomNavigator';
import CustomDrawer from '../../components/CustomDrawer';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import AlertMessage from '../../components/AlertMessage';
import {KeyboardAvoidingView} from 'react-native';

const {width, height} = Dimensions.get('screen');

const ConfirmAppointment = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'B2BConnect needs access to your storage to save files.',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadPDF();
      } else {
        showAlertMessage('Permission Denied', 'Storage permission denied.');
      }
    } catch (error) {
      console.error('Error requesting storage permission:', error);
      showAlertMessage('Error', 'Failed to request storage permission.');
    }
  };

  const downloadPDF = async () => {
    try {
      if (appointments.length === 0) {
        showAlertMessage('Error', 'No appointments to download.');
        return;
      }

      setLoading(true);

      const pdfDir = RNFS.DownloadDirectoryPath;
      const pdfFileName = 'appointments.pdf';

      // Check if the file already exists
      const fileExists = await RNFS.exists(`${pdfDir}/${pdfFileName}`);
      let newPdfFileName = pdfFileName;

      if (fileExists) {
        let count = 1;
        // Generate a new file name with a number suffix
        while (true) {
          const newFileName = `${pdfFileName.split('.pdf')[0]}_${count}.pdf`;
          const exists = await RNFS.exists(`${pdfDir}/${newFileName}`);
          if (!exists) {
            newPdfFileName = newFileName;
            break;
          }
          count++;
        }
      }

      const pdfPath = `${pdfDir}/${newPdfFileName}`;

      // Create PDF content
      const appointmentsText = appointments
        .map(
          item =>
            `${item.date}, ${item.time}, ${item.name}, ${item.company}, ${item.sector}, ${item.phone}, ${item.email}, ${item.city}`,
        )
        .join('\n');

      // Write PDF content to the file
      await RNFS.writeFile(pdfPath, appointmentsText, 'utf8');

      setLoading(false);
      showAlertMessage('Success', 'PDF file downloaded successfully.');

      // Open the downloaded PDF file
      RNFetchBlob.android.actionViewIntent(
        `file://${pdfPath}`,
        'application/pdf',
      );
    } catch (error) {
      setLoading(false);
      showAlertMessage('Error', 'Failed to download PDF file.');
      console.error('PDF download error:', error);
    }
  };

  const generateRandomAppointments = () => {
    const randomAppointments = [];
    for (let i = 0; i < 20; i++) {
      const date = `2025-06-${Math.floor(Math.random() * 30) + 1}`;
      const time = `${Math.floor(Math.random() * 12) + 1}:${Math.floor(
        Math.random() * 60,
      )
        .toString()
        .padStart(2, '0')}${Math.random() < 0.5 ? ' AM' : ' PM'}`;
      const name = `Person ${i + 1}`;
      const company = `Company ${Math.floor(Math.random() * 10) + 1}`;
      const sector = `Sector ${Math.floor(Math.random() * 5) + 1}`;
      const phone = `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      const email = `person${i + 1}@example.com`;
      const city = `City ${Math.floor(Math.random() * 5) + 1}`;
      randomAppointments.push({
        id: i + 1,
        date,
        time,
        name,
        company,
        sector,
        phone,
        email,
        city,
      });
    }
    setAppointments(randomAppointments);
    setFilteredAppointments(randomAppointments);
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
    setTimeout(() => setShowAlert(false), 3000); // Close the alert after 3 seconds
  };
  useEffect(() => {
    generateRandomAppointments();
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
          showsHorizontalScrollIndicator={false}
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
              showsVerticalScrollIndicator={false}>
              {filteredAppointments.map(item => (
                <View key={item.id} style={styles.row}>
                  <Text style={styles.cell}>{item.date}</Text>
                  <Text style={styles.cell}>{item.time}</Text>
                  <Text style={styles.cell}>{item.name}</Text>
                  <Text style={styles.cell}>{item.company}</Text>
                  <Text style={styles.cell}>{item.sector}</Text>
                  <Text style={styles.cell}>{item.phone}</Text>
                  <Text style={styles.cell}>{item.email}</Text>
                  <Text style={styles.cell}>{item.city}</Text>
                </View>
              ))}
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No results found.</Text>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>

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
    // width: width / 1.16,
    // height: height * 0.5,
    // backgroundColor: '#fff',
    // marginTop: width * 0.06,
    // borderWidth: 1,
    // borderRadius: 10,
    // overflow: 'hidden',
    // borderColor: '#ccc',
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
});

export default ConfirmAppointment;
