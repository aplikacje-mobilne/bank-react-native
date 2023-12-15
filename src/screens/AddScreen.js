import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";

const AddScreen = ({ onAdd }) => {
    const [itemName, setItemName] = useState('');
    const [quantity, setQuantity] = useState('');
    const navigation = useNavigation();
    const handleAddItem = async () => {
        try {
            await axios.post('http://192.168.1.102:3001/items', {
                name: itemName,
                quantity: parseInt(quantity, 10),
            });

            onAdd?.();

            setItemName('');
            setQuantity('');
            navigation.navigate('ListScreen');
                
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    return (
        <View>
            <Text>Add Item:</Text>
            <TextInput
                placeholder="Item Name"
                value={itemName}
                onChangeText={setItemName}
            />
            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />
            <Button title="Add" onPress={handleAddItem} />
        </View>
        );
};

export default AddScreen;
