import React from 'react';
import { Alert } from 'react-native';

// function hasError(data) {
//     return !Object.keys(data).includes('token');
// }

export async function signIn(usuario, nome, sobrenome, email, senha, sobre, { navigation }) {
    function navigateToLogin() {
        navigation.navigate('Login');
    }
    // console.warn("request: " + nome + usuario + foto)
    if (usuario == '') return Alert.alert('Erro com o Username!', 'O campo não pode estar vazio!')
    if (nome == '') return Alert.alert('Erro com o Nome!', 'O campo não pode estar vazio!')
    if (sobrenome == '') return Alert.alert('Erro com o Sobrenome!', 'O campo não pode estar vazio!')
    if (email == '') return Alert.alert('Erro com o Email!', 'O campo não pode estar vazio!')
    if (senha == '') return Alert.alert('Erro com a Senha!', 'O campo não pode estar vazio!')
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
        // Erro
        if (!Object.keys(data).includes('id')) {
            if (Object.keys(data).includes('email')) return Alert.alert('Erro com o Email!', 'O email deve ser válido \n(example@example.com)!')
            if (Object.keys(data).includes('username')) return Alert.alert('Erro com o Username!', 'O username já está em uso')
            return Alert.alert('Oops!', 'Algo está errado!')
        }
        Alert.alert('Sucesso!', 'Você agora é um Piuwer!')
        navigateToLogin()

    } catch (error) {
        // Caso haja algum erro, imprima-o e retorne o erro:
        console.error(error);
        return Alert.alert('Sorry, something went wrong.', error.message);
    }
}