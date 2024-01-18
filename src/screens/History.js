import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity, Animated, Modal, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../components/config';

const History = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const translateY = useRef(new Animated.Value(0)).current;

  const fetchTransactionHistory = useCallback(async () => {
    try {
      const storedLoggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (storedLoggedInUser) {
        const loggedInUser = JSON.parse(storedLoggedInUser).login;
        setLoggedInUser(loggedInUser);

        const response = await axios.get(`${API_CONFIG.BASE_URL}/transactions`);
        const sortedTransactions = response.data.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
        setTransactionHistory(sortedTransactions);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  }, []);

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const storedLoggedInUser = await AsyncStorage.getItem('loggedInUser');
        if (storedLoggedInUser) {
          const loggedInUser = JSON.parse(storedLoggedInUser).login;
          setLoggedInUser(loggedInUser);
  
          const response = await axios.get(`${API_CONFIG.BASE_URL}/transactions`);
          const allTransactions = response.data.reverse();
  
          const userTransactions = allTransactions.filter(
            (transaction) =>
              transaction.loggedInUser === loggedInUser || transaction.toUserLogin === loggedInUser
          );
  
          setTransactionHistory(userTransactions);
        }
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };
  
    fetchTransactionHistory();
  }, []);
  
  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
  
      const storedLoggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (storedLoggedInUser) {
        const loggedInUser = JSON.parse(storedLoggedInUser).login;
        setLoggedInUser(loggedInUser);
  
        const response = await axios.get(`${API_CONFIG.BASE_URL}/transactions`);
        const allTransactions = response.data.reverse();
  
        const userTransactions = allTransactions.filter(
          (transaction) =>
            transaction.loggedInUser === loggedInUser || transaction.toUserLogin === loggedInUser
        );
  
        setTransactionHistory(userTransactions);
      }
  
      setIsRefreshing(false);
    } catch (error) {
      console.error('Error refreshing transaction history:', error);
      setIsRefreshing(false);
    }
  };
  

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: translateY } } }], {
    useNativeDriver: false,
  });

  const renderTransactionItem = ({ item, index }) => {
    const isSentByLoggedInUser = item.loggedInUser === loggedInUser;
    const isReceivedByLoggedInUser = item.toUserLogin === loggedInUser;
    const formattedAmount = isReceivedByLoggedInUser ? `+${item.amount} PLN` : `-${item.amount} PLN`;
    const amountColor = isReceivedByLoggedInUser ? 'green' : 'black';
    const showDateRow =
      index === 0 || new Date(item.transactionDate).toDateString() !== new Date(transactionHistory[index - 1].transactionDate).toDateString();


    const isSender = item.loggedInUser === loggedInUser;
  const isRecipient = item.toUserLogin === loggedInUser;

  if (selectedFilter === 'positive' && !isRecipient) {
    return null;
  }

  else if (selectedFilter === 'negative' && !isSender) {
    return null;
  }

    else if ( selectedFilter ==='mobile' && item.type==='mobile') {
      return null;
    }
    else if ( selectedFilter ==='normal' && item.type==='normal') {
      return null;
    }

    return (
      <View>
        {showDateRow && (
          <View style={styles.dateRow}>
            <Text style={styles.dateText}>{new Date(item.transactionDate).toDateString()}</Text>
          </View>
          )}
        <View style={styles.transactionContainers}>
          <View style={styles.transactionIcon}>
            {item.type === 'mobile' ? (
              <Feather name="smartphone" size={27} />
              ) : (
                <Feather name="arrow-right" size={27} />
                )}
          </View>
          <Text style={[styles.transactionTitle, styles.transactionFlexBox]}>{item.title}</Text>
          <Text style={[styles.transactionDescription, styles.transactionFlexBox]}>{item.description}</Text>
          <Text style={{ ...styles.amount, color: amountColor }}>{formattedAmount}</Text>
        </View>
      </View>
      );
  };

  const openFilterModal = () => {
    setModalVisible(true);
  };

  const closeFilterModal = () => {
    setModalVisible(false);
  };

  const applyFilter = (filter) => {
    setSelectedFilter(filter);
    closeFilterModal();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
        styles.filterButtonContainer,
        {
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 50],
                outputRange: [0, -50],
                extrapolate: 'clamp',
              }),
            },
            ],
        },
        ]}
        >
        <TouchableOpacity style={styles.filterButton} onPress={openFilterModal}>
          <Feather name="filter" size={18} color="white" />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.header}>
        <View style={styles.headerContent}></View>
        <View style={styles.transactionsContainer}>
          <FlatList
            data={transactionHistory}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTransactionItem}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          />
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeFilterModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <Pressable
              style={[styles.modalOption, selectedFilter === 'default' && styles.selectedOption]}
              onPress={() => applyFilter('default')}
              >
              <Text style={styles.modalOptionText}>Default</Text>
            </Pressable>
            <Pressable
              style={[styles.modalOption, selectedFilter === 'mobile' && styles.selectedOption]}
              onPress={() => applyFilter('mobile')}
              >
              <Text style={styles.modalOptionText}>Mobile</Text>
            </Pressable>
            <Pressable
              style={[styles.modalOption, selectedFilter === 'normal' && styles.selectedOption]}
              onPress={() => applyFilter('normal')}
              >
              <Text style={styles.modalOptionText}>Normal</Text>
            </Pressable>
            <Pressable
              style={[styles.modalOption, selectedFilter === 'positive' && styles.selectedOption]}
              onPress={() => applyFilter('positive')}
              >
              <Text style={styles.modalOptionText}>Positive</Text>
            </Pressable>
            <Pressable
              style={[styles.modalOption, selectedFilter === 'negative' && styles.selectedOption]}
              onPress={() => applyFilter('negative')}
              >
              <Text style={styles.modalOptionText}>Negative</Text>
            </Pressable>
            <Pressable style={styles.modalCloseButton} onPress={closeFilterModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
    );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 20,
  },
  header: {
    flex: 1,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterButtonContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  filterButton: {
    backgroundColor: '#ff570c',
    padding: 12,
    borderRadius: 25,
    marginTop: -4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#323643',
    fontWeight: 'bold',
  },
  transactionsContainer: {
    flex: 1,
  },
  transactionContainers: {
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
  transactionIcon: {
    marginLeft: 10,
    width: 27,
    height: 27,
    overflow: 'hidden',
  },
  transactionFlexBox: {
    textAlign: 'left',
    letterSpacing: 0,
    position: 'absolute',
  },
  transactionTitle: {
    marginTop: -29,
    left: 50,
    width: 180,
    height: 34,
    fontSize: 20,
    fontWeight: '500',
    top: '50%',
    letterSpacing: 0,
  },
  transactionDescription: {
    marginTop: 5,
    left: 50,
    width: 180,
    fontSize: 14,
    top: '50%',
    letterSpacing: 0,
  },
  amount: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 15,
    width: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#323643',
  },
  modalOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#323643',
  },
  selectedOption: {
    backgroundColor: 'white',
    borderBottomWidth: 2, 
    borderBottomColor: '#ff570c',
  },
  modalCloseButton: {
    marginTop: 20,
    backgroundColor: '#ff570c',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};

export default History;
