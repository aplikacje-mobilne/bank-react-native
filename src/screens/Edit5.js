import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
const Edit5 = () => {
    const navigation = useNavigation();
    const [isChecked, setChecked] = useState(false);
    const handleLogout = async () => {
        try {
            // Clear user data from AsyncStorage or perform any other necessary cleanup
            //await AsyncStorage.removeItem('token');
            //await AsyncStorage.removeItem('loggedInUser');

            // Przejdź do ekranu "Login" przy użyciu nawigacji prop
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'frame_one' }],
                })
            );
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <View style={styles.div2}>
                    <Icon name="exclamation" size={100} color="#606470" />
                    </View>
                <Text style={styles.tekst1} >Czy na pewno chcesz wylogować się na tym urządzeniu?</Text>
                <Text style={styles.tekst2} >Po wylogowaniu korzystanie z aplikacji KRW nie będzie możliwe - będzie trzeba się ponownie zalogować.</Text>

                <TouchableOpacity
                    style={styles.wyrejestrujBtn}
                    onPress={handleLogout}
                >
                    <Text style={styles.wyrejestrujText}>Wyloguj</Text>
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
        backgroundColor: 'f7f7f7',
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
    tekst1: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000000",
        backgroundColor: '#ffffff',
        textAlign: 'center',
        paddingTop: '10%',
    },
    tekst2: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000000",
        backgroundColor: '#ffffff',
        /*backgroundColor: 'red',*/
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
    wyrejestrujBtn: {
        backgroundColor: "#ff570c",
        borderRadius: 50,
        width: '85%',
        position: "relative",
        justifyContent: 'center',
        alignSelf: 'center',
        height: '12%',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '5%',
    },
    wyrejestrujText: {
        color: "#f7f7f7",
        fontSize: 24,
        fontWeight: "400",
        position: "absolute",
    },
});

export default Edit5;
