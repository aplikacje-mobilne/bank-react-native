import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Edit3 = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.div}>

                <TouchableOpacity onPress={() => navigation.navigate('Edit6')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>

                            <Text style={styles.text}>Zmiana kodu PIN</Text>
                        </View>
                        <Text style={styles.text2}>Zmiana PIN-u do logowania i potwierdzenia transakcji</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Edit7')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>

                            <Text style={styles.text}>Zmiana hasła do konta</Text>
                        </View>
                        <Text style={styles.text2}>Zmiana hasła do bankowości internetowej KRW</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Edit4')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>
                        
                            <Text style={styles.text}>Biometria - logowanie i autoryzacja</Text>
                        </View>
                        <Text style={styles.text2}>Logowanie i autoryzacja odciskiem palca</Text>
                    </View>
                </TouchableOpacity>
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
        /*        backgroundColor: 'red',*/
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
});

export default Edit3;
