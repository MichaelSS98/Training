import React, {useMemo, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import EmployeesScreen from '../screens/EmployeesScreen';
import HomeScreen from '../screens/HomeScreen';
import ProjectsScreen from '../screens/ProjectsScreen';
import LogInScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LogoutScreen from '../screens/LogoutScreen';
import { retrieveAccessToken } from '../security';
import { AuthContext } from '../context';

const DrawerNavigator = () => {

    const [token, setToken] = useState(null);
    const Drawer = createDrawerNavigator();

    const authContext = useMemo(() => {
        return {
            signIn: async () => {
                const token = await retrieveAccessToken();
                setToken(token);
            },
            signOut: async () => {
                setToken(null);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={authContext}>
            {token ? 
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={HomeScreen}></Drawer.Screen>
                    <Drawer.Screen name="Employees Section" component={EmployeesScreen}></Drawer.Screen>
                    <Drawer.Screen name="Projects Section" component={ProjectsScreen}></Drawer.Screen>
                    <Drawer.Screen name="Log Out" component={LogoutScreen}></Drawer.Screen>
                </Drawer.Navigator> :
                <Drawer.Navigator>
                    <Drawer.Screen name="Log In" component={LogInScreen}></Drawer.Screen>
                    <Drawer.Screen name="Register" component={RegisterScreen}></Drawer.Screen>
                </Drawer.Navigator> 
            }
        </AuthContext.Provider>
    )
};

export default DrawerNavigator;