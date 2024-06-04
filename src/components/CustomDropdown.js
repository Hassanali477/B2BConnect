// CustomDropdown.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

const CustomDropdown = ({ data, placeholder, onSelect, style }) => {
  return (
    <View style={[styles.container, style]}>
      <ModalDropdown
        options={data.map(item => item.label)}
        onSelect={(index, value) => onSelect(data[index].value)}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.dropdownContainer}
        dropdownTextStyle={styles.dropdownItemText}
        adjustFrame={(style) => {
          style.width = '80%';
          style.left = '10%';
          return style;
        }}
      >
        <Text style={styles.placeholder}>{placeholder}</Text>
      </ModalDropdown>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    backgroundColor: '#FFF',
    overflow: 'hidden',
  },
  dropdown: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  dropdownText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdownContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dropdownItemText: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#000',
  },
  placeholder: {
    color: '#B0B0B0',
    fontSize: 16,
  },
});

export default CustomDropdown;
