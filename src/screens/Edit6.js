import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Edit6 = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.div}>
                
                <TouchableOpacity onPress={() => navigation.navigate('Edit2')}>
                    <View style={styles.wiersz1b}>
                    <View style={styles.wiersz1}>
                            <Text style={styles.text}>Obecny kod</Text>
                    </View>
                        <Text style={styles.text2}>Twoje dane, powiadomienia w aplikacji</Text>
                    </View>
                    </TouchableOpacity>
                    

                <TouchableOpacity onPress={() => navigation.navigate('Edit3')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>
                            <Icon name="lock" size={30} marginLeft={10} color="black" />
                            <Text style={styles.text}>Bezpieczeństwo i dostępy</Text>
                        </View>
                        <Text style={styles.text2}>Logowanie, biometria, narzędzia autoryzacji, PIN do aplikacji</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Edit4')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>
                            <Icon name="money" size={30} marginLeft={10} marginTop={'1%'} color="black" />
                            <Text style={styles.text}>Płatności</Text>
                        </View>
                        <Text style={styles.text2}>Ustawienia płatności</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Edit5')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>
                            <Icon name="power-off" size={30} marginLeft={10} color="black" />
                            <Text style={styles.text}>Wyrejestruj aplikację</Text>
                        </View>
                        <Text style={styles.text2}>Gdy zmieniasz numer telefonu lub urządzenie</Text>
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
        marginLeft: 10, // Dodaj margines, aby oddzielić ikonę od tekstu
        alignItems: 'center',
    },
    text2: {
        fontSize: 15,
        paddingLeft: '11%', // Dodaj margines, aby oddzielić ikonę od tekstu
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
        justifyContent: 'center',
    },
    wiersz1b: {
        backgroundColor: '#ffffff',
        marginTop: '5%',
        borderRadius: 6,
        marginLeft: '1%',
        marginRight: '1%',
    },
});

export default Edit6;
