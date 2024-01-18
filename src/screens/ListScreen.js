import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';
import Header from '../components/Header';

const ListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const isFocused = useIsFocused();

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
      const storedLoggedInUser = await AsyncStorage.getItem('loggedInUser');
      console.log('Stored Logged In User for Transaction:', storedLoggedInUser);
      if (storedLoggedInUser) {
        const loggedInUser = JSON.parse(storedLoggedInUser);

        const response = await axios.get(`${API_CONFIG.BASE_URL}/transactions`);
        console.log('Transaction Response:', response.data);

        const userTransactions = response.data
          .filter(
            (transaction) =>
              transaction.loggedInUser === loggedInUser.login || transaction.toUserLogin === loggedInUser.login
          )
          .reverse()
          .slice(0, 4);

        setTransactionHistory(userTransactions);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsers();
        await fetchLoggedInUser();
        await fetchTransactionHistory();
      
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isFocused]);
  

  return (
    <View>
      <View style={styles.rectangle1}>
        {loggedInUser ? (
          <Text style={styles.loggedInUserText}>Hello, {loggedInUser.name}!</Text>
          ) : null}
        <View style={styles.rectangle2}>
          <Text style={styles.Text2}>Account Balance: </Text>
          {loggedInUser ? (
            <Text style={styles.Text3}>{loggedInUser.balance} PLN</Text>
            ) : (
              <Text style={styles.Text3}>0.00 PLN</Text>
              )}
        </View>
      </View>
      <View style={styles.rectangle3}>
        <Text style={styles.Text4}>Recent Transactions:</Text>
        {transactionHistory.map((transaction, index) => (
          <View key={index} style={styles.rectangle4}>
            <Text style={[styles.tytulTransakcji, styles.flexBoxTransakcji]}>{transaction.title}</Text>
            <Text style={[styles.opisTransakcji, styles.flexBoxTransakcji]}>{transaction.description}</Text>
            <Text style={{ ...styles.kwota }}>
              {loggedInUser && transaction.toUserLogin === loggedInUser.login ? `${transaction.amount} PLN` : `-${transaction.amount} PLN`}
            </Text>
          </View>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('History')}>
          <View style={styles.rectangle5}>
            <Text style={styles.buttonText}>More</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
 
  loggedInUserText: {
    fontSize: 40,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 20,
    color: 'white', 
    
  },
  Text2: {
    fontSize: 20, 
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    color: 'white', 
    
  },
  Text3: {
    fontSize: 32,
    marginTop: -15, 
    marginLeft: 10,
    color: 'white',
  },
  Text4: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 8,
    alignSelf: 'center',
    color: 'white',
  },
  
  rectangle1: {
    backgroundColor: '#323643',
    width: 390,
    height: 200,
    borderRadius: 8,
    marginVertical: 20,
    alignSelf: 'center',
  },
  rectangle2: {
    backgroundColor: '#606470',
    width: 300,
    height: 80,
    borderRadius: 8,
    marginVertical: 20,
    marginLeft: 70,
    alignSelf: 'center',
  },

  rectangle3: {
    backgroundColor: '#323643',
    width: 390,
    height: 400,
    borderRadius: 8,
    marginVertical: 20,
    marginTop: 0,
    alignSelf: 'center',
  },
  rectangle4: {
    backgroundColor: 'white',
    width: 370,
    height: 70,
    borderRadius: 8,
    marginVertical: 10,
    marginTop: 0,
    paddingLeft:0,
    alignSelf: 'center',

   // marginBottom: 1,
    overflow: 'hidden',
    //flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',


  },
  rectangle5: {

    backgroundColor: '#606470',
    width: 90, 
    height: 40, 
    borderRadius: 50,
    marginTop: -5,
    alignSelf: 'center',

  },
  
  orangeButton: {
    position: 'absolute', 
    backgroundColor: '#FF570C',
    width: 90, 
    height: 40, 
    borderRadius: 50,
    bottom: 10,
    right: 10,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    marginTop: 10,
    textAlign: 'center', 
  },
  kontenerTransakcji: {
    backgroundColor: 'white',
    marginBottom: 1,
    overflow: 'hidden',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  flexBoxTransakcji: {
    textAlign: 'left',
    letterSpacing: 0,
    position: 'absolute',
  },
  tytulTransakcji: {
    marginTop: -30,
    left: 10,
    width: 240,
    fontWeight: '500',
    height: 34,
    fontSize: 24,
    top: '50%',
    letterSpacing: 0,
  },
  opisTransakcji: {
    marginTop: 5,
    left: 10,
    width: 240,
  fontSize: 14,
  top: '50%',
  letterSpacing: 0,
},
  kwota: {
    marginTop: 23,
    fontSize: 24,
    fontWeight: '500',
    position: 'absolute',
    right: 10,
    textAlign: 'right',
  },
});

export default ListScreen;
