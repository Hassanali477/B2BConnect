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
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../components/HeaderComponent';
import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import AlertMessage from '../../components/AlertMessage';
import {KeyboardAvoidingView} from 'react-native';
import CustomDrawerKSA from '../../components/KSADelegates/CustomDrawerKSA';
import BottomNavigatorKSA from '../../components/KSADelegates/BottomNavigatorKSA';
import {connect, useSelector} from 'react-redux';
import * as userActions from '../../redux/actions/user';
import {bindActionCreators} from 'redux';
import axios from 'axios';
import Api_Base_Url from '../../api';

const {width, height} = Dimensions.get('screen');

const ConfirmAppointmentKsa = () => {
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

      const fileExists = await RNFS.exists(`${pdfDir}/${pdfFileName}`);
      let newPdfFileName = pdfFileName;

      if (fileExists) {
        let count = 1;
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

      const appointmentsText = appointments
        .map(
          item =>
            `${item.date}, ${item.time}, ${item.exporter.contact_name}, ${item.exporter.company_name}, ${item.exporter.industry}, ${item.exporter.phone}, ${item.exporter.email}, ${item.exporter.country}`,
        )
        .join('\n');

      await RNFS.writeFile(pdfPath, appointmentsText, 'utf8');

      setLoading(false);
      showAlertMessage('Success', 'PDF file downloaded successfully.');

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
                  <Text style={styles.cell}>
                    {item?.exporter?.contact_name}
                  </Text>
                  <Text style={styles.cell}>
                    {item?.exporter?.company_name}
                  </Text>
                  <Text style={styles.cell}>{item?.exporter?.industry}</Text>
                  <Text style={styles.cell}>{item?.exporter?.phone}</Text>
                  <Text style={styles.cell}>{item?.exporter?.email}</Text>
                  <Text style={styles.cell}>{item?.exporter?.country}</Text>
                </View>
              ))}
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
      <CustomDrawerKSA
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
      />
      <BottomNavigatorKSA />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmAppointmentKsa);
