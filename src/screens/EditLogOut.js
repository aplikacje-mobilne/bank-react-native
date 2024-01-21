import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';

const EditLogOut = ({ setIsLoggedIn }) => {
    const navigation = useNavigation();
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleUnRegister = async () => {
        try {
            Alert.alert(
                'Confirmation',
                'Are you sure you want to unregister? This action cannot be undone.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Confirm',
                        onPress: async () => {
                            const updatedUser = { ...loggedInUser, isBiometricEnabled: false, isPinEnabled: false };
                            await AsyncStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
                            setLoggedInUser(null);
                            setIsLoggedIn(false);
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            console.error('Error unregistering device:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <View style={styles.div2}>
                    <Icon name="exclamation" size={100} color="#606470" />
                </View>
                <Text style={styles.text1}>Are you sure you want to unregister from this device?</Text>
                <Text style={styles.text2}>After logging out, using the KRW app will not be possible - you will need to log in again.</Text>
                <TouchableOpacity
                    style={styles.unregisterBtn}
                    onPress={handleUnRegister}
                >
                    <Text style={styles.unregisterText}>Unregister</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#f7f7f7',
    },
    div: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#ffffff',
        width: '95%',
        marginBottom: '1%',
        marginTop: '1%',
        alignSelf: 'center',
        paddingTop: '10%',
        borderRadius: 6,
    },
    text1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        paddingTop: '10%',
    },
    text2: {
        fontSize: 15,
        color: '#000000',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        paddingTop: '5%',
    },
    div2: {
        borderWidth: 1,
        borderColor: '#000000',
        height: 112,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: 112,
    },
    unregisterBtn: {
        backgroundColor: '#ff570c',
        borderRadius: 50,
        width: '85%',
        position: 'relative',
        justifyContent: 'center',
        alignSelf: 'center',
        height: '12%',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '5%',
    },
    unregisterText: {
        color: '#f7f7f7',
        fontSize: 24,
        fontWeight: '400',
        position: 'absolute',
    },
});

export default EditLogOut;
