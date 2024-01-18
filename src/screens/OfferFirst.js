import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const OfferFirst = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Image
          source={require('./1.png')}
          style={{ width: 120, height: 120, position: 'absolute', top: 10, right: 10 }}
        />
        <Text style={[styles.headerText, { marginRight: 140 }]}>
          Save up to 8% on your savings account!
        </Text>
        <Text style={[styles.headerText2, { marginRight: 70 }]}>
          Don't miss the opportunity to grow your savings with our Savings Account promotion. Start saving with us today!
        </Text>
        <Text style={[styles.headerText2, { marginRight: 50 }]}>
          The interest rate is guaranteed for the entire period:
        </Text>
        <Text style={[styles.headerText3, { marginRight: 50 }]}>
          90 days!
        </Text>
        <Text style={styles.text}>Your funds remain accessible, providing flexibility when you need them.</Text>
        <Text style={styles.text}>The promotion is available for a limited time, so act quickly to take advantage of this offer.</Text>
        <Text style={[styles.headerText4]}>
          For more details, inquire at the bank branch.
        </Text>
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
  text: {
    fontSize: 15,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 10,
    textAlign: 'left',
  },
  headerText2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 10,
    textAlign: 'left',
  },
  headerText3: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 10,
    textAlign: 'center',
  },
  headerText4: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 10,
    textAlign: 'center',
  },
  rectangle: {
    backgroundColor: 'white',
    width: 350,
    height: 580,
    borderRadius: 8,
    marginVertical: 20,
  },
});

export default OfferFirst;
