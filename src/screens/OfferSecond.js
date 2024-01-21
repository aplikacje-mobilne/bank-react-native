import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const OfferFirst = () => {
  return (
    <View style={styles.container}>
      <View style={styles.rectangle}>
        <Image
          source={require('./2.png')}
          style={{ width: 120, height: 120, position: 'absolute', top: 10, right: 10 }}
        />
        <Text style={[styles.headerText, { marginRight: 140 }]}>
          You have a chance to earn up to 200 PLN!
        </Text>
        <Text style={[styles.headerText2, { marginRight: 130 }]}>
          By creating a standing order for your investments, you can receive bonuses up to 200 PLN.
        </Text>
        <Text style={[styles.headerText2, { marginRight: 50 }]}>
          The larger your standing order, the higher bonus you can receive.
        </Text>
        <Text style={[styles.headerText3]}>
          Up to 200 PLN!
        </Text>
        <Text style={styles.text}>Bonuses will be added to your account based on the selected amount of the standing order.</Text>
        <Text style={styles.text}>The promotion is available for a limited time, so don't miss the opportunity to maximize your rewards.</Text>
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
    marginTop: 35,
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
