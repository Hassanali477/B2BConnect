import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('screen');

const AlertMessage = ({message, type, visible, onClose}) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View
          style={[
            styles.modalView,
            type === 'error'
              ? styles.errorBackground
              : styles.successBackground,
          ]}>
          <Icon
            name={type === 'error' ? 'exclamation-circle' : 'check-circle'}
            size={60}
            color={type === 'error' ? 'red' : 'green'}
          />
          <Text
            style={[
              styles.messageText,
              {color: type === 'error' ? 'red' : 'green'},
            ]}>
            {message}
          </Text>
          <TouchableOpacity
            style={[
              styles.closeButton,
              {backgroundColor: type === 'error' ? 'red' : 'green'},
            ]}
            onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: width / 1.2,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBackground: {
    backgroundColor: '#f0acb2',
  },
  successBackground: {
    backgroundColor: '#8fd09f',
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  closeButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});
