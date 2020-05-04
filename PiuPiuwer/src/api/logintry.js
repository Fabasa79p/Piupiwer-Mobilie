import React from 'react';
import { Alert } from 'react-native';
import jwt from "react-native-pure-jwt";
import AsyncStorage from '@react-native-community/async-storage'

function hasError(data) {
    return !Object.keys(data).includes('token');
}

export async function LogIn(user, senha, {navigation} ) {
    function navigateToFeed() {
        navigation.navigate('Feed');
    }
    console.log("Oi")
    try {
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/login/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': user,
                    'password': senha,
                }),
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();

        // Imprime os dados obtidos:
        console.log(data);

        if (!hasError(data)) {
            storeData(data.token)
            navigateToFeed()
            // teste
            // jwt.decode(
            //     data.token, // the token
            //     secret, // the secret
            //     {
            //     skipValidation: true // to skip signature and exp verification
            //     }
            // )
            // .then((result)=>console.log(result)) // already an object. read below, exp key note
            // .catch(console.error);
        }

        if (hasError(data)){
            if(Object.keys(data).includes('password')){
                Alert.alert("O campo de senha não pode ficar em branco")
            }
            if(Object.keys(data).includes('username')){
                Alert.alert("O campo de usuário não pode ficar em branco")
            }
            if(Object.keys(data).includes('global')){
                Alert.alert("Impossível fazer login com as credenciais fornecidas")
            }
            if (!Object.keys(data).includes('global') && !Object.keys(data).includes('username') && !Object.keys(data).includes('password')){
                Alert.alert("Ocorreu um erro! Tente novamente")
            }
        }

    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
    }
}

const storeData = async (LoginToken) => {
    try {
      await AsyncStorage.setItem('token', LoginToken)
      console.log("foiiiiiii")
    } catch (e) {
      // saving error
    }
}