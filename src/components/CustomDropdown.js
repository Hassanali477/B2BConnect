import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

const CustomDropdown = ({ data, placeholder, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item);
    setVisible(false);
    onSelect(item);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(!visible)}
      >
        <Text style={styles.text}>
          {selected ? selected.label : placeholder}
        </Text>
        <Icon
          name="keyboard-arrow-down"
          size={24}
          color="black"
          style={styles.icon}
        />
      </TouchableOpacity>
      {visible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    width: '45%',
    position: 'relative',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
  },
  icon: {
    marginLeft: 10,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    maxHeight: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 2, // Ensure dropdown list is above other elements
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
