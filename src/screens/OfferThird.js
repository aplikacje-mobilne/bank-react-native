import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const OfferFirst = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Image
          source={require('./3.png')}
          style={{ width: 120, height: 120, position: 'absolute', top: 10, right: 10 }}
        />
        <Text style={[styles.headerText, { marginRight: 140 }]}>
          4.5% from just 10,000 PLN!
        </Text>
        <Text style={[styles.headerText2, { marginRight: 140 }]}>
          With this special promotion, you can earn competitive interest on your deposit at a rate of 4.5%.
        </Text>
        <Text style={[styles.headerText2, { marginRight: 20 }]}>
          To participate, all you need to do is start with a minimum deposit of 10,000 PLN.
        </Text>

        <Text style={styles.text}>Regular investment options are flexible and can be tailored to your preferences and risk tolerance.</Text>
        <Text style={styles.text}>The promotion aims to help you achieve your financial goals while maximizing profits.</Text>
        <Text style={[styles.headerText3, { marginRight: 20 }]}>
          Hurry, the offer is limited!
        </Text>
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
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 15,
    marginRight: 10,
    textAlign: 'left',
  },
  headerText3: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  headerText4: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
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
