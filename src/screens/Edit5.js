import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useState } from 'react';
const Edit4 = ({ navigation }) => {
    const [isChecked, setChecked] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <View style={styles.div2}>
                    <Icon name="exclamation" size={100} color="#606470" />
                    </View>
                <Text style={styles.tekst1} >Czy na pewno chcesz wyrejestrować aplikację na tym urządzeniu?</Text>
                <Text style={styles.tekst2} >Po wyrejestrowaniu korzystanie z aplikacji KRW nie będzie możliwe - będzie trzeba ją ponownie zarejestrować i aktywnować.</Text>

                <TouchableOpacity
                    style={styles.wyrejestrujBtn}
                    onPress={() => {
                        console.log("Navigating to frame_one");
                        navigation.navigate('DrawerNavigator', { screen: 'frame_one' });
                    }}
                >
                    <Text style={styles.wyrejestrujText}>Wyrejestruj KRW</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'f7f7f7',
    },
    div: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        backgroundColor: '#ffffff',
        width: '95%',
        marginBottom: '1%',
        marginTop: '1%',
        alignSelf: 'center',
        paddingTop: '10%',
    },
    tekst1: {
        fontSize: 18,
        fontWeight: "500",
        color: "#000000",
        backgroundColor: '#ffffff',
        textAlign: 'center',
        paddingTop: '10%',
    },
    tekst2: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000000",
        backgroundColor: '#ffffff',
        /*backgroundColor: 'red',*/
        textAlign: 'center',
        paddingTop: '5%',
    },
    div2: {
        borderWidth: 1,
        borderColor: '#000000',
        height: 112,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: 112,
    },
    wyrejestrujBtn: {
        backgroundColor: "#ff570c",
        borderRadius: 50,
        width: '85%',
        position: "relative",
        justifyContent: 'center',
        alignSelf: 'center',
        height: '12%',
        alignItems: 'center',
        marginTop: '10%',
        marginBottom: '5%',
    },
    wyrejestrujText: {
        color: "#f7f7f7",
        fontSize: 24,
        fontWeight: "400",
        position: "absolute",
    },
});

export default Edit4;
