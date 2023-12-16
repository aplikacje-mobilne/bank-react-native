import React from 'react';
import { View, Text, StyleSheet,Image,TouchableOpacity,TextInput } from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Payment2 = () => {
  
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  return (
    <View style={styles.header}>
        <View style={styles.sectionContainerp1}>
            <View style={styles.sectionContent}>
            <Icon name="mobile" light size={35}/>
                <Text style={styles.sectionText}>Przelew Na Telefon</Text>
            </View>
        </View>
        <View style={styles.sectionContainer}>
       
        
        <TextInput
        style={styles.input}
        placeholder="Numer Telefonu Odbiorcy:"
        value={input1}
        onChangeText={(text) => setInput1(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tytuł:"
        value={input2}
        onChangeText={(text) => setInput2(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Opis:"
        value={input3}
        onChangeText={(text) => setInput3(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Kwota:"
        value={input4}
        onChangeText={(text) => setInput4(text)}
      />
      <TouchableOpacity style={styles.check}>
        <Text style={styles.pp}>Check</Text>
      </TouchableOpacity>
        </View>
    </View>
  );
};


export default Payment2;
