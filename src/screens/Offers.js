import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Offers = ({ navigation }) => {
  return (
    
    <View style={styles.container}>
      
   
      

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>Konto oszczędnościowe - promocja</Text>
        <Text style={styles.text}>✔ Możesz zarobić do 8% rocznie przez 90 dni</Text>
        <Text style={styles.text}>✔ Nowe środki do 500 000 zł</Text>
        <TouchableOpacity
          style={styles.orangeButton}
          onPress={() => navigation.navigate('OfferFirst')}
        >
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>Cel inwestycyjny w promocji</Text>
          <Text style={styles.text}>✔ Masz szansę zyskać nawet do 200 zł</Text>
          <Text style={styles.text}>✔ Wysokość bonusu zależy od zlecenia stałego</Text>
          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => navigation.navigate('OfferSecond')}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>Możesz zyskać 4,5% na lokacie</Text>
            <Text style={styles.text}>✔ Lokata 12-miesięczna</Text>
            <Text style={styles.text}>✔ Od 10 000 zł</Text>
            <TouchableOpacity
              style={styles.orangeButton}
              onPress={() => navigation.navigate('OfferThird')}
            >
              <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'left',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10, 
    marginBottom: 5, 
    marginLeft: 10, 
    textAlign: 'left',

  },
  text: {
    fontSize: 15, 
    marginBottom: 5,
    marginLeft: 10,
  
  },
  rectangle: {
    backgroundColor: 'white',
    width: 350, 
    height: 150, 
    borderRadius: 8,
    marginVertical: 20,
  },
  orangeButton: {
    position: 'absolute', 
    backgroundColor: '#FF570C',
    width: 90, 
    height: 40, 
    borderRadius: 50,
    bottom: 10,
    right: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center', 
  },
});

export default Offers;
