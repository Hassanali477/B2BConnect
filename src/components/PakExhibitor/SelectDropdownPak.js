import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';

const {width, height} = Dimensions.get('screen');
const SelectDropdown = ({title, options, selectedValue, onSelect}) => {
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
          <ScrollView>
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

export default SelectDropdown;

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
    top: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderTopWidth: 0,
    borderRadius: 5,
    zIndex: 1000,
    height: height * 0.15,
  },
  option: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  optionText: {
    color: 'black',
  },
});
