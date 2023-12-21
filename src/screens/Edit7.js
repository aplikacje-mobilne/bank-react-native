import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Edit7 = ({ navigation }) => {
    const [oldPass, setOldPass] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        // Fetch the logged-in user from AsyncStorage
        const fetchLoggedInUser = async () => {
            try {
                const userJson = await AsyncStorage.getItem('loggedInUser');
                if (userJson) {
                    const user = JSON.parse(userJson);
                    setLoggedInUser(user);
                }
            } catch (error) {
                console.error("Error fetching logged-in user:", error);
            }
        };
        fetchLoggedInUser();
    }, []);

    const changePass = async () => {
        try {
            if (pass !== pass2) {
                Alert.alert("Błąd", "Nowe hasła nie są identyczne");
                return;
            }

            // Check if old password matches the stored old password
            if (loggedInUser && oldPass !== loggedInUser.pass) {
                Alert.alert("Błąd", "Stare hasło nie jest poprawne");
                return;
            }

            // Find the user in the JSON file based on the login
            const response = await axios.get("http://192.168.0.144:3001/users");
            const users = response.data || [];
            const userToUpdate = users.find((user) => user.login === loggedInUser.login);

            if (userToUpdate) {
                // Update the user's password in the JSON file
                userToUpdate.pass = pass;

                // Update the JSON file with the modified user data
                await axios.put(`http://192.168.0.144:3001/users/${userToUpdate.id}`, userToUpdate);

                Alert.alert("Sukces", "Hasło zostało zmienione pomyślnie");
                navigation.goBack();
            } else {
                Alert.alert("Błąd", "Nie można odnaleźć użytkownika w bazie danych");
            }
        } catch (error) {
            console.error("Błąd podczas zmiany hasła:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.div}>
            <View style={styles.inputy}>
                <View style={styles.inputy1}>
                <Text style={styles.tekst1}>Podaj stare hasło</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Stare hasło"
                    placeholderTextColor="#808080"
                    value={oldPass}
                    onChangeText={(text) => setOldPass(text)}
                    />
                    </View>
                    <View style={styles.inputy1}>
                <Text style={styles.tekst1}>Podaj nowe hasło</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nowe hasło"
                    placeholderTextColor="#808080"
                    secureTextEntry
                    value={pass}
                    onChangeText={(text) => setPass(text)}
                    />
                </View>
                <View style={styles.inputy1}>
                <Text style={styles.tekst1}>Potwierdź nowe hasło</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Powtórz hasło"
                    placeholderTextColor="#808080"
                    secureTextEntry
                    value={pass2}
                    onChangeText={(text) => setPass2(text)}
                />
                </View>
            </View>
            <Pressable style={styles.potBtn} onPress={changePass}>
                <Text style={styles.potText}>Potwierdź</Text>
            </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
    },
    inputy: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '85%',
        marginTop: '10%',
    },
    input: {
        backgroundColor: "#fefefe",
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 10,
        height: 40,
        overflow: "hidden",
        position: "relative",
        marginVertical: 10,
        paddingLeft: 10,

    },
    potBtn: {
        backgroundColor: "#ff570c",
        borderRadius: 50,
        width: '90%',
        position: "relative",
        justifyContent: 'center',
        alignSelf: 'center',
        height: '8%',
        alignItems: 'center',

    },
    potText: {
        color: "#f7f7f7",
        fontSize: 24,
        fontWeight: "400",
        position: "absolute",
    },
    tekst1: {
        fontSize: 20,
        color: "#000000",
    },
    inputy1: {
        marginBottom: '5%',
    },
    div: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        marginTop: '5%',
        borderRadius: 6,
        marginLeft: '1%',
        marginRight: '1%',
    },
});

export default Edit7;
