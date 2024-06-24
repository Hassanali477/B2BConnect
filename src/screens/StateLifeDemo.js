import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  Animated,
  Easing,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const StateLifeDemo = () => {
  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 6 && currentHour < 12) {
      setTimeOfDay('morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setTimeOfDay('afternoon');
    } else if (currentHour >= 17 && currentHour < 20) {
      setTimeOfDay('evening');
    } else {
      setTimeOfDay('night');
    }
  }, []);

  const getTimeOfDayText = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'Good Morning!';
      case 'afternoon':
        return 'Good Afternoon!';
      case 'evening':
        return 'Good Evening!';
      case 'night':
        return 'Welcome!';
      default:
        return '';
    }
  };

  const scaleAnim = new Animated.Value(1);

  useEffect(() => {
    const bounceAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    bounceAnimation();

    return () => {
      scaleAnim.setValue(1);
    };
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/State-Life-Background.jpeg')}
        resizeMode="cover"
        style={{width: width, height: height * 0.5}}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/appLogo.png')}
            style={styles.logo}
          />
        </View>
      </ImageBackground>

      <Animated.View
        style={[styles.headingContainer, {transform: [{scale: scaleAnim}]}]}>
        <Text style={styles.heading}>{getTimeOfDayText()}</Text>
      </Animated.View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => {}}>
          <LinearGradient
            colors={['#0158BE', '#0372D3', '#00C1F9']}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.cardGradient}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>𝗣𝗼𝗹𝗶𝗰𝘆𝗵𝗼𝗹𝗱𝗲𝗿 𝗟𝗼𝗴𝗶𝗻</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => {}}>
          <LinearGradient
            colors={['#0158BE', '#0372D3', '#00C1F9']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.cardGradient}>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>𝗦𝗮𝗹𝗲𝘀 𝗙𝗼𝗿𝗰𝗲 𝗔𝗴𝗲𝗻𝘁 𝗟𝗼𝗴𝗶𝗻</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <LinearGradient
          colors={['#0158BE', '#0372D3', '#079AF4']}
          style={styles.cardOutline}>
          <TouchableOpacity
            style={styles.cardOutlineContent}
            onPress={() => {}}>
            <Text style={styles.gradientText}>𝗖𝗿𝗲𝗮𝘁𝗲 𝗮 𝗟𝗼𝗴𝗶𝗻 𝗔𝗰𝗰𝗼𝘂𝗻𝘁</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.footerText}>
            𝖤𝗑𝗉𝗅𝗈𝗋𝖾 𝖮𝗎𝗋 𝖣𝗂𝗀𝗂𝗍𝖺𝗅 𝖨𝗇𝗌𝗎𝗋𝖺𝗇𝖼𝖾 𝖲𝗈𝗅𝗎𝗍𝗂𝗈𝗇𝗌!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: -10,
    left: 10,
    right: 0,
    bottom: 0,
    width: width * 0.45,
    height: height * 0.15,
    resizeMode: 'contain',
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  heading: {
    fontSize: 34,
    color: '#000',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 1.5,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.75,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  cardGradient: {
    width: '100%',
    borderRadius: 15,
  },
  cardOutline: {
    width: width * 0.75,
    borderRadius: 10,
    marginVertical: 10,
    padding: 2,
  },
  cardOutlineContent: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    fontSize: 17,
    textAlign: 'center',
    color: 'white',
    letterSpacing: 0.5,
  },
  gradientText: {
    fontSize: 17,
    textAlign: 'center',
    background: 'linear-gradient(#0158BE, #0372D3, #079AF4)',
    WebkitBackgroundClip: 'text',
    color: '#0158BE',
    letterSpacing: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontWeight: '500',
    textDecorationLine:'underline'
  },
});

export default StateLifeDemo;
