import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'



export async function likePiu(id_piu, id_usuario) {
    const token = await AsyncStorage.getItem('token');
    const dados = {
        usuario: id_usuario,
        piu: id_piu
    }

    try {
        console.log(`token: ${token}`)
        console.log(`usuario: ${id_usuario}`)
        console.log(`piu: ${id_piu}`)
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/pius/dar-like/',
            {
                method: 'POST',
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Authorization': `JWT ${token}`
                }),
                body: JSON.stringify(dados),
            })
        // Decodifica os dados para o formato json:
        let data = await response.json();

        // Imprime os dados obtidos:
        console.log(data);
        // Erro
    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        return Alert.alert('Sorry, something went wrong.', error.message);
    }
}