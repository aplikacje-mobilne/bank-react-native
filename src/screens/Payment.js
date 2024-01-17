import React from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Payment = ({navigation}) => {
  
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContent}>
            
             <Icon name="check-circle" solid size={35} />
            
            <Text style={styles.sectionText}>Wybierz Typ Przelewu</Text>
          </View>
          </View>
          <View style={styles.sectionContainer}>
              <View style={styles.sectionContent}>
              <Icon name="landmark" size={35}/>
                  <TouchableOpacity onPress={() => navigation.navigate('Payment1')}>
                  <Text style={styles.sectionText}>Przelew Krajowy</Text>
                  </TouchableOpacity>
              </View>
              <Text style={styles.sectionDescription}>
                W tym wypadku środki są transferowane pomiędzy rachunkami w tym samym banku.
              </Text>
              <Text style={styles.sectionDescription}>
                Zewnętrzny przelew krajowy jest operacją, która polega na przesłaniu pieniędzy między kontami w różnych bankach. O tym, kiedy to nastąpi, decyduje godzina zaksięgowania wysyłki
              </Text>

          </View>
          <View style={styles.sectionContainer}>
            <View style={styles.sectionContent}>

            <Icon name="mobile" light size={35}/>

                <TouchableOpacity onPress={() => navigation.navigate('Payment2')}>
                <Text style={styles.sectionText}>Przelew Na Telefon</Text>
                 </TouchableOpacity>
            </View>
            <Text style={styles.sectionDescription}>
              W tym wypadku nie musimy wpisywać adresu odbiorcy, wystarczą najważniejsze dane: numer telefonu, tytuł oraz przesyłana kwota.
            </Text>
          </View>
        
      </View>
      
    </View>
  );
};


export default Payment;
