import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'



export async function favoritarPiu(id_piu, id_usuario) {
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
            'http://piupiuwer.polijr.com.br/pius/favoritar/',
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

    } catch (error) {
        // console.error(error);
    }
}