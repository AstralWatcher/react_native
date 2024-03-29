import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        color: '#512DA8',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export const Loading = () => {
    return(
        <View style={styles.loadingText}>
            <ActivityIndicator size="large" color="#512DA8"></ActivityIndicator>
            <Text style={styles.loadingText}>Loading...</Text>
        </View>
    );
}
