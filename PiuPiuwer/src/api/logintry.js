import React from 'react';
import { Alert } from 'react-native';
import jwt from "react-native-pure-jwt";
import AsyncStorage from '@react-native-community/async-storage'

function hasError(data) {
    return !Object.keys(data).includes('token');
}

//guarda token
const storeToken = async (LoginToken) => {
    try {
      await AsyncStorage.setItem('token', LoginToken)
      console.log("Guardou token")
    } catch (e) {
      // saving error
    }
}

//guarda user
const storeUser = async (LoggedUser) => {
    try {
      await AsyncStorage.setItem('usuarioLogado', LoggedUser)
      console.log("Guardou usuario")
    } catch (e) {
      // saving error
    }
}

//---verificação das variaveis guardadas
// const retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('usuarioLogado');
//       if (value !== null) {
//         // We have data!!
//         console.log(value);
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
//   };

//GET para pegar o username
async function getUser(user){
    var linkAPI = 'http://piupiuwer.polijr.com.br/usuarios/?search='
    var userProcurado = user
    var link = linkAPI.concat(userProcurado)
    console.log(link)
    try {
        let response = await fetch(
            link,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );
        // Decodifica os dados para o formato json:
        let dados = await response.json();

        // Imprime os dados obtidos:
        console.log(dados);
        storeUser(dados[0].username)

    }catch (error) {
            // Caso haja algum erro, imprima-o e retorne o erro:
            console.error(error);
    }
}

// valida o login ou não
export async function LogIn(user, senha, {navigation} ) {
    function navigateToFeed() {
        navigation.navigate('Feed');
    }
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

        //se não tem erro chama a funcao que guarda o usuario, guarda o token e faz a navergação pro feed
        if (!hasError(data)) {
            getUser(user)
            storeToken(data.token)
            navigateToFeed()
        }

        //se tem erro aparece um alert indicando o erro
        if (hasError(data)){
            if(Object.keys(data).includes('password') || Object.keys(data).includes('username')){
                Alert.alert("Os campos não podem ficar em branco")
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

