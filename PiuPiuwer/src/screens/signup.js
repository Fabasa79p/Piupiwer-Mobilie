import React from 'react';
import { Text, Button, View } from 'react-native';

// import { Container } from './styles';

export default function signup({ navigation }) {
    function navigateToProfile() {
        navigation.navigate('Profile');
    }

    return (
        <View>
            <Text > Singup </Text>
            <Button title='Go to Profile' onPress={navigateToProfile} />
        </View>
    );
}
