import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { signIn } from '../api/users'


export default function signup({ navigation }) {
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobreome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [sobre, setSobre] = useState('');
    let [foto, setFoto] = useState({ uri: null });

    const options = {
        title: 'Selecionar foto',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    const selectPhoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                setFoto({ uri: 'data:image/jpeg;base64,' + response.data });


            }
        });
    }




    function navigateToLogin() {
        navigation.navigate('Login');
    }
    return <LinearGradient style={{ flex: 1 }} colors={['#ffffff', 'hsla(207, 55%, 62%, 0.15)', 'hsla(207, 55%, 62%, 0.3)']} >
        <View style={styles.headerStyle}>
            <Image style={styles.logoStyle} source={require('./img/logo.png')} />
            <Text style={styles.textStyle}>PiuPiuwer</Text>
        </View>
        <ScrollView>


            <View>
                <View style={styles.formArea}>
                    <Text style={styles.containerText}>*Usuário:</Text>
                    <TextInput style={styles.containerText} placeholder="Digite seu usuário" value={usuario} onChangeText={Usuario => setUsuario(Usuario)} />
                </View>
                <View style={styles.formArea}>
                    <Text style={styles.containerText}>*Nome:</Text>
                    <TextInput style={styles.containerText} placeholder="Digite seu Nome" value={nome} onChangeText={Nome => setNome(Nome)} />
                </View>
                <View style={styles.formArea}>
                    <Text style={styles.containerText}>*Sobrenome:</Text>
                    <TextInput style={styles.containerText} placeholder="Digite seu Nome" value={sobrenome} onChangeText={Sobrenome => setSobreome(Sobrenome)} />
                </View>
                <View style={styles.formArea}>
                    <Text style={styles.containerText}>*E-mail:</Text>
                    <TextInput style={styles.containerText} placeholder="Digite seu e-mail" value={email} onChangeText={Email => setEmail(Email)} />
                </View>
                <View style={styles.formArea}>
                    <Text style={styles.containerText}>*Senha:</Text>
                    <TextInput secureTextEntry={true} style={styles.containerText} placeholder="Digite sua senha" value={senha} onChangeText={Senha => setSenha(Senha)} />
                </View>
                <View style={styles.formArea}>
                    <Text style={styles.containerText}>Sobre:</Text>
                    <TextInput style={styles.containerText} placeholder="Fale um pouco sobre você" value={sobre} onChangeText={Sobre => setSobre(Sobre)} />
                </View>
                <View style={styles.photoArea} >
                    <Text style={styles.containerText}>Foto de perfil:</Text>
                    <TouchableOpacity style={styles.photoBtn} onPress={() => { setFoto(selectPhoto()) }}><Text>Selecionar</Text>
                    </TouchableOpacity>
                    {/* <TextInput style={styles.containerText} placeholder="Teste" /> */}
                    {/* <TouchableOpacity style={styles.photoBtn}>
                        <Text>Escolher foto</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

            {/* onPress={navigateToLogin} */}
            <View>
                <TouchableOpacity style={styles.loginButton}>
                    <Text style={styles.loginText} onPress={() => { signIn(usuario, nome, sobrenome, email, senha, sobre, foto.uri, { navigation }) }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </LinearGradient >
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
    photoArea: {
        marginBottom: 30,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'stretch'
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
        marginVertical: 50,
    },
    loginText: {
        color: 'white',
        fontSize: 20,
    },

    photoBtn: {
        margin: 10,
        // marginRight: 250,
        backgroundColor: 'hsla(207, 60%, 44%, 0.5)',
        // alignContent: 'flex-end',
        paddingVertical: 5,
    },
    warningText: {
        color: '#F32013',

    }

})
