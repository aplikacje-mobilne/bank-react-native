import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const ListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isFocused = useIsFocused(); // Returns true if the screen is focused

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.102:3001/users');
      setUsers(response.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchLoggedInUser = async () => {
    try {
      const userString = await AsyncStorage.getItem('loggedInUser');
      if (userString) {
        const user = JSON.parse(userString);
        setLoggedInUser(user);
      }
    } catch (error) {
      console.error('Error fetching logged-in user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchLoggedInUser();
    }, [isFocused]);

  const navigation = useNavigation();



  return (
    
    <View style={styles.container}>

      {loggedInUser && (
        <Text style={styles.loggedInUserText}>LOGGED AS: {loggedInUser.name}</Text>
        )}
      <Text style={styles.title}>List of Users:</Text>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>Id: {item.id}</Text>
            <Text>Name: {item.name}</Text>
            <Text>Login: {item.login}</Text>
            <Text>Password: {item.pass}</Text>
            
          </View>
          )}
      />
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
    fontSize: 16,
    marginBottom: 8,
  },
});

export default ListScreen;
