import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';

const History = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const storedLoggedInUser = await AsyncStorage.getItem('loggedInUser');
        if (storedLoggedInUser) {
          const loggedInUser = JSON.parse(storedLoggedInUser).login;
          setLoggedInUser(loggedInUser);

          const response = await axios.get(`${API_CONFIG.BASE_URL}/transaction`);
          setTransactionHistory(response.data.reverse());        }
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };

    fetchTransactionHistory();
    }, []);

 const renderTransactionItem = ({ item, index }) => {
  const isSentByLoggedInUser = item.loggedInUser === loggedInUser;
  const isReceivedByLoggedInUser = item.toUserLogin === loggedInUser;
  const formattedAmount = isReceivedByLoggedInUser ? `${item.kwota} PLN` : `-${item.kwota} PLN`;
  const amountColor = isReceivedByLoggedInUser ? 'green' : 'black';
  const showDateRow = index === 0 || new Date(item.dataTransakcji).toDateString() !== new Date(transactionHistory[index - 1].dataTransakcji).toDateString();
   return (
    <View>
      {showDateRow && (
        <View style={styles.dateRow}>
          <Text style={styles.dateText}>{new Date(item.dataTransakcji).toDateString()}</Text>
        </View>
      )}
      <View style={styles.kontenerTransakcji}>
        <View style={styles.ikonaTransakcji}>
          {item.typ === 'mobilny' ? (
            <Feather name="smartphone" size={27} />
          ) : (
            <Feather name="arrow-right" size={27} />
          )}
        </View>
        <Text style={[styles.tytulTransakcji, styles.flexBoxTransakcji]}>{item.tytul}</Text>
        <Text style={[styles.opisTransakcji, styles.flexBoxTransakcji]}>{item.opis}</Text>
        <Text style={{ ...styles.kwota, color: amountColor }}>{formattedAmount}</Text>
      </View>
    </View>
    );
 };

  return (
    <View style={styles.header}>
     
      <View style={styles.transactionContainer}>
        {transactionHistory.length > 0 ? (
          <FlatList
            data={transactionHistory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTransactionItem}
          />
          ) : (
            <Text style={styles.noTransactionsText}>No transactions available.</Text>
            )}
      </View>
    </View>
    );
};
const styles = {
  header: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  sectionContainerp1: {
    marginBottom: 20,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  transactionContainer: {
    flex: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  iconContainer: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  noTransactionsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
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
  ikonaTransakcji: {
    marginLeft: 10,
    width: 27,
    height: 27,
    overflow: 'hidden',
  },
  flexBoxTransakcji: {
    textAlign: 'left',
    letterSpacing: 0,
    position: 'absolute',
  },
  tytulTransakcji: {
    marginTop: -29,
    left:50,
    width: 180,
    height: 34,
    fontSize: 20,
    fontWeight: 500,
    top: '50%',
    letterSpacing: 0,
  },
  opisTransakcji: {
    marginTop: 5,
    left: 50,
    width: 180,
    fontSize: 14,
    top: '50%',
    letterSpacing: 0,
  },
  kwota: {
    marginTop: 23,
    fontSize: 16,
    fontWeight: '500',
    position: 'absolute',
    right: 10,
    textAlign: 'right',
  },
  dateRow: {
   
    alignItems: 'left',
  },
  dateText: {
    fontSize: 16,
  fontWeight: 'bold',
},
  
};
export default History;
