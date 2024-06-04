import {useNavigation, useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Button} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const AppStarterScreen = () => {
  const navigation = useNavigation();

  const handleNavigateToLoginPak = () => {
    navigation.navigate('LoginPak');
  };

  const handleNavigateToLoginKSA = () => {
    navigation.navigate('LoginKSA');
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigation]),
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/SplashScreen.png')}
          style={styles.imageHeader}
        />
        <Text style={styles.headerText}>INVESTMENT CONFERENCE 2024</Text>
        <Text style={styles.headerText1}>
          مؤتمر الاستثمار الباكستاني السعودي 2024
        </Text>
      </View>
      {/* Main Component */}
      <View style={styles.mainContainer}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={handleNavigateToLoginKSA}>
            <View
              style={{
                width: width * 0.3,
                height: '80%',
                overflow: 'hidden',
              }}>
              <Image
                source={require('../assets/images/sa.png')}
                style={styles.imageFlag}
              />
            </View>
            <Text style={styles.optionText1}>KSA DELEGATE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.optionContainer}
            onPress={handleNavigateToLoginPak}>
            <View
              style={{
                width: width * 0.3,
                height: '80%',
                overflow: 'hidden',
              }}>
              <Image
                source={require('../assets/images/pak.png')}
                style={styles.imageFlag}
              />
            </View>
            <Text style={styles.optionText}>PAK EXHIBITOR</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Image
          source={require('../assets/images/A2Z.png')}
          style={styles.A2zLogo}
        />
        <Text style={styles.footerText}>
          B2B Connect Powered by A2Z Creatorz
        </Text>
      </View>
    </View>
  );
};

export default AppStarterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    width: width * 0.9,
    alignItems: 'center',
    marginTop: 40,
  },
  imageHeader: {
    height: 100,
    width: '70%',
    resizeMode: 'contain',
  },
  headerText: {
    color: '#ef8a38',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  headerText1: {
    color: '#126a30',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainContainer: {
    flex: 1,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 10,
    width: width * 0.4,
    height: height * 0.26,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  optionContainer: {
    alignItems: 'center',
  },
  imageFlag: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  optionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionText1: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    width: width * 0.9,
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 10,
  },
  A2zLogo: {
    width: '60%',
    height: undefined,
    aspectRatio: 3 / 1,
    resizeMode: 'contain',
  },
  footerText: {
    color: '#3C4B64',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    textTransform: 'uppercase',
  },
});
