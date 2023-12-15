// components/Header.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="ios-arrow-back" size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
