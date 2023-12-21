import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const ListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const isFocused = useIsFocused(); 

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.1.193:3001/users');
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

  
/* <FlatList
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
       */

      return (
        <View>
          
          <View style={styles.rectangle1}>
            {loggedInUser ? (
              <Text style={styles.loggedInUserText}>Hej, {loggedInUser.name}!</Text>
            ) : null}
            <View style={styles.rectangle2}>
              <Text style={styles.Text2}>Stan konta: </Text>
              {loggedInUser ? (
                <Text style={styles.Text3}>PLN {loggedInUser.balance}</Text>
              ) : (
                <Text style={styles.Text3}>PLN 0.00</Text>
              )}
            </View>
          </View>
      
          
          <View style={styles.rectangle3}>
            <Text style={styles.Text4}>Ostatnie transakcje:</Text>
            <View style={styles.rectangle4}></View>
            <View style={styles.rectangle4}></View>
            <View style={styles.rectangle4}></View>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <View style={styles.rectangle5}>
                <Text style={styles.buttonText}>Więcej</Text>
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
    fontSize: 50, 
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
    fontSize: 35,
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
    height: 320,
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
    alignSelf: 'center',
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
});

export default ListScreen;
