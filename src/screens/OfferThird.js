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
        4,5% już od 10 000 zł!
        </Text>
        <Text style={[styles.headerText2, { marginRight: 140 }]}>
        Dzięki tej specjalnej promocji możesz zyskać konkurencyjne odsetki od swojego depozytu w wysokości 4,5%
        </Text>
        <Text style={[styles.headerText2, { marginRight: 20 }]}>
        Aby wziąć udział wystarczy zacząć od minimalnego depozytu w wysokości 10 000 zł
        </Text>

        <Text style={styles.text}>Opcje regularnego inwestowania są elastyczne i można je dostosować do Twoich preferencji i tolerancji ryzyka.</Text>
        <Text style={styles.text}>Promocja ma na celu pomóc Ci osiągnąć Twoje cele finansowe przy jednoczesnej maksymalizacji zysków.</Text>
        <Text style={[styles.headerText3, { marginRight: 20 }]}>
        Śpiesz się, ofreta ograniczona!
        </Text>
        <Text style={[styles.headerText4]}>
       
        O więcej szczegółów zapytaj w punkcie banku
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
