import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Edit = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.div}>

                <TouchableOpacity onPress={() => navigation.navigate('Edit2')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>
                            <Icon name="user" size={30} marginLeft={10} color="black" />
                            <Text style={styles.text}>Data and Personalization</Text>
                        </View>
                        <Text style={styles.text2}>Your data, in-app notifications</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Edit3')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>
                            <Icon name="lock" size={30} marginLeft={10} color="black" />
                            <Text style={styles.text}>Security and Access</Text>
                        </View>
                        <Text style={styles.text2}>Login, biometrics, authorization tools, app PIN</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Edit4')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>
                            <Icon name="money" size={30} marginLeft={10} marginTop={'1%'} color="black" />
                            <Text style={styles.text}>Payments</Text>
                        </View>
                        <Text style={styles.text2}>Payment settings</Text>
                    </View>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => navigation.navigate('Edit5')}>
                    <View style={styles.wiersz1b}>
                        <View style={styles.wiersz1}>
                            <Icon name="power-off" size={30} marginLeft={10} color="black" />
                            <Text style={styles.text}>Log out of the application</Text>
                        </View>
                        <Text style={styles.text2}>When changing your phone number or device</Text>
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
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    text2: {
        fontSize: 15,
        paddingLeft: '11%',
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
});

export default Edit;
