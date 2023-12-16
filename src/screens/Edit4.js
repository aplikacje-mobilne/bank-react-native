import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Edit4 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack(null)}>
      <Text>edit4</Text>
        <Icon name="arrow-left" size={30} color="black" />
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
    marginLeft: 10, // Dodaj margines, aby oddzieliæ ikonê od tekstu
  },
});

export default Edit4;
