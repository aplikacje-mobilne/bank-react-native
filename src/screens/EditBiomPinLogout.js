import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import * as LocalAuthentication from 'expo-local-authentication'; 

const EditBiomPinLogout = ({ setIsLoggedIn }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [lastTransactions, setLastTransactions] = useState([]); 

  const fetchLoggedInUser = async () => {
    try {
      const userString = await AsyncStorage.getItem('loggedInUser');
      console.log('Stored Logged In User:', userString);
      if (userString) {
        const user = JSON.parse(userString);
        console.log('Parsed Logged In User:', user);
        setLoggedInUser(user);
      }
    } catch (error) {
      console.error('Error fetching logged-in user:', error);
    }
  };

  useEffect(() => {
    fetchLoggedInUser();
  }, [isFocused]);
  const handleLogout = async () => {
    try {

      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  const handleDevicePairing = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to pair your device with biometrics',
      });

      if (success) {
        Alert.alert('Success', 'Device paired successfully.');

        const updatedUser = { ...loggedInUser, isBiometricEnabled: true };

        await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        setLoggedInUser(updatedUser);
      } else {
        Alert.alert('Error', 'Biometric authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Error pairing device:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };


  const handleDeviceUnpairing = async () => {
    try {
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to pair your device with biometrics',
      });

      if (success) {
        Alert.alert('Success', 'Device unpaired successfully.');

        const updatedUser = { ...loggedInUser, isBiometricEnabled: false};

        await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        setLoggedInUser(updatedUser);
      } else {
        Alert.alert('Error', 'Biometric authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Error pairing device:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleSetPin = async () => {
    try {
      navigation.navigate('EditSetPin');
    } catch (error) {
      console.error('Error setting PIN:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleUnSetPin = async () => {
    try {
      const pin = null; 

      const updatedUser = { ...loggedInUser, isPinEnabled: false, pin };

      await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

      setLoggedInUser(updatedUser);

      Alert.alert('Success', 'PIN unset successfully.');
    } catch (error) {
      console.error('Error setting PIN:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  return (
      <View style={styles.container}>
          <View style={styles.div}>
              <View style={styles.inputs}>

          <Text style={styles.infoText}>You can pair your device with biometrics</Text>
          <TouchableOpacity onPress={handleDevicePairing}>
              <View style={styles.btn}>
                  <Text style={styles.btnText}>Pair Device with Biometrics</Text>
              </View>
          </TouchableOpacity>

          <Text style={styles.infoText}>You can unpair your device from biometrics</Text>
          <TouchableOpacity onPress={handleDeviceUnpairing}>
              <View style={styles.btn}>
                  <Text style={styles.btnText}>Unpair Device with Biometrics</Text>
              </View>
          </TouchableOpacity>

          <Text style={styles.infoText}>Set a PIN </Text>
          <TouchableOpacity onPress={handleSetPin}>
              <View style={styles.btn}>
                  <Text style={styles.btnText}>Set PIN </Text>
              </View>
          </TouchableOpacity>

          <Text style={styles.infoText}>Remove PIN from your account</Text>
          <TouchableOpacity onPress={handleUnSetPin}>
              <View style={styles.btn}>
                  <Text style={styles.btnText}>Unset PIN </Text>
              </View>
          </TouchableOpacity>

          <Text style={styles.infoText}>Logout from your account</Text>
          <TouchableOpacity onPress={handleLogout}>
                      <View style={styles.btn}>
                     <Text style={styles.btnText}>Logout</Text>
              </View>
          </TouchableOpacity>
              </View>
          </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
    },
    inputs: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '85%',
        marginTop: '10%',
    },
    div: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 6,
        marginLeft: '1%',
        marginRight: '1%',
    },
  btn: {
    backgroundColor: '#ff570c',
    paddingVertical: 10,
    width: '90%',
    borderRadius: 50,
    marginTop: 5,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
    infoText: {
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
    },
    
});

export default EditBiomPinLogout;
