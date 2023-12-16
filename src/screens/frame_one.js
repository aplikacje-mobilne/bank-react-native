import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Login } from '../screens/Login';
import RegisterScreen from '../screens/RegisterScreen';

// Import your image here
import Bank from "./bank.png";

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
        <View style={styles.frame}>
            <View style={styles.div}>
                <TouchableOpacity style={styles.group} onPress={goToFrameThree}>
                    <View style={styles.overlapGroup}>
                        <Text style={styles.textWrapper}>Zaloguj się</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.overlap}>
                    <View style={styles.ellipse} />
                    <View style={styles.ellipse2} />
                    <Image style={styles.bankInstance} source={Bank} />
                </View>
                <Text style={styles.textWrapper2}>POLSKI BANK KRW</Text>
                <Text style={styles.nieMaszKontaZaJe} onPress={goToFrameTwo}>Nie masz konta? Załóż je tutaj</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    frame: {
        backgroundColor: "#f7f7f7",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        flex: 1,
    },
    div: {
        backgroundColor: "#f7f7f7",
        height: '100%',
        overflow: "hidden",
        position: "relative",
        width: '100%',
    },
    group: {
        height: 65,
        position: "absolute",
        top: 556,
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: 'center',
    },
    overlapGroup: {
        backgroundColor: "#ff570c",
        borderRadius: 50,
        height: 65,
        position: "relative",
        width: 337,
    },
    textWrapper: {
        color: "#f7f7f7",
        fontSize: 24,
        fontWeight: "400",
        left: 109,
        letterSpacing: 0,
        lineHeight: 28,
        position: "absolute",
        top: 15,
    },
    overlap: {
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
    bankInstance: {
        height: 139,
        left: "50%",
        position: "absolute",
        top: 395,

    },
    textWrapper2: {
        color: "#323643",
        fontSize: 32,
        fontWeight: "500",
        justifyContent: "center",
        alignItems: 'center',
        letterSpacing: 0,
        lineHeight: 40,
        textAlign: "center",
        top: 410,
    },
    nieMaszKontaZaJe: {
        color: "#323643",
        fontSize: 20,
        fontWeight: "500",
        letterSpacing: 0,
        textAlign: "center",
        justifyContent: "center",
        alignItems: 'center',
        top: 456,
    },
});

export default Frame;
