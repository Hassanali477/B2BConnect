import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('screen');

const CustomDrawer = ({visible, onClose}) => {
  const navigation = useNavigation();
  const navigateToScreen = screenName => {
    AsyncStorage.clear();
    navigation.navigate(screenName);
    onClose();
  };

  return (
    <>
      {visible ? (
        <View style={styles.overlay}>
          <View style={styles.drawer}>
            <View style={styles.headingContainer}>
              <Text style={styles.drawerTitle}>B2B CONNECT</Text>
            </View>
            <View style={styles.mainContainer}>
              <TouchableOpacity
                onPress={() => navigateToScreen('DashboardPak')}>
                <View style={styles.drawerItem}>
                  <Image
                    source={require('../assets/icons/groups_24dp.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.drawerItemText}>KSA DELEGATES</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToScreen('MeetingRequestScreen')}>
                <View style={styles.drawerItem}>
                  <Image
                    source={require('../assets/icons/event_note_24dp.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.drawerItemText}>Meeting Request</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToScreen('ConfirmAppointment')}>
                <View style={styles.drawerItem}>
                  <Image
                    source={require('../assets/icons/done_outline_24dp.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.drawerItemText}>
                    Confirmed Appointments
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToScreen('FeedbackScreen')}>
                <View style={styles.drawerItem}>
                  <Image
                    source={require('../assets/icons/chat_bubble_outline_24dp.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.drawerItemText}>Feedback</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToScreen('ResetPassword')}>
                <View style={styles.drawerItem}>
                  <Icon name="key" type="font-awesome" size={26} color="#fff" />
                  <Text style={styles.drawerItemText}>Change Password</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToScreen('ProfilePak')}>
                <View style={styles.drawerItem}>
                  <Image
                    source={require('../assets/icons/person_24dp.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.drawerItemText}>Profile</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={() => navigateToScreen('LoginPak')}>
                <View style={styles.drawerItem1}>
                  <Icon name="log-out" type="entypo" size={24} color="#fff" />
                  <Text style={styles.logoutText}>Logout</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Pressable style={styles.blankSpace} onPress={onClose}></Pressable>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 999,
  },
  blankSpace: {
    width: width * 0.3,
    height: '100%',
  },
  drawer: {
    width: width * 0.7,
    height: '100%',
    backgroundColor: '#3c4b64',
  },
  headingContainer: {
    backgroundColor: '#2f3c54',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  drawerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    backgroundColor: '#2f3c54',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },

  drawerItemText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 5,
    padding: 10,
  },

  mainContainer: {
    width: '100%',
    height: '76%',
    backgroundColor: '#3c4b64',
    padding: 10,
  },
  footerContainer: {
    width: '100%',
    height: '24%',
    backgroundColor: '#2f3c54',
    padding: 10,
  },
  drawerItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    padding: 10,
  },
});

export default CustomDrawer;
