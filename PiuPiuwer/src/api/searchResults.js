import React from 'react';
import { Alert } from 'react-native';

export async function searchTerm(termo) {
  var linkAPI = 'http://piupiuwer.polijr.com.br/usuarios/?search='
  var termoProcurado = termo
  var link = linkAPI.concat(termoProcurado)
  console.log(link)
  try {
    let response = await fetch(
      link,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    // Decodifica os dados para o formato json:
    return await response.json();
  } catch (error) {
    // Caso haja algum erro, imprima-o e retorne o erro:
    console.error(error);
  }
}


