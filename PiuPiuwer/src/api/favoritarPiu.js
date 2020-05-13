import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'



export async function favoritarPiu(piu, usuario) {
    const token = await AsyncStorage.getItem('token');
    try {
        console.log(`token: ${token}`)
        console.log(`usuario: ${usuario}`)
        console.log(`piu: ${piu}`)
        console.log("OI")
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/pius/favoritar/',
            {
                method: 'POST',
                headers: new Headers({
                    'Content-type': 'application/json',
                    'Authorization': `JWT ${token}`
                }),
                body: JSON.stringify({
                    'usuario': usuario,
                    'piu': piu
                }
                    
                ),
            })
        // Decodifica os dados para o formato json:
        let data = await response.json();

        // Imprime os dados obtidos:
        console.log(data);

    } catch (error) {
        console.error(error);
    }
}