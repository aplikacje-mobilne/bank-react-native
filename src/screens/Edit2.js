import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Portret from "./zdj.png";
const Edit2 = ({ navigation }) => {
    const [userData, setUserData] = useState(null);

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
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <View style={styles.wiersz2b}>
                    <View style={styles.wiersz2}>
                        <Image style={styles.zdj} source={Portret} />
                    </View>
                    <Icon name="camera" size={60}></Icon>
                </View>

                <View style={styles.wiersz1b}>
                    <View style={styles.wiersz1}>
                        <Text style={styles.text2}>Imię i nazwisko</Text>
                    </View>
                    <Text style={styles.text}>{userData ? `${userData.name} ${userData.surname}` : ''}</Text>
                </View>

                <View style={styles.wiersz1b}>
                    <View style={styles.wiersz1}>
                        <Text style={styles.text2}>Adres e-mail</Text>
                    </View>
                    <Text style={styles.text}>{userData ? userData.email : ''}</Text>
                </View>

                <View style={styles.wiersz1b}>
                    <View style={styles.wiersz1}>
                        <Text style={styles.text2}>Główny telefon komórkowy</Text>
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
        fontSize: 20,
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
        backgroundColor: 'f7f7f7',
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

    },
    wiersz2b: {
        backgroundColor: '#323643',
        borderRadius: 6,
        marginLeft: '1%',
        marginRight: '1%',
        flexDirection: 'row',
        height: '50%',
        justifyContent: 'flex-start',
        alignItems:'center',
    },
    zdj: {

        objectFit: 'scale-down',
        height: '80%',

    },
});

export default Edit2;
