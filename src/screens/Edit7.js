import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, TextInput, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_CONFIG from '../components/config'; // Import API_CONFIG

const Edit7 = ({ navigation, setIsLoggedIn }) => {
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
                Alert.alert("Error", "New passwords do not match");
                return;
            }

            // Check if the old password matches the stored old password
            if (loggedInUser && oldPass !== loggedInUser.pass) {
                Alert.alert("Error", "Old password is incorrect");
                return;
            }

            // Find the user in the JSON file based on the login
            const response = await axios.get(`${API_CONFIG.BASE_URL}/users`);
            const users = response.data || [];
            const userToUpdate = users.find((user) => user.login === loggedInUser.login);

            if (userToUpdate) {
                // Update the user's password in the JSON file
                userToUpdate.pass = pass;

                // Update the JSON file with the modified user data
                await axios.put(`${API_CONFIG.BASE_URL}/users/${userToUpdate.id}`, userToUpdate);

                Alert.alert("Success", "Password changed successfully, please log in again");
                setIsLoggedIn(false);
            } else {
                Alert.alert("Error", "Unable to locate the user in the database");
            }
        } catch (error) {
            console.error("Error changing password:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <View style={styles.inputs}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Enter old password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Old password"
                            placeholderTextColor="#808080"
                            secureTextEntry
                            value={oldPass}
                            onChangeText={(text) => setOldPass(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Enter new password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="New password"
                            placeholderTextColor="#808080"
                            secureTextEntry
                            value={pass}
                            onChangeText={(text) => setPass(text)}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Confirm new password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Repeat password"
                            placeholderTextColor="#808080"
                            secureTextEntry
                            value={pass2}
                            onChangeText={(text) => setPass2(text)}
                        />
                    </View>
                </View>
                <Pressable style={styles.confirmBtn} onPress={changePass}>
                    <Text style={styles.confirmText}>Confirm</Text>
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
    inputs: {
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
    confirmBtn: {
        backgroundColor: "#ff570c",
        borderRadius: 50,
        width: '90%',
        position: "relative",
        justifyContent: 'center',
        alignSelf: 'center',
        height: '8%',
        alignItems: 'center',
    },
    confirmText: {
        color: "#f7f7f7",
        fontSize: 24,
        fontWeight: "400",
        position: "absolute",
    },
    text: {
        fontSize: 20,
        color: "#000000",
    },
    inputContainer: {
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
