// import React from 'react';
// import { Alert } from 'react-native';

// function hasError(data) {
//     return !Object.keys(data).includes('token');
// }
import AsyncStorage from '@react-native-community/async-storage'

// const storePius = async (data) => {
//     try {
//         await AsyncStorage.setItem('listPius', data)
//         await console.log("Guardou os Pius")
//     } catch (e) {
//         // saving error
//     }
// }

export async function loadPius() {
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
        console.log(data[0].texto)

        // Imprime os dados obtidos:
        return await data;

    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        return console.log('Sorry, something went wrong.', error.message);
    }
}