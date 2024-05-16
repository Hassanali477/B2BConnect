import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'black'}}>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: height,
    width: width,
  },
});
