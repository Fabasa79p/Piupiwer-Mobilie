
// ---------------------------------DADOS GUARDADOS NO STORAGE-----------------------------
// token como 'token'
//user como 'usuarioLogado'
//ID como 'idUsuario'

import React from 'react';
import { Alert } from 'react-native';
import jwt from "react-native-pure-jwt";
import AsyncStorage from '@react-native-community/async-storage'

//guarda token
const storeToken = async (LoginToken) => {
  try {
    await AsyncStorage.setItem('token', LoginToken)
    console.log("Guardou token")
  } catch (e) {
    // saving error
  }
}

//GET para pegar o username
async function getUser(user) {
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

    // // Imprime os dados obtidos
    // console.log(dados);

    //chama função que salva o user
    for (i = 0; i < dados.length; i++) {
      if (dados[i].username == userProcurado) {
        console.log("É igual")
        return dados[i]
      }
    }
    return (userProcurado)


  } catch (error) {
    // Caso haja algum erro, imprima-o e retorne o erro:
    console.error(error);
  }
}

//guarda user
const storeUser = async (LoggedUser, idUsuario) => {
  try {
    await AsyncStorage.multiSet([['usuarioLogado', LoggedUser], ['idUsuario', idUsuario]])
  } catch (e) {
    // saving error
  }
}

// valida o login ou não
export async function LogIn(user, senha, { navigation }) {
  function navigateToFeed() {
    navigation.navigate('Feed');
  }
  if (user == '') return Alert.alert("O campo de usuário não deve ficar em branco")
  if (senha == '') return Alert.alert("O campo de senha não deve ficar em branco")
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

    //se não tem erro chama a funcao que guarda o usuario, guarda o token e faz a navergação pro feed
    if (Object.keys(data).includes('token')) {
      dadosUsuario = await getUser(user)
      if(dadosUsuario.username != user){
        Alert.alert("Usuário ou senha incorretos. Tente Novamente.")
        return
      }
      // console.log(dadosUsuario)
      await storeToken(data.token)
      await storeUser(dadosUsuario.username, dadosUsuario.id.toString())
      await retrieveUser()
      await retrieveId()
      navigateToFeed()
    }

    //se tem erro aparece um alert indicando o erro
    if (!Object.keys(data).includes('token')) {
      Alert.alert("Usuário ou senha incorretos. Tente Novamente.")
    }

  } catch (error) {
    // Caso haja algum erro, imprima-o e retorne o erro:
    console.error(error);
  }
}


// ---verificação das variaveis guardadas
const retrieveUser = async () => {
  try {
    const value = await AsyncStorage.getItem('usuarioLogado');
    if (value !== null) {
      // We have data!!
      console.log(`Usuario ${value} guardado`)
    }
  } catch (error) {
    // Error retrieving data
  }
};

const retrieveId = async () => {
  try {
    const value = await AsyncStorage.getItem('idUsuario');
    if (value !== null) {
      // We have data!!
      console.log(`ID ${value} guardado`)
    }
  } catch (error) {
    // Error retrieving data
  }
};

