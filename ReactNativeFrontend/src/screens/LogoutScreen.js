import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Button } from 'react-native-paper';
import { removeTokens } from '../security';
import { AuthContext } from '../context';

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
        fontSize: 18
    },
    submitButton: {
        width: 200,
        borderRadius: 30,
        marginBottom: 30,
        marginTop: 20
    }
});

const LogoutScreen = ({navigation}) => {

    const {signOut} = useContext(AuthContext);

    const logOut = async () => {
        await removeTokens(); 
        await signOut();
        // navigation.navigate("Log In");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Are you sure you want to log out?</Text>
            <Button title="logOut" style={styles.submitButton} mode="contained" onPress={logOut}>LOG OUT</Button>
        </View>
    )
};

export default LogoutScreen;