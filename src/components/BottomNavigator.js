import React, {useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {Image} from 'react-native';

const {width} = Dimensions.get('window');

const BottomNavigator = (style) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [selectedTab, setSelectedTab] = React.useState('DashboardPak');

  useEffect(() => {
    const currentRoute =
      navigation.getState().routes[navigation.getState().index].name;
    setSelectedTab(currentRoute);
  }, [isFocused, navigation]);

  const navigateToScreen = screenName => {
    setSelectedTab(screenName);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'DashboardPak' && styles.selectedTab,
        ]}
        onPress={() => navigateToScreen('DashboardPak')}>
        <Icon
          name="home"
          type="feather"
          size={30}
          color={selectedTab === 'DashboardPak' ? '#fff' : '#ccc'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'MeetingRequestScreen' && styles.selectedTab,
        ]}
        onPress={() => navigateToScreen('MeetingRequestScreen')}>
        <Image
          source={require('../assets/icons/event_note_24dp.png')}
          style={[
            styles.icon,
            selectedTab === 'MeetingRequestScreen'
              ? styles.selectedIcon
              : styles.iconDefault,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'ConfirmAppointment' && styles.selectedTab,
        ]}
        onPress={() => navigateToScreen('ConfirmAppointment')}>
        <Image
          source={require('../assets/icons/done_outline_24dp.png')}
          style={[
            styles.icon,
            selectedTab === 'ConfirmAppointment'
              ? styles.selectedIcon
              : styles.iconDefault,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'FeedbackScreen' && styles.selectedTab,
        ]}
        onPress={() => navigateToScreen('FeedbackScreen')}>
        <Image
          source={require('../assets/icons/chat_bubble_outline_24dp.png')}
          style={[
            styles.icon,
            selectedTab === 'FeedbackScreen'
              ? styles.selectedIcon
              : styles.iconDefault,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'ProfilePak' && styles.selectedTab]}
        onPress={() => navigateToScreen('ProfilePak')}>
        <Icon
          name="user"
          type="feather"
          size={30}
          color={selectedTab === 'ProfilePak' ? '#fff' : '#ccc'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#2f3c54',
    paddingVertical: width * 0.015,
  },
  tab: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  selectedTab: {
    backgroundColor: '#4a5f85',
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconDefault: {
    tintColor: '#ccc',
  },
  selectedIcon: {
    tintColor: '#fff',
  },
});
