import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('screen');

const AlertMessage = ({message, type, visible, onClose}) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animation = Animated.timing(scaleValue, {
      toValue: visible ? 1 : 0,
      duration: visible ? 300 : 0,
      easing: Easing.ease,
      useNativeDriver: true,
    });

    animation.start();

    return () => animation.stop();
  }, [visible, scaleValue]);

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modalView,
            {
              transform: [{scale: scaleValue}],
            },
          ]}>
          <LinearGradient
            colors={
              type === 'error' ? ['#ff7e7e', '#ff4d4d'] : ['#7efc7e', '#4caf50']
            }
            style={styles.gradientBackground}>
            <Icon
              name={type === 'error' ? 'exclamation-circle' : 'check-circle'}
              size={60}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.messageText}>{message}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AlertMessage;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width * 0.8,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 10,
  },
  gradientBackground: {
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: '600',
    color: '#fff',
  },
  closeButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: '80%',
    alignItems: 'center',
    elevation: 2,
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },
});
