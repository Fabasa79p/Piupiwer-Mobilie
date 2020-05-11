import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'



export async function follow(id, id_logado) {
    const token = await AsyncStorage.getItem('token');
    // const logadoID = await AsyncStorage.getItem('idUsuario');

    const dados = {
        usuario_id: id,
        logado_id: id_logado
    }

    try {
        console.log(`token: ${token}`)
        console.log(`usuario a ser seguido: ${id}`)
        console.log(`quem seguiu: ${id_logado}`)
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/usuarios/seguir/',
            {
                method: 'POST',
                headers: new Headers({
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                    'Authorization': `JWT ${token}`
                }),
                body: JSON.stringify(dados),
            })
        // Decodifica os dados para o formato json:
        let data = await JSON.stringify(response)
        // Imprime os dados obtidos:
        console.log(data);
        // Erro
    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        return Alert.alert('Sorry, something went wrong.', error.message);
    }
}