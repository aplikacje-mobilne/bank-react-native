import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Login } from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';
import Edit5 from '../screens/Edit5';
// Import your image here
import Bank from "./bank.png";
import Icon from 'react-native-vector-icons/FontAwesome';
const Frame = () => {
    const navigation = useNavigation();

    const goToFrameTwo = () => {
        navigation.navigate('RegisterScreen');
    };
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerBackTitleVisible: true,
        });
    }, [navigation]);
    const goToFrameThree = () => {
        navigation.navigate('Login');
    };
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
            headerBackTitleVisible: true,
        });
    }, [navigation]);


    return (
        <View style={styles.container}>
            <View style={styles.div}>

                <View style={styles.elipsy}>
                    <View style={styles.ellipse} />
                    <View style={styles.ellipse2} />
                </View>

                <View style={styles.bla1}>

                <Icon name="bank" size={120} color="#323643" />
                    <Text style={styles.tekst1}>POLSKI BANK KRW</Text>
                    <TouchableOpacity style={styles.group} onPress={goToFrameThree}>
                        <View style={styles.overlapGroup}>
                            <Text style={styles.tekst2}>Log IN</Text>
                        </View>
                    </TouchableOpacity>
                <Text style={styles.nieMaszKontaZaJe} onPress={goToFrameTwo}>Don't you have an account? Sign up here</Text>

                </View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    div: {
        backgroundColor: "#f7f7f7",
        height: '100%',
        overflow: "hidden",
        position: "relative",
        width: '100%',
    },
    elipsy: {
        height: 534,
        left: -146,
        position: "absolute",
        top: -152,
        width: 579,
    },
    ellipse: {
        backgroundColor: "#ff570c",
        borderRadius: 118,
        height: 236,
        left: 393,
        position: "absolute",
        top: 175,
        width: 236,
    },
    ellipse2: {
        backgroundColor: "#323643",
        borderBottomRightRadius: 390,
        borderBottomLeftRadius: 460,
        height: 332,
        left: 0,
        position: "absolute",
        top: 0,
        width: '100%',
    },
    bla1: {
        flex: 1, 
        justifyContent: 'center',  
        alignItems: 'center',
    },
    tekst1: {
        marginTop: 20,
        fontSize: 32,
        color: '#323643',
        fontWeight: 'bold',
        paddingBottom: '5%',
    },
    group: {
        backgroundColor: '#ff570c',
        paddingVertical: 10,
        width: '85%',
        borderRadius: 50,
    },
    overlapGroup: {
        alignItems: 'center',
    },
    tekst2: {
        color: '#fff',
        fontSize: 24,
    },
    nieMaszKontaZaJe: {
        marginTop: 20,
        color: '#323643',
        textDecorationLine: 'underline',
        fontSize: 20,
        fontWeight: '600',
    },
});
export default Frame;
