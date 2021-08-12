import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text} from 'react-native';
import LogIn from '../screens/LoginScreen';
import Register from '../screens/RegisterScreen';

const AuthNavigator = () => {

    const AuthStack = createStackNavigator();

    return (
        <AuthStack.Navigator initialRouteName="LogIn">
            <AuthStack.Screen name="LogIn" component={LogIn}></AuthStack.Screen>
            <AuthStack.Screen name="Register" component={Register}></AuthStack.Screen>
        </AuthStack.Navigator>
    )
};

export default AuthNavigator;