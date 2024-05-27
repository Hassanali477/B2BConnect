import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from 'react-native';
import {Icon} from 'react-native-elements'; // Assuming you're using react-native-elements

const {width, height} = Dimensions.get('screen');

const CustomDrawer = ({visible, onClose, navigation}) => {
  const navigateToScreen = screenName => {
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
                onPress={() => navigateToScreen('ProfilePak')}>
                <View style={styles.drawerItem}>
                  <Icon
                    name="user"
                    type="font-awesome"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.drawerItemText}>Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToScreen('KsaDelegate')}>
                <View style={styles.drawerItem}>
                  <Icon
                    name="users"
                    type="font-awesome"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.drawerItemText}>KSA DELEGATE</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToScreen('MeetingRequest')}>
                <View style={styles.drawerItem}>
                  <Icon
                    name="calendar-plus"
                    type="material-community"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.drawerItemText}>Meeting Request</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigateToScreen('ConfirmedAppointments')}>
                <View style={styles.drawerItem}>
                  <Icon
                    name="check"
                    type="font-awesome"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.drawerItemText}>
                    Confirmed Appointments
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigateToScreen('Feedback')}>
                <View style={styles.drawerItem}>
                  <Icon
                    name="feedback"
                    type="material"
                    size={24}
                    color="#fff"
                  />
                  <Text style={styles.drawerItemText}>Feedback</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.footerContainer}>
              <TouchableOpacity onPress={() => navigateToScreen('Logout')}>
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
    zIndex:999
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

  drawerItemText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 5,
    padding: 10,
  },

  mainContainer: {
    width: '100%',
    height: '75%',
    backgroundColor: '#3c4b64',
    padding: 10,
  },
  footerContainer: {
    width: '100%',
    height: '25%',
    backgroundColor: '#2f3c54',
    padding: 10,
  },
  drawerItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  logoutText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    padding: 10,
  },
});

export default CustomDrawer;
