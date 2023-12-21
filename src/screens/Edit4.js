import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-checkbox';
import React, { useState } from 'react';
const Edit4 = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <Text style={styles.tekst1} >Przelewy na telefon</Text>
            </View>
            <View style={styles.div}>
                <View style={styles.pom}>
                    <Text style={styles.tekst1} >Odbieraj przelewy na telefon </Text>
                    <CheckBox
                        checked={isChecked}
                        onChange={() => setChecked(!isChecked)}
                        label="" // Pusty string zamiast etykiety
                        containerStyle={styles.CheckBox} // Nowa stylizacja dla CheckBoxa
                    />
                </View>
                <Text style={styles.tekst2} >Zarejestruj swój numer telefonu w systemie. Nadawca nie musi znać Twojego numeru konta, wystarczy numer telefonu.</Text>
                <Text style={styles.tekst3}> Konto do przelewów na telefon</Text>
            </View>
            <View style={styles.div2}>
                <Text style={styles.tekst4}>KRW KONTO</Text>
                <Text style={styles.tekst4a} >12 1234 1234 1234</Text>
            </View>
            <View style={styles.div3}>
                <Text style={styles.tekst5}>To konto jest przypisane do numeru telefonu +48 123 123 123</Text>
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
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: 'f7f7f7',
        width: '95%',
        marginBottom: '1%',
        marginTop: '1%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    pom: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
    },
    CheckBox: {
        flex: 1,
        alignItems: 'flex-end',
    },
    tekst1: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000000",
        backgroundColor: '#ffffff',
        paddingLeft: '1%',
        padding: '2%',
    },
    tekst2: {
        fontSize: 16,
        fontWeight: "300",
        color: "#000000",
        backgroundColor: '#ffffff',
        /*backgroundColor: 'red',*/
        paddingLeft: '1%',
    },
    tekst3: {
        fontSize: 16,
        fontWeight: "300",
        color: "#000000",
        backgroundColor: '#ffffff',
        paddingTop: '10%',
        paddingLeft: '1%',
    },

    div2: {
        backgroundColor: '#fff2f2',
        borderRadius: 6,
        width: '95%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    tekst4: {
        fontSize: 15,
        fontWeight: "800",
        color: "#000000",
        paddingLeft: '1%',
    },
    tekst4a: {
        fontSize: 15,
        color: "#000000",
        paddingLeft: '1%',
    },
    div3: {
        backgroundColor: '#fff2f2',
        borderRadius: 6,
        width: '95%',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingTop: '2%',
    },
    tekst5: {
        fontSize: 14,
        fontWeight: "300",
        color: "#000000",

        paddingLeft: '1%',
        backgroundColor: '#ffffff',
    },
});

export default Edit4;
