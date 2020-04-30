import React from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity } from 'react-native';

export default function signup({ navigation }) {
    function navigateToLogin() {
        navigation.navigate('Login');
    }
    return <View>
        <View style={styles.headerStyle}>
            <Image style={styles.logoStyle} source={require('./img/logo.png')} />
            <Text style={styles.textStyle}>PiuPiuwer</Text>
        </View>
        <View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>Nome:</Text>
                <TextInput style={styles.containerText} placeholder="Digite seu Nome" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>Usuário:</Text>
                <TextInput style={styles.containerText} placeholder="Digite seu usuário" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>E-mail:</Text>
                <TextInput style={styles.containerText} placeholder="Digite seu e-mail" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>Senha:</Text>
                <TextInput secureTextEntry={true} style={styles.containerText} placeholder="Digite sua senha" />
            </View>
        </View>
        <View>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText} onPress={navigateToLogin}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    </View>
};

const styles = StyleSheet.create({
    headerStyle: {
        height: 50,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        margin: 20,
    },

    logoStyle: {
        height: 40,
        width: 50,
        resizeMode: 'cover',

    },

    textStyle: {
        fontSize: 30,
        color: 'hsla(207, 60%, 44%, 0.85)',
    },

    formArea: {
        marginBottom: 10,
        marginLeft: 20
    },
    containerText: {
        fontSize: 25,
    },
    loginButton: {
        margin: 10,
        backgroundColor: 'hsla(207, 60%, 44%, 0.85)',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 100,
        borderRadius: 50
    },
    loginText: {
        color: 'white',
        fontSize: 20,
    },

})
