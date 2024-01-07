import { View, StyleSheet, Image, Text } from 'react-native'
import React from 'react'

export default function PhotoDisplay({ route }) {
    const { capturedPhotoUri } = route.params;
    return (
        <View style={styles.previewContainer}>
            <Image source={{ uri: capturedPhotoUri }} style={styles.previewImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    previewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewImage: {
        width: '20%',
        height: '20%',
    },
});