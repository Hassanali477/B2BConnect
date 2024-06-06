import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

const {width} = Dimensions.get('window');

const BottomNavigatorKSA = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [selectedTab, setSelectedTab] = React.useState('DashboardKSA');

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
          selectedTab === 'DashboardKsa' && styles.selectedTab,
        ]}
        onPress={() => navigateToScreen('DashboardKsa')}>
        <Icon
          name="home"
          type="feather"
          size={30}
          color={selectedTab === 'DashboardKsa' ? '#fff' : '#ccc'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'MeetingRequestScreenKsa' && styles.selectedTab,
        ]}
        onPress={() => navigateToScreen('MeetingRequestScreenKsa')}>
        <Image
          source={require('../../assets/icons/event_note_24dp.png')}
          style={[
            styles.icon,
            selectedTab === 'MeetingRequestScreenKsa'
              ? styles.selectedIcon
              : styles.iconDefault,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'ConfirmAppointmentKsa' && styles.selectedTab,
        ]}
        onPress={() => navigateToScreen('ConfirmAppointmentKsa')}>
        <Image
          source={require('../../assets/icons/done_outline_24dp.png')}
          style={[
            styles.icon,
            selectedTab === 'ConfirmAppointmentKsa'
              ? styles.selectedIcon
              : styles.iconDefault,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tab,
          selectedTab === 'FeedbackKsa' && styles.selectedTab,
        ]}
        onPress={() => navigateToScreen('FeedbackKsa')}>
        <Image
          source={require('../../assets/icons/chat_bubble_outline_24dp.png')}
          style={[
            styles.icon,
            selectedTab === 'FeedbackKsa'
              ? styles.selectedIcon
              : styles.iconDefault,
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, selectedTab === 'ProfileKsa' && styles.selectedTab]}
        onPress={() => navigateToScreen('ProfileKsa')}>
        <Icon
          name="user"
          type="feather"
          size={30}
          color={selectedTab === 'ProfileKsa' ? '#fff' : '#ccc'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigatorKSA;

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
