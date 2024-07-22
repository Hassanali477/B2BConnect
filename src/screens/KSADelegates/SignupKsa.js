import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';
import CountryPicker from 'react-native-country-picker-modal';
import AlertMessage from '../../components/AlertMessage';

const {width, height} = Dimensions.get('screen');
const SignupKSA = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [servicesOffered, setServicesOffered] = useState('');
  const [economy, setEconomy] = useState('');
  const [website, setWebsite] = useState('');
  const [password, setPassword] = useState('');
  const [pashaMember, setPashaMember] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false); // State for controlling alert visibility
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('error'); // 'error' or 'success'

  const categories = [
    'Doctor',
    'Engineer',
    'Teacher',
    'Artist',
    'Lawyer',
    'Scientist',
    'Entrepreneur',
    'Farmer',
    'Pilot',
    'Designer',
    'Chef',
    'Journalist',
    'Police Officer',
    'Firefighter',
    'Athlete',
    'Musician',
    'Actor',
    'Writer',
    'Politician',
    'Accountant',
    'Architect',
    'Consultant',
    'Tradesman',
    'Technician',
    'Student',
    'Researcher',
  ];

  const economies = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic (Czechia)',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine State',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Timor-Leste',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  const handleSignUp = () => {
    // Basic Validation
    if (
      !fullName ||
      !companyName ||
      !category ||
      !country ||
      !phone ||
      !email ||
      !aboutUs ||
      !servicesOffered ||
      !economy ||
      !website ||
      !password
    ) {
      setAlertType('error');
      setAlertMessage('Please fill in all fields.');
      setAlertVisible(true);
      return;
    }

    // Implement your sign-up logic here
    console.log('Signing up...');
    console.log('Full Name:', fullName);
    console.log('Company Name:', companyName);
    console.log('Category:', category);
    console.log('Country:', country);
    console.log('Phone:', phone);
    console.log('Email:', email);
    console.log('About Us:', aboutUs);
    console.log('Services Offered:', servicesOffered);
    console.log('Economy:', economy);
    console.log('Website:', website);
    console.log('Password:', password);
    console.log('P@SHA Member:', pashaMember);

    // Show success message
    setAlertType('success');
    setAlertMessage('Sign up successful!');
    setAlertVisible(true);
  };

  const onCloseAlert = () => {
    setAlertVisible(false);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconCont}>
          <View style={styles.IconArrowCont}>
            <Icon
              name="keyboard-backspace"
              type="material-community"
              color="#4a5f85"
              size={30}
              onPress={() => navigation.navigate('LoginKSA')}
            />
          </View>
          <Image
            source={require('../../assets/images/SplashScreen.png')}
            style={styles.logoTop}
          />
        </View>
        <Text style={styles.headerText}>Create an Account</Text>
        <Text style={styles.headerText2}>
          Fill in the details below to create your account
        </Text>
      </View>
      <View style={styles.mainContainer}>
        <Text style={styles.textInputHeading}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputHalf}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholderTextColor="#000"
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Company Name"
            value={companyName}
            onChangeText={setCompanyName}
            placeholderTextColor="#000"
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={economy}
              onValueChange={itemValue => setEconomy(itemValue)}
              dropdownIconColor="#000">
              <Picker.Item label="Select Economy" value="" />
              {economies.map((economy, index) => (
                <Picker.Item key={index} label={economy} value={economy} />
              ))}
            </Picker>
          </View>
          <View style={[styles.pickerContainer, {padding: 8}]}>
            <CountryPicker
              withFilter
              withFlag
              withCountryNameButton
              withAlphaFilter
              withCallingCodeButton
              withCallingCode
              withEmoji
              countryCode={country?.cca2}
              onSelect={value => setCountry(value)}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Phone / WhatsApp"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="About Us"
          multiline
          numberOfLines={4}
          value={aboutUs}
          onChangeText={setAboutUs}
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Services Offered"
          multiline
          numberOfLines={4}
          value={servicesOffered}
          onChangeText={setServicesOffered}
          placeholderTextColor="#000"
        />
        <View style={styles.inputContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              style={styles.picker}
              selectedValue={category}
              onValueChange={itemValue => setCategory(itemValue)}
              dropdownIconColor="#000">
              <Picker.Item label="Select Category" value="" />
              {categories.map((category, index) => (
                <Picker.Item key={index} label={category} value={category} />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.inputHalf}
            placeholder="Website"
            value={website}
            onChangeText={setWebsite}
            placeholderTextColor="#000"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#000"
        />
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setPashaMember(!pashaMember)}>
            <FontAwesome
              name={pashaMember ? 'check-square' : 'square-o'}
              size={20}
              color="#4a5f85"
              style={styles.icon}
            />
            <Text style={styles.checkboxText}>Are you P@SHA Member?</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/A2Z.png')}
          style={styles.logoBottom}
        />
      </View>
      <AlertMessage
        type={alertType}
        message={alertMessage}
        visible={alertVisible}
        onClose={onCloseAlert}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 20,
  },
  header: {
    width: '80%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  headerIconCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  IconArrowCont: {
    borderWidth: 1,
    borderColor: '#4a5f85',
    borderRadius: 10,
    padding: 5,
  },
  logoTop: {
    height: 110,
    width: '45%',
    resizeMode: 'contain',
    marginLeft: '12%',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  headerText2: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
    marginTop: 10,
  },
  mainContainer: {
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  textInputHeading: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginLeft: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  inputHalf: {
    width: '48%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    color: 'black',
  },
  pickerContainer: {
    width: '48%', // Adjusted to match TextInput width
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 0, // Adjust padding as needed
    marginVertical: 5,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 50,
    color: 'black', // Ensure text color is visible
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    color: 'black',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#4a5f85',
  },
  button: {
    backgroundColor: '#4a5f85',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoBottom: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
    height: 50,
    width: width * 0.25,
  },
});

export default SignupKSA;
