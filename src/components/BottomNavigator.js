import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Icon} from 'react-native-elements';
import {Image} from 'react-native';

const {width} = Dimensions.get('window');

const BottomNavigator = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('DashboardPak')}>
        <Icon name="home" type="feather" size={30} color="#ccc" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Image
          source={require('../assets/icons/event_note_24dp.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Image
          source={require('../assets/icons/done_outline_24dp.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab}>
        <Image
          source={require('../assets/icons/chat_bubble_outline_24dp.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate('ProfilePak')}>
        <Icon name="user" type="feather" size={30} color="#ccc" />
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
    paddingVertical: width * 0.020,
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
});
