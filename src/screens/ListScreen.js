import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';
import * as LocalAuthentication from 'expo-local-authentication'; // Import LocalAuthentication

const ListScreen = ({ setIsLoggedIn }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [lastTransactions, setLastTransactions] = useState([]); // Add this line

  useEffect(() => {
    const fetchData = async () => {
      await fetchLoggedInUser();
      try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}/transactions`);
        setLastTransactions(response.data);
      } catch (error) {
        console.error('Error fetching last transactions:', error);
      }
    };

    fetchData();
    }, [isFocused]);
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
      // Clear the user's authentication information
      //await AsyncStorage.removeItem('loggedInUser');
      //setLoggedInUser(null);
      setIsLoggedIn(false);

      // Navigate back to the login screen
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  const handleDevicePairing = async () => {
    try {
      // Authenticate using biometrics
      const { success } = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to pair your device with biometrics',
      });

      if (success) {
        Alert.alert('Success', 'Device paired successfully.');

        // Update the user object with isBiometricEnabled set to true
        const updatedUser = { ...loggedInUser, isBiometricEnabled: true };

        // Save the updated user to AsyncStorage
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

        // Update the state with the new user information
        setLoggedInUser(updatedUser);
      } else {
        // Biometric authentication failed
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
        Alert.alert('Success', 'Device paired successfully.');

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
      // Prompt the user to set a PIN
      const pin = "1234"; // For simplicity, set the PIN to "1234" in this example

      // Update the user object with isPinEnabled set to true and the PIN value
      const updatedUser = { ...loggedInUser, isPinEnabled: true, pin };

      // Save the updated user to AsyncStorage
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

      // Update the state with the new user information
      setLoggedInUser(updatedUser);

      Alert.alert('Success', 'PIN set successfully.');
    } catch (error) {
      console.error('Error setting PIN:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleUnSetPin = async () => {
    try {
      // Prompt the user to set a PIN
      const pin = null; // For simplicity, set the PIN to "1234" in this example

      // Update the user object with isPinEnabled set to true and the PIN value
      const updatedUser = { ...loggedInUser, isPinEnabled: false, pin };

      // Save the updated user to AsyncStorage
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

      // Update the state with the new user information
      setLoggedInUser(updatedUser);

      Alert.alert('Success', 'PIN set successfully.');
    } catch (error) {
      console.error('Error setting PIN:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        {loggedInUser ? (
          <Text style={styles.loggedInUserText}>Hello, {loggedInUser.name}!</Text>
        ) : null}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Account Balance: </Text>
          {loggedInUser ? (
            <Text style={styles.balanceAmount}>{loggedInUser.balance} PLN</Text>
          ) : (
            <Text style={styles.balanceAmount}>0.00 PLN</Text>
          )}
        </View>
      </View>

      <TouchableOpacity onPress={handleDevicePairing}>
        <View style={styles.pairDeviceButton}>
          <Text style={styles.pairDeviceButtonText}>Pair Device with Biometrics</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeviceUnpairing}>
        <View style={styles.pairDeviceButton}>
          <Text style={styles.pairDeviceButtonText}>Unpair Device with Biometrics</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSetPin}>
        <View style={styles.pairDeviceButton}>
          <Text style={styles.pairDeviceButtonText}>Set PIN for account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleUnSetPin}>
        <View style={styles.pairDeviceButton}>
          <Text style={styles.pairDeviceButtonText}>Unset PIN for account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout}>
        <View style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </View>
      </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userContainer: {
    backgroundColor: '#323643',
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loggedInUserText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 10,
  },
  balanceContainer: {
    backgroundColor: '#606470',
    width: '80%',
    height: 80,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceLabel: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
  balanceAmount: {
    fontSize: 28,
    color: 'white',
  },
  transactionContainer: {
    backgroundColor: '#323643',
    width: '100%',
    borderRadius: 8,
    marginVertical: 20,
    padding: 15,
  },
  pairDeviceButton: {
    backgroundColor: '#ff570c',
    paddingVertical: 10,
    width: '80%',
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pairDeviceButtonText: {
    fontSize: 16,
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#ff0000', // Red color for logout button
    paddingVertical: 10,
    width: '80%',
    borderRadius: 8,
    marginTop: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default ListScreen;
