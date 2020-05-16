import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import signup from './screens/signup';
import profile from './screens/profile';
import login from './screens/login';
import feed from './screens/feed';
import ownProfile from './screens/ownprofile';
import searchArea from './screens/searchArea';

const Stack = createStackNavigator();


export default function Routes() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: 'hsla(207, 60%, 44%, 0.85)'
            },
            headerTintColor: '#FFF',
            headerTitleAlign: "center",

        }}>
            <Stack.Screen name="Login" component={login} />
            <Stack.Screen name="Signup" component={signup} />
            <Stack.Screen name="Profile" component={profile} />
            <Stack.Screen name="Search" component={searchArea} />
            <Stack.Screen name="OwnProfile" component={ownProfile} options={{ title: 'Perfil' }} />
            <Stack.Screen name="Feed" component={feed} />
        </ Stack.Navigator>
    );
}