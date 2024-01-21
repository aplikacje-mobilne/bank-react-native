import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

const EditDataPersonalization = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [capturedPhotoUri, setCapturedPhotoUri] = useState(null);
    const route = useRoute();

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

    useEffect(() => {
        if (route.params && route.params.capturedPhotoUri) {
            console.log('Captured Photo URI from route:', route.params.capturedPhotoUri);
            setCapturedPhotoUri(route.params.capturedPhotoUri);
        }
    }, [route.params]);

    useEffect(() => {
        const fetchCapturedPhotoUri = async () => {
            try {
                const userId = userData ? userData.id : null;
                const uri = await AsyncStorage.getItem(`capturedPhotoUri_${userId}`);
                if (uri) {
                    setCapturedPhotoUri(uri);
                }
            } catch (error) {
                console.error('Error fetching captured photo URI:', error);
            }
        };

        fetchCapturedPhotoUri();
    }, [userData]);

    const openCamera = () => {
        navigation.navigate('TakePhoto');
    };

    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <View style={styles.wiersz2b}>
                    {capturedPhotoUri && (
                        <Image
                            source={{ uri: capturedPhotoUri }}
                            style={styles.previewImage}
                            width={200}
                            height={200}
                        />
                    )}
                    <TouchableOpacity
                        style={styles.wiersz2b}
                        onPress={() => navigation.navigate('TakePhoto')}
                    >
                        <Icon name="camera" size={60} color="#fff" style={styles.cameraIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.wiersz1b}>
                    <View style={styles.wiersz1}>
                        <Text style={styles.text2}>Full Name</Text>
                    </View>
                    <Text style={styles.text}>{userData ? `${userData.name} ${userData.surname}` : ''}</Text>
                </View>

                <View style={styles.wiersz1b}>
                    <View style={styles.wiersz1}>
                        <Text style={styles.text2}>Email Address</Text>
                    </View>
                    <Text style={styles.text}>{userData ? userData.email : ''}</Text>
                </View>

                <View style={styles.wiersz1b}>
                    <View style={styles.wiersz1}>
                        <Text style={styles.text2}>Primary Mobile Phone</Text>
                    </View>
                    <Text style={styles.text}>{userData ? userData.phoneNumber : ''}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: '2%',
    },
    text2: {
        fontSize: 15,
        marginLeft: '2%',
    },
    div: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#f7f7f7',
        width: '100%',
    },
    wiersz1: {
        flexDirection: 'row',
        width: '100%',
    },
    wiersz1b: {
        backgroundColor: '#ffffff',
        marginTop: '5%',
        borderRadius: 6,
        marginLeft: '1%',
        marginRight: '1%',
    },
    wiersz2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    wiersz2b: {
        backgroundColor: '#323643',
        borderRadius: 6,
        marginLeft: '1%',
        marginRight: '1%',
        flexDirection: 'row',
        height: '50%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    previewImage: {
        objectFit: 'scale-down',
    },
});

export default EditDataPersonalization;
