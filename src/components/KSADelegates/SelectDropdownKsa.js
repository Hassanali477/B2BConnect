import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';

const SelectDropdownKsa = ({title, options, selectedValue, onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={handleToggle} style={styles.dropdownHeader}>
        <Text style={styles.dropdownHeaderText}>{selectedValue || title}</Text>
        <Icon
          name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}
          type="material"
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          <ScrollView style={styles.scrollView}>
            {options.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default SelectDropdownKsa;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginVertical: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownHeaderText: {
    color: 'black',
  },
  optionsContainer: {
    position: 'absolute',
    top: 50, // Adjust this value based on the height of the dropdown header
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 5,
    zIndex: 1000, // Ensure the dropdown is above other elements
    maxHeight: 150, // Fixed height for the dropdown
  },
  scrollView: {
    width: '100%',
  },
  option: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    color: 'black',
  },
});
