import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EmployeesScreen from '../screens/EmployeesScreen';
import ProjectsScreen from '../screens/ProjectsScreen';

const HomeNavigator = () => {

    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator initialRouteName="Home">
            <HomeStack.Screen name="Home" component={HomeScreen}></HomeStack.Screen>
            <HomeStack.Screen name="Employees" component={EmployeesScreen}></HomeStack.Screen>
            <HomeStack.Screen name="Projects" component={ProjectsScreen}></HomeStack.Screen>
        </HomeStack.Navigator>
    )
};

export default HomeNavigator;