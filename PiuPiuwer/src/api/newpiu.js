import React from 'react';
import { Alert } from 'react-native';

export async function newPiu(usuario, textoPiu) {
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
                    'usuario': usuario,
                    'texto': textoPiu,
                }),
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();

        // Imprime os dados obtidos:
        console.log(data);
        
        Alert.alert('Sucesso!', 'Você agora é um Piuwer!')

    } catch (error) {
        console.error(error);
    }
}