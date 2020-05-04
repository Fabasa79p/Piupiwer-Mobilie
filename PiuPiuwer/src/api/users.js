import React from 'react';
import { Alert } from 'react-native';

function hasError(data) {
    return !Object.keys(data).includes('token');
}

export async function signIn(usuario, nome, sobrenome, email, senha, sobre, foto) {
    // console.warn("request: " + nome + usuario + foto)

    try {
        let response = await fetch(
            'http://piupiuwer.polijr.com.br/usuarios/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'first_name': nome,
                    'last_name': sobrenome,
                    'username': usuario,
                    'email': email,
                    'sobre': sobre,
                    'password': senha,
                    // 'foto': foto


                }),
            },
        );

        // Decodifica os dados para o formato json:
        let data = await response.json();

        // Imprime os dados obtidos:
        console.log(data);

        if (!hasError(data)) {
            // Retorna os dados:
            return [data, null];
        }
        else {
            // Retorna o erro:
            return [null, 'Insira os dados corretamente.'];
        }

    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        Alert.alert('Sorry, something went wrong.', error.message);
        return [null, 'Erro de conexão.'];
    }
}