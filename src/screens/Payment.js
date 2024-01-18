import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Payment = ({ navigation }) => {

  return (

    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContent}>

            <Icon name="check-circle" solid size={35} />

            <Text style={styles.sectionText}>Choose Transfer Type</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContent}>
            <Icon name="landmark" size={35} />
            <TouchableOpacity onPress={() => navigation.navigate('Payment1')}>
              <Text style={styles.sectionText}>Domestic Transfer</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>
            In this case, funds are transferred between accounts within the same bank.
          </Text>
          <Text style={styles.sectionDescription}>
            An external domestic transfer is an operation that involves transferring money between accounts in different banks. The time of posting the transfer depends on the processing time of the bank.
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionContent}>
            <Icon name="mobile" light size={35} />
            <TouchableOpacity onPress={() => navigation.navigate('Payment2')}>
              <Text style={styles.sectionText}>Mobile Transfer</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>
            In this case, we don't need to enter the recipient's address, just the essential details: phone number, title, and the amount being sent.
          </Text>
        </View>

      </View>

    </View>
  );
};

export default Payment;
