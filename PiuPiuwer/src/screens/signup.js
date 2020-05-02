import React from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

export default function signup({ navigation }) {
    function navigateToLogin() {
        navigation.navigate('Login');
    }
    return <LinearGradient style={{flex:1}} colors={['#ffffff', 'hsla(207, 55%, 62%, 0.15)', 'hsla(207, 55%, 62%, 0.3)']} >
        <View style={styles.headerStyle}>
            <Image style={styles.logoStyle} source={require('./img/logo.png')} />
            <Text style={styles.textStyle}>PiuPiuwer</Text>
        </View>
        <ScrollView>

       
        <View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>*Nome:</Text>
                <TextInput style={styles.containerText} placeholder="Digite seu Nome" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>*Sobrenome:</Text>
                <TextInput style={styles.containerText} placeholder="Digite seu Nome" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>*Usuário:</Text>
                <TextInput style={styles.containerText} placeholder="Digite seu usuário" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>*E-mail:</Text>
                <TextInput style={styles.containerText} placeholder="Digite seu e-mail" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>*Senha:</Text>
                <TextInput secureTextEntry={true} style={styles.containerText} placeholder="Digite sua senha" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>Sobre:</Text>
                <TextInput style={styles.containerText} placeholder="Fale um pouco sobre você" />
            </View>
            <View style={styles.formArea}>
                <Text style={styles.containerText}>Foto de perfil:</Text>
                <TouchableOpacity style={styles.photoBtn}>
                    <Text>Escolher foto</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText} onPress={navigateToLogin}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </LinearGradient>
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
        paddingVertical: 15,
        marginHorizontal: 120,
        borderRadius: 70,
        marginVertical:50,
    },
    loginText: {
        color: 'white',
        fontSize: 20,
    },

    photoBtn:{
        margin: 10,
        marginRight:250,
        backgroundColor: 'hsla(207, 60%, 44%, 0.5)',
        alignItems: 'center',
        paddingVertical: 5,
    }

})
