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
        Masz szansę zarobić aż do 200 zł!
        </Text>
        <Text style={[styles.headerText2, { marginRight: 130 }]}>
        Zakładając zlecenie stałe na swoje inwestycje, możesz otrzymać premie w wysokości do 200 zł
        </Text>
        <Text style={[styles.headerText2, { marginRight: 50 }]}>
        Im większe jest Twoje zlecenie stałe, tym wyższy bonus możesz otrzymać.
        </Text>
        <Text style={[styles.headerText3]}>
        Nawet do 200 zł!
        </Text>
        <Text style={styles.text}>Bonusy zostaną dodane do Twojego konta zgodnie z wybraną kwotą zlecenia stałego.</Text>
        <Text style={styles.text}>Promocja jest dostępna przez ograniczony czas, więc nie przegap okazji, aby zmaksymalizować swoje nagrody.</Text>
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
