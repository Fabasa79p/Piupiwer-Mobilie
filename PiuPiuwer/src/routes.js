import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import singup from './screens/signup';
import profile from './screens/profile';
import login from './screens/login';
import feed from './screens/feed';

const Stack = createStackNavigator();


export default function Routes() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#24384B'
            },
            headerTintColor: '#FFF',
            headerTitleAlign: "center",

        }}>
            <Stack.Screen name="Login" component={login} />
            <Stack.Screen name="Singup" component={singup} />
            <Stack.Screen name="Profile" component={profile} />
            <Stack.Screen name="Feed" component={feed} />
        </ Stack.Navigator>
    );
}