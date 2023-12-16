import React from 'react';
import { View, Text,TextInput,TouchableOpacity} from 'react-native';
import { styles } from './styles';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
const Payment1 = ({navigation}) => {
  
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  return (
      <View style={styles.header}>
          <View style={styles.sectionContainerp1}>
              <View style={styles.sectionContent}>
              <Icon name="landmark" size={35}/>
                  <Text style={styles.sectionText}>Przelew Krajowy</Text>
              </View>
          </View>
          <View style={styles.sectionContainer}>
         
          
          <TextInput
          style={styles.input}
          placeholder="Imię i nazwisko odbiorcy:"
          value={input1}
          onChangeText={(text) => setInput1(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Numer rachunku:"
          value={input2}
          onChangeText={(text) => setInput2(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tytuł:"
          value={input3}
          onChangeText={(text) => setInput3(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Opis:"
          value={input4}
          onChangeText={(text) => setInput4(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Kwota"
          value={input5}
          onChangeText={(text) => setInput5(text)}
        />
        <TouchableOpacity style={styles.check}>
          <Text style={styles.pp}>Check</Text>
        </TouchableOpacity>
          </View>
      </View>
    );
};


export default Payment1;
