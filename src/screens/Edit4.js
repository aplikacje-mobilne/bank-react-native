import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import CheckBox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const Edit4 = ({ navigation }) => {
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
        // Fetch user data from AsyncStorage
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

    const handleCheckboxChange = async () => {
        try {
            // Save the checkbox state in AsyncStorage
            await AsyncStorage.setItem('receiveTransfersOnPhone', JSON.stringify(!isChecked));
            setChecked(!isChecked);
        } catch (error) {
            console.error('Error saving checkbox state:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <Text style={styles.tekst1}>Przelewy na telefon</Text>
            </View>
            <View style={styles.div}>
                <View style={styles.pom}>
                    <Text style={styles.tekst1}>Odbieraj przelewy na telefon </Text>
                    <CheckBox
                        value={isChecked}
                        onValueChange={() => setChecked(handleCheckboxChange)}
                        label=""
                        style={styles.chkbx}
                    />
                </View>
                <Text style={styles.tekst2}>
                    Zarejestruj swój numer telefonu w systemie. Nadawca nie musi znać
                    Twojego numeru konta, wystarczy numer telefonu.
                </Text>
                <Text style={styles.tekst3}>
                    Numer konta KRW: {userData ? `${userData.nrkonta}` : ''}
                </Text>
                <Text style={styles.tekst3}>
                    To konto jest przypisane do numeru telefonu:{' '}
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
    pom: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 6,
        overflow: 'hidden',
    },
    chkbx: {
        alignSelf: 'center',
    },
    tekst1: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000000',
        padding: '2%',
        textAlign: 'center',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
    tekst2: {
        fontSize: 18,
        fontWeight: '300',
        color: '#000000',
        backgroundColor: '#ffffff',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
    tekst3: {
        fontSize: 18,
        fontWeight: '300',
        color: '#000000',
        paddingTop: '5%',
        paddingLeft: '2%',
        paddingRight: '2%',
    },
});


export default Edit4;
