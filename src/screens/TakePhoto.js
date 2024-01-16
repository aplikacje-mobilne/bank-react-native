import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PhotoDisplay from "./PhotoDisplay";
import AsyncStorage from '@react-native-async-storage/async-storage';
import db from "../screens/db";

export default function TakePhoto({ navigation }) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef();
    const [userData, setUserData] = useState(null);
    const [updatedUsers, setUpdatedUsers] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
        })();
    }, []);

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

    const takePicture = async () => {
        try {
            const photo = await cameraRef.current.takePictureAsync();
            const fileName = 'capturedPhoto.jpg';
            const destination = `${FileSystem.documentDirectory}${fileName}`;

            try {
                await FileSystem.moveAsync({
                    from: photo.uri,
                    to: destination,
                });

                const userId = userData ? userData.id : null;

                // Save the captured photo URI in AsyncStorage
                await AsyncStorage.setItem(`capturedPhotoUri_${userId}`, destination);

                // Update the user's data in db.json with the photoUri
                const userWithUpdatedPhoto = { ...userData, photoUri: destination };

                // Update the local state with the updated user
                setUserData(userWithUpdatedPhoto);

                // Fetch the existing users from AsyncStorage
                const existingUsersJson = await AsyncStorage.getItem('users');
                const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];

                // Update the users array with the updated user
                const updatedUsers = existingUsers.map(user => (user.id === userId ? userWithUpdatedPhoto : user));

                // Save the updated users array to AsyncStorage
                await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

                // Update the state with the latest updatedUsers
                setUpdatedUsers(updatedUsers);

                console.log('Saved photo:', destination);
                navigation.navigate("Edit2", {
                    capturedPhotoUri: destination
                });
            } catch (error) {
                console.error('Error saving photo:', error);
            }
        } catch (error) {
            console.error('Error taking picture:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ref={cameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 20,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
});