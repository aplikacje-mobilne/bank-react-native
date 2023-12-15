import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EditScreen = ({ route, navigation }) => {
    const { itemId, onEdit } = route.params;
    const [item, setItem] = useState({});
    const [editedName, setEditedName] = useState('');
    const [editedQuantity, setEditedQuantity] = useState('');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axios.get(`http://192.168.1.102:3001/items/${itemId}`);
                setItem(response.data || {});
                setEditedName(response.data?.name || ''); 
                setEditedQuantity(response.data?.quantity?.toString() || ''); 
            } catch (error) {
                console.error('Error fetching item for editing:', error);
            }
        };

        fetchItem();
        }, [itemId]);

    const handleEditItem = async () => {
        try {
            const response = await axios.put(`http://192.168.1.102:3001/items/${itemId}`, {
                name: editedName || item.name,
                quantity: editedQuantity || item.quantity,
            });

            console.log('Item edited successfully:', response.data);

           
            onEdit?.();

           
            navigation.goBack();
        } catch (error) {
            console.error('Error editing item:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Item</Text>
            <TextInput
                style={styles.input}
                placeholder="Edit Name"
                value={editedName}
                onChangeText={setEditedName}
            />
            <TextInput
                style={styles.input}
                placeholder="Edit Quantity"
                value={editedQuantity}
                onChangeText={setEditedQuantity}
                keyboardType="numeric"
            />
            <Button title="Save Changes" onPress={handleEditItem} />
        </View>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
});

export default EditScreen;
