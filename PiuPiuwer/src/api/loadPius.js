// import React from 'react';
// import { Alert } from 'react-native';

// function hasError(data) {
//     return !Object.keys(data).includes('token');
// }
import AsyncStorage from '@react-native-community/async-storage'

export async function loadPius() {
    console.log("Fiz o fetch de novo")
    try {
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/pius/',
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();
        // Imprime os dados obtidos:
        return await data;

    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        return console.log('Sorry, something went wrong.', error.message);
    }
}