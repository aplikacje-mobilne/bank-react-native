import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OfferSecond = () => {
  return (
    
    <View style={styles.container}>
      
   
      

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>Przedstawiamy naszą promocję Celu Inwestycyjnego! Dzięki tej ofercie specjalnej masz szansę zarobić aż do 200 zł w postaci bonusów, a wysokość bonusu uzależniona jest od ustawionej przez Ciebie kwoty zlecenia stałego.</Text>
        <Text style={styles.text}>1. Zakładając zlecenie stałe na swoje inwestycje, możesz otrzymać premie w wysokości do 200 zł.</Text>
        <Text style={styles.text}>2. Kwota premii wzrasta w zależności od wielkości Twojego zlecenia stałego, nagradzając Twoje zaangażowanie w oszczędzanie i inwestowanie.</Text>
        <Text style={styles.text}>3. Im większe jest Twoje zlecenie stałe, tym wyższy bonus możesz otrzymać.</Text>
        <Text style={styles.text}>4. Bonusy zostaną dodane do Twojego konta zgodnie z wybraną kwotą zlecenia stałego.</Text>
        <Text style={styles.text}>5. Promocja jest dostępna przez ograniczony czas, więc nie przegap okazji, aby zmaksymalizować swoje nagrody.</Text>
        <Text style={styles.text}>6. Możesz wybrać kwotę zlecenia stałego, która najlepiej odpowiada Twoim celom inwestycyjnym.</Text>
        <Text style={styles.text}>7. Premie stanowią dodatek do wszelkich potencjalnych zysków lub zysków z inwestycji.</Text>
        <Text style={styles.text}>8. Nasi doradcy inwestycyjni są do Twojej dyspozycji, aby pomóc Ci w podejmowaniu świadomych decyzji dotyczących Twojego zlecenia stałego.</Text>
        <Text style={styles.text}>9. Obowiązują zasady i warunki, więc zapoznaj się z nimi, aby w pełni skorzystać z tej promocji.</Text>
        <Text style={styles.headerText}>Nie przegap szansy na zdobycie atrakcyjnych premii w trakcie realizacji swoich celów inwestycyjnych. Już dziś skonfiguruj zlecenie stałe i obserwuj, jak rosną Twoje oszczędności!</Text>


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
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10, 
    marginBottom: 5, 
    marginLeft: 10, 
    marginRight: 10,
    textAlign: 'left',

  },
  text: {
    fontSize: 12, 
    marginBottom: 5,
    marginLeft: 10,
    marginLeft: 10,
  
  },
  rectangle: {
    backgroundColor: 'white',
    width: 350, 
    height: 580, 
    borderRadius: 8,
    marginVertical: 20,
  },

});

export default OfferSecond;
