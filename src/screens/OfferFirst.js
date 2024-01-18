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
          Oszczędzaj nawet na 8% na rachunku oszczędnościowym!
        </Text>
        <Text style={[styles.headerText2, { marginRight: 50 }]}>
          Nie przegap okazji na powiększenie swoich oszczędności dzięki naszej promocji Konta Oszczędnościowego. Zacznij oszczędzać z nami już dziś!
        </Text>
        <Text style={[styles.headerText2, { marginRight: 50 }]}>
        Oprocentowanie jest gwarantowane przez cały okres: 
        </Text>
        <Text style={[styles.headerText3, { marginRight: 50 }]}>
        90 dni!
        </Text>
        <Text style={styles.text}>Twoje środki pozostają dostępne, zapewniając elastyczność, gdy ich potrzebujesz.</Text>
        <Text style={styles.text}>Promocja dostępna jest przez ograniczony czas, dlatego warto działać szybko, aby skorzystać z tej oferty.</Text>
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
