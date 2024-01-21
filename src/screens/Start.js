import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity, Alert,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";

const Frame = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerBackTitleVisible: true,
    });
  }, [navigation]);

  const goToFrameTwo = () => {
    navigation.navigate('RegisterScreen');
  };
  const authenticate = async () => {
    try {
      const userString = await AsyncStorage.getItem('loggedInUser');

      if (userString) {
        const user = JSON.parse(userString);

        if (user.isBiometricEnabled) {
          const { success } = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Authenticate to continue',
          });

          if (success) {
            setIsLoggedIn(true);
          } else {
            Alert.alert('Authentication Failed', 'Please try again or use another authentication method.');
          }
        } else {
          if (user.isPinEnabled) {
            navigation.navigate('PinLogin');
          } else {
            navigation.navigate('Login');
          }
        }
      } else {
          navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.div}>

        <View style={styles.elipsy}>
          <View style={styles.ellipse} />
          <View style={styles.ellipse2} />
        </View>

        <View style={styles.bla1}>
          <Icon name="bank" size={86} color="#323643"/>

          <Text style={styles.tekst1}>POLSKI BANK KRW</Text>
          <TouchableOpacity style={styles.group} onPress={authenticate}>
            <View style={styles.overlapGroup}>
              <Text style={styles.tekst2}>Log IN</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.nieMaszKontaZaJe} onPress={goToFrameTwo}>
            Don't you have an account? Sign up here
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  div: {
    backgroundColor: "#f7f7f7",
    height: '100%',
    overflow: "hidden",
    position: "relative",
    width: '100%',
  },
  elipsy: {
    height: 534,
    left: -146,
    position: "absolute",
    top: -152,
    width: 579,
  },
  ellipse: {
    backgroundColor: "#ff570c",
    borderRadius: 118,
    height: 236,
    left: 393,
    position: "absolute",
    top: 175,
    width: 236,
  },
  ellipse2: {
    backgroundColor: "#323643",
    borderBottomRightRadius: 390,
    borderBottomLeftRadius: 460,
    height: 332,
    left: 0,
    position: "absolute",
    top: 0,
    width: '100%',
  },
  bla1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 20,
    marginBottom: 20,
  },
  tekst1: {
    marginTop: 20,
    fontSize: 32,
    color: '#323643',
    fontWeight: 'bold',
    paddingBottom: '5%',
  },
  group: {
    backgroundColor: '#ff570c',
    paddingVertical: 10,
    width: '85%',
    borderRadius: 50,
  },
  overlapGroup: {
    alignItems: 'center',
  },
  tekst2: {
    color: '#fff',
    fontSize: 24,
  },
  nieMaszKontaZaJe: {
    marginTop: 20,
    color: '#323643',
    textDecorationLine: 'underline',
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Frame;
