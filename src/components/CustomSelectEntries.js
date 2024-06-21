import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('screen');

const CustomSelectEntries = ({
  data,
  selectedValue,
  onSelect,
  delegatesData, // Ensure to pass the delegatesData from the parent
  setFilteredData,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item) => {
    setIsOpen(false);
    onSelect(item); // Pass the selected value to the parent component
    // Filter the delegatesData based on the selected item
    const filteredData = delegatesData.slice(0, parseInt(item));
    var obj = {
      buyers: filteredData,
    };
    setFilteredData(obj); // Pass filtered data back to parent
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.selectedOption, isOpen && styles.open]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.optionText}>{selectedValue}</Text>
        <Icon
          name="keyboard-arrow-down"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          {data.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => handleSelect(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  selectedOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5, // Add some spacing between icon and text
  },
  open: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 10,
    right: 0,
    zIndex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  option: {
    paddingVertical: 5,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  optionText: {
    color: '#000',
  },
});

export default CustomSelectEntries;
