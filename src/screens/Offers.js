import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Offers = ({ navigation }) => {
  return (
    
    <View style={styles.container}>
      
   
      

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>Savings account - promotion</Text>
        <Text style={styles.text}>✔ You can earn up to 8% annually for 90 days</Text>
        <Text style={styles.text}>✔ New funds up to PLN 500,000</Text>
        <TouchableOpacity
          style={styles.orangeButton}
          onPress={() => navigation.navigate('OfferFirst')}
        >
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>Investment goal in the promotion</Text>
          <Text style={styles.text}>✔ You have a chance to gain up to PLN 200</Text>
          <Text style={styles.text}>✔ The amount of the bonus depends on the standing order</Text>
          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => navigation.navigate('OfferSecond')}
          >
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>You can gain 4.5% on your deposit</Text>
            <Text style={styles.text}>✔ 12-month deposit</Text>
            <Text style={styles.text}>✔ From PLN 10,000
</Text>
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
