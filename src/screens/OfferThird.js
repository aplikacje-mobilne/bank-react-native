import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OfferThird = () => {
  return (
    
    <View style={styles.container}>
      
   
      

      <View style={styles.rectangle}>
        <Text style={styles.headerText}>Odblokuj potencjał swoich oszczędności dzięki naszej ekskluzywnej promocji depozytów! Łącząc 12-miesięczną lokatę z regularnym inwestowaniem, możesz zyskać atrakcyjne oprocentowanie na poziomie 4,5% już od 10 000 zł.</Text>
        <Text style={styles.text}>1. Dzięki tej specjalnej promocji możesz zyskać konkurencyjne odsetki od swojego depozytu w wysokości 4,5%</Text>
        <Text style={styles.text}>2. Promocja łączy w sobie stabilność 12-miesięcznej lokaty z potencjałem wzrostu regularnego inwestowania.</Text>
        <Text style={styles.text}>3. Aby wziąć udział wystarczy zacząć od minimalnego depozytu w wysokości 10 000 zł.</Text>
        <Text style={styles.text}>4. Jest to doskonały sposób na obserwowanie, jak Twoje oszczędności rosną z biegiem czasu, a jednocześnie zyskujesz hojne oprocentowanie.</Text>
        <Text style={styles.text}>5. Twoje środki pozostają dostępne, co pozwala na dokonywanie dodatkowych inwestycji w miarę upływu czasu.</Text>
        <Text style={styles.text}>6. Promocja ma na celu pomóc Ci osiągnąć Twoje cele finansowe przy jednoczesnej maksymalizacji zysków.</Text>
        <Text style={styles.text}>7. Opcje regularnego inwestowania są elastyczne i można je dostosować do Twoich preferencji i tolerancji ryzyka.</Text>
        <Text style={styles.text}>8. Obowiązują zasady i warunki, więc zapoznaj się z nimi, aby w pełni zrozumieć korzyści płynące z tej promocji.</Text>
        <Text style={styles.headerText}>Ta promocja daje wyjątkową możliwość połączenia korzyści lokaty terminowej z regularnymi inwestycjami, aby zmaksymalizować zyski i osiągnąć swoje cele finansowe!</Text>


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

export default OfferThird;
