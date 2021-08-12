import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {Text} from 'react-native'
import AuthNavigator from './AuthNavigator'
import HomeNavigator from './HomeNavigator'
import DrawerNavigator from './DrawerNavigator'

const AppNavContainer = () => {
    
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
};

export default AppNavContainer;