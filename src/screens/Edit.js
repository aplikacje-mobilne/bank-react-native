import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Edit = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
        <Icon name="arrow-left" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Edit2')}>
        <Text style={styles.text}>Przejdź do Edit2</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10, // Dodaj margines, aby oddzielić ikonę od tekstu
  },
});

export default Edit;
