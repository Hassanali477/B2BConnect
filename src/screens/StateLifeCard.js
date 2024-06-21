import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('screen');

const StateLifeCard = ({heading, images, isSelected, onPress}) => {
  const isEpay = heading === 'E-Pay';

  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={
          isSelected
            ? ['#0158BE', '#0372D3', '#079AF4']
            : ['#ffffff', '#ffffff']
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.card, isSelected && styles.selectedCard]}>
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text
              style={[
                styles.cardHeading,
                isSelected && styles.selectedCardHeading,
              ]}>
              {heading}
            </Text>
            <View style={[styles.icon, isEpay && styles.epayIcon]}>
              <Image source={image} style={styles.cardImage} />
            </View>
          </View>
        ))}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.9,
    padding: 15,
    marginVertical: width * 0.025,
    borderRadius: 15,
    shadowColor: '#000',
    borderWidth: 0.5,
    borderColor: '#0372D3',
    alignItems: 'center',
    marginTop: 10,
  },
  selectedCard: {
    backgroundColor: '#0372D3',
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    width: width * 0.6,
  },
  selectedCardHeading: {
    color: '#fff',
  },
  icon: {
    backgroundColor: '#0158BE',
    padding: 10,
    borderRadius: 10,
  },
  epayIcon: {
    backgroundColor: '#fff',
  },
  cardImage: {
    height: 40,
    width: 50,
    resizeMode: 'contain',
  },
});

export default StateLifeCard;
