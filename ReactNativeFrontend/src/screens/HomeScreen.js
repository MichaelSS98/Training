import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    header: {
        textAlign: "center",
        marginTop: 20,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 18,
        color: "blueviolet"
    }
});

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Hi from home!</Text>
        </View>
    );
};

export default HomeScreen;