import React from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export async function deletePiu(idPiu) {
    const token = await AsyncStorage.getItem('token');
    var linkAPI = `http://piupiuwer.polijr.com.br/pius/${idPiu}/`
    console.log(token)
    console.log(linkAPI)
    let response = await fetch(
        linkAPI,
        {
            method: 'DELETE',
            headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }),
        },
    );
}