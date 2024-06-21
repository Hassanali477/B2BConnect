import React from 'react';
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from 'react-native';
import StateLifeCard from './StateLifeCard'; // Assuming StateLifeCard component is in the same file

const {width, height} = Dimensions.get('screen');

const StateLifeDemo = () => {
  const [selectedCardId, setSelectedCardId] = React.useState(null);

  const cardsData = [
    {
      id: 1,
      heading: 'Complain management system',
      images: [require('../assets/images/board.png')],
    },
    {
      id: 2,
      heading: 'Customer Portal',
      images: [require('../assets/images/hmoo.png')],
    },
    {
      id: 3,
      heading: 'Digital Insurance Portal',
      images: [require('../assets/images/ru.png')],
    },
    {
      id: 4,
      heading: 'Agent Portal',
      images: [require('../assets/images/user.png')],
    },
    {
      id: 5,
      heading: 'E-Pay',
      images: [require('../assets/images/money.png')],
    },
  ];

  const handleCardPress = cardId => {
    setSelectedCardId(cardId === selectedCardId ? null : cardId);
  };

  return (
    <ImageBackground
      source={require('../assets/images/Background_digital.png')}
      style={styles.imageContainer}>
      <View style={styles.headContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/appLogo.png')}
            style={styles.logo}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.cardsContainer}>
        {cardsData.map(card => (
          <StateLifeCard
            key={card.id}
            heading={card.heading}
            images={card.images}
            isSelected={card.id === selectedCardId}
            onPress={() => handleCardPress(card.id)}
            isEpay={styles.Epay}
          />
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: width,
    height: height,
    alignItems: 'center',
  },
  headContainer: {
    width: width * 0.9,
    height: height * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: width * 0.1,
    backgroundColor: 'rgba(173, 216, 230, 0.8)', // Light blue background
    borderRadius: 15,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 110,
    width: width * 0.6,
    resizeMode: 'contain',
  },
  cardsContainer: {
    alignItems: 'center',
    paddingVertical: width * 0.05,
  },
  Epay: {},
});

export default StateLifeDemo;
