import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather } from '@expo/vector-icons';

const Edit6 = ({ setIsLoggedIn }) => {
    const navigation = useNavigation();
    const [pin, setPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmNewPin, setConfirmNewPin] = useState('');
    const [changePinMode, setChangePinMode] = useState(false);

    const handleNumberPress = (number) => {
        if (!changePinMode && pin.length < 4) {
            setPin(pin + number);
        } else if (changePinMode && newPin.length < 4) {
            setNewPin(newPin + number);
        } else if (changePinMode && confirmNewPin.length < 4) {
            setConfirmNewPin(confirmNewPin + number);
        }
    };

    const handleBackspacePress = () => {
        if (!changePinMode && pin.length > 0) {
            setPin(pin.slice(0, -1));
        } else if (changePinMode && confirmNewPin.length > 0) {
            setConfirmNewPin(confirmNewPin.slice(0, -1));
        } else if (changePinMode && newPin.length > 0) {
            setNewPin(newPin.slice(0, -1));
        }
    };


    const handlePinAuthentication = async () => {
        try {
            const userString = await AsyncStorage.getItem('loggedInUser');
            const loggedInUser = JSON.parse(userString);

            if (!changePinMode) {
                if (loggedInUser && loggedInUser.isPinEnabled) {
                    if (pin === loggedInUser.pin) {
                        console.log('PIN authentication successful');
                        setChangePinMode(true);
                    } else {
                        console.log('Invalid PIN');
                        Alert.alert('Error', 'Invalid PIN. Please try again.');
                    }
                } else {
                    Alert.alert('Error', 'PIN authentication is not enabled for this account.');
                    navigation.goBack();
                }
            } else {
                if (newPin === confirmNewPin) {
                    loggedInUser.pin = newPin;
                    await AsyncStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

                    console.log('PIN changed successfully');
                    Alert.alert('Success', 'PIN changed successfully.');
                    setIsLoggedIn(true);
                } else {
                    console.log('New PINs do not match');
                    Alert.alert('Error', 'New PINs do not match. Please try again.');
                }
            }
        } catch (error) {
            console.error('Error checking/changing PIN:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.enterPinText}>
                {changePinMode ? 'Enter New PIN:' : 'Enter old PIN:'}
            </Text>

            <View style={styles.pinContainer}>
                {[...Array(4)].map((_, index) => (
                    <View key={index} style={styles.pinDigitContainer}>
                        {index < (changePinMode ? newPin.length : pin.length) ? (
                            <Text style={styles.pinDigit}>*</Text>
                        ) : (
                            <Text style={styles.pinDigit}></Text>
                        )}
                    </View>
                ))}
            </View>

            {changePinMode && (
                <View style={styles.pinContainer}>
                    {[...Array(4)].map((_, index) => (
                        <View key={index} style={styles.pinDigitContainer}>
                            {index < confirmNewPin.length ? (
                                <Text style={styles.pinDigit}>*</Text>
                            ) : (
                                <Text style={styles.pinDigit}></Text>
                            )}
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.digitsContainer}>
                <View style={styles.digitRow}>
                    {[1, 2, 3].map((number) => (
                        <TouchableOpacity
                            key={number}
                            style={styles.digitButton}
                            onPress={() => handleNumberPress(number)}
                        >
                            <Text style={styles.digitButtonText}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.digitRow}>
                    {[4, 5, 6].map((number) => (
                        <TouchableOpacity
                            key={number}
                            style={styles.digitButton}
                            onPress={() => handleNumberPress(number)}
                        >
                            <Text style={styles.digitButtonText}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.digitRow}>
                    {[7, 8, 9].map((number) => (
                        <TouchableOpacity
                            key={number}
                            style={styles.digitButton}
                            onPress={() => handleNumberPress(number)}
                        >
                            <Text style={styles.digitButtonText}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.digitRow}>
                    <TouchableOpacity
                        style={styles.digitButton}
                        onPress={() => handleNumberPress(0)}
                    >
                        <Text style={styles.digitButtonText}>0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.digitButton}
                        onPress={() => handleBackspacePress()}
                    >
                        <Feather name="delete" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => handlePinAuthentication()}
            >
                <Text style={styles.loginButtonText}> {changePinMode ? 'Confirm New PIN' : 'Switch to Change PIN'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.moveToLoginButton}
                onPress={() => {
                    if (changePinMode) {
                        setChangePinMode(false); 
                        setPin(''); 
                        setNewPin('');
                        setConfirmNewPin('');
                    } else {
                        navigation.goBack();
                    }
                }}
            >

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    enterPinText: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pinContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    pinDigitContainer: {
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: '#323643',
        borderRadius: 5,
        padding: 10,
        width: 30,
        alignItems: 'center',
    },
    pinDigit: {
        fontSize: 20,
    },

    digitsContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },

    digitRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },

    digitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#323643',
        borderRadius: 30,
        margin: 5,
        padding: 15,
        width: 70,
        height: 70,
    },
    digitButtonText: {
        fontSize: 24,
    },
    loginButton: {
        backgroundColor: '#ff570c',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        marginBottom: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 20,
    },
    moveToLoginButton: {
        marginTop: 10,
    },
    moveToLoginButtonText: {
        color: '#323643',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default Edit6;
