import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');
const HeaderComponent = ({onMenuPress, toggleDrawer}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuIcon} onPress={onMenuPress}>
        <Icon name="menu" size={30} color="#000" />
      </TouchableOpacity>
      <Image
        source={require('../assets/images/SplashScreen.png')}
        style={styles.headerImage}
      />
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  menuIcon: {
    marginRight: width * 0.03,
  },
  headerImage: {
    flex: 1,
    height: height * 0.068,
    resizeMode: 'contain',
  },
});
