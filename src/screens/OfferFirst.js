import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OfferFirst = () => {
  return (
    
    <View style={styles.container}>
      
   
      

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>Przedstawiamy naszą nową promocję Konta Oszczędnościowego, w której możesz zarobić aż do 5% odsetek przez okres 90 dni. Ta ograniczona czasowo oferta ma na celu pomóc Ci zmaksymalizować potencjał oszczędności.</Text>
        <Text style={styles.text}>1. Zarabiaj do 8% odsetek od swoich oszczędności przez okres 90 dni.</Text>
        <Text style={styles.text}>2. Promocja dostępna jest dla nowych środków wpłaconych na konto, z maksymalnym limitem wpłat wynoszącym 500 000 zł.</Text>
        <Text style={styles.text}>3. Oprocentowanie jest gwarantowane przez cały okres 90 dni.</Text>
        <Text style={styles.text}>4. Twoje środki pozostają dostępne, zapewniając elastyczność, gdy ich potrzebujesz.</Text>
        <Text style={styles.text}>5. Promocja dostępna jest przez ograniczony czas, dlatego warto działać szybko, aby skorzystać z tej oferty.</Text>
        <Text style={styles.text}>6. Odsetki naliczane są codziennie i naliczane na Twoje konto po upływie 90 dni.</Text>
        <Text style={styles.text}>7. Dochody odsetkowe podlegają standardowym przepisom podatkowym.</Text>
        <Text style={styles.text}>8. Kontem możesz wygodnie zarządzać poprzez bankowość internetową.</Text>
        <Text style={styles.text}>9. W okresie promocyjnym nie są pobierane żadne opłaty za prowadzenie konta.</Text>
        <Text style={styles.text}>10. Obowiązują zasady i warunki, więc pamiętaj o zapoznaniu się z nimi przed otwarciem konta.</Text>
        <Text style={styles.headerText}>Nie przegap okazji na powiększenie swoich oszczędności dzięki naszej promocji Konta Oszczędnościowego. Zacznij oszczędzać z nami już dziś!</Text>


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
