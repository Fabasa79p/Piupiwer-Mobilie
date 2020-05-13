import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export async function newPiu(textoPiu) {
    console.log("Cheguei aqui")
    const idUsuario = await AsyncStorage.getItem('idUsuario');
    try {
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/pius/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'usuario': idUsuario,
                    'texto': textoPiu,
                }),
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();

        return await data;

    } catch (error) {
        console.error(error);
    }
}