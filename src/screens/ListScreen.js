import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';
import Header from '../components/Header';

const ListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}/users`);
      console.log('Users Response:', response.data);
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

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

  const fetchTransactionHistory = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}/transactions`);
      console.log('Transaction Response:', response.data);
      setTransactionHistory(response.data.reverse().slice(0, 4));
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLoggedInUser();
    fetchTransactionHistory();
  }, [isFocused]);

  return (
    <View>
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
      <View style={styles.transactionContainer}>
        <Text style={styles.transactionTitle}>Recent Transactions:</Text>
        {transactionHistory.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <Text style={styles.transactionDetail}>{transaction.title}</Text>
            <Text style={styles.transactionAmount}>
              {loggedInUser && transaction.toUserLogin === loggedInUser.login
                ? `+${transaction.amount} PLN`
                : `-${transaction.amount} PLN`}
            </Text>
          </View>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <View style={styles.moreButton}>
            <Text style={styles.moreButtonText}>More</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    backgroundColor: '#323643',
    width: 390,
    height: 200,
    borderRadius: 8,
    marginVertical: 20,
    alignSelf: 'center',
  },
  loggedInUserText: {
    fontSize: 40,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 20,
    color: 'white',
  },
  balanceContainer: {
    backgroundColor: '#606470',
    width: 300,
    height: 80,
    borderRadius: 8,
    marginVertical: 20,
    marginLeft: 70,
    alignSelf: 'center',
  },
  balanceLabel: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    color: 'white',
  },
  balanceAmount: {
    fontSize: 32,
    marginTop: -15,
    marginLeft: 10,
    color: 'white',
  },
  transactionContainer: {
    backgroundColor: '#323643',
    width: 390,
    height: 400,
    borderRadius: 8,
    marginVertical: 20,
    marginTop: 0,
    alignSelf: 'center',
  },
  transactionTitle: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 8,
    alignSelf: 'center',
    color: 'white',
  },
  transactionItem: {
    backgroundColor: 'white',
    width: 370,
    height: 70,
    borderRadius: 8,
    marginVertical: 10,
    marginTop: 0,
    paddingLeft: 0,
    alignSelf: 'center',
    overflow: 'hidden',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionDetail: {
    textAlign: 'left',
    position: 'absolute',
    marginTop: -15,
    left: 10,
    width: 240,
    fontWeight: '500',
    height: 34,
    fontSize: 24,
    top: '50%',
    letterSpacing: 0,
  },
  transactionAmount: {
    marginTop: 23,
    fontSize: 24,
    fontWeight: '500',
    position: 'absolute',
    right: 10,
    textAlign: 'right',
  },
  moreButton: {
    backgroundColor: '#606470',
    width: 90,
    height: 40,
    borderRadius: 50,
    marginTop: -5,
    alignSelf: 'center',
  },
  moreButtonText: {
    fontSize: 17,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ListScreen;
