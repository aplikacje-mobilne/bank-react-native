import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const EditPayments = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);
    const [userData, setUserData] = useState(null);

    const fetchCheckboxState = async () => {
        try {
            const receiveTransfersOnPhoneJson = await AsyncStorage.getItem('receiveTransfersOnPhone');
            if (receiveTransfersOnPhoneJson) {
                const receiveTransfersOnPhone = JSON.parse(receiveTransfersOnPhoneJson);
                setChecked(receiveTransfersOnPhone);
            }
        } catch (error) {
            console.error('Error fetching checkbox state:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('loggedInUser');
                if (userJson) {
                    const user = JSON.parse(userJson);
                    setUserData(user);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchCheckboxState();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <Text style={styles.text1}>Transfers to Phone</Text>
            </View>
            <View style={styles.div}>
                <Text style={styles.text2}>
                    Register your phone number in the system. The sender doesn't need to know
                    your account number, just your phone number.
                </Text>
                <Text style={styles.text3}>
                    KRW Account Number: {userData ? `${userData.accountNumber}` : ''}
                </Text>
                <Text style={styles.text3}>
                    This account is linked to the phone number:{' '}
                    {userData ? `${userData.phoneNumber}` : ''}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
    },
    div: {
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#ffffff',
        width: '95%',
        marginBottom: '1%',
        marginTop: '1%',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 6,
        overflow: 'hidden',
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 6,
        overflow: 'hidden',
    },
    checkbox: {
        alignSelf: 'center',
    },
    text1: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000000',
        padding: '2%',
        textAlign: 'center',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
    text2: {
        fontSize: 15,
        color: '#000000',
        backgroundColor: '#ffffff',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
    text3: {
        fontSize: 15,
        color: '#000000',
        paddingTop: '5%',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
});

export default EditPayments;
