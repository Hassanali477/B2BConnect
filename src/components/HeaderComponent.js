import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HeaderComponent = ({onMenuPress}) => {
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
    marginRight: 20,
  },
  headerImage: {
    flex: 1,
    height: 60,
    resizeMode: 'contain',
  },
});
