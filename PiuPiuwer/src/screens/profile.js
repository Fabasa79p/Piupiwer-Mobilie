import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import ProfileComponent from '../components/profile'
import PiuBox from '../components/piu'
import { TabView, SceneMap } from 'react-native-tab-view';
import { loadProfile } from '../api/loadProfile'
import { deletePiu } from '../api/deletePiu'
import AsyncStorage from '@react-native-community/async-storage'


export default function profile({ route, navigation }) {

    const [usuarioLogado, setUsuarioLogado] = useState({
        data: null,
        loaded: false,
    });

    const [usuarioID, setUsuarioID] = useState({
        data: null,
        loaded: false,
    });

    const [token, setToken] = useState({
        data: null,
        loaded: false,
    });

    async function retrieveUser() {
        const usuarioLogado = await AsyncStorage.getItem('usuarioLogado');
        // console.log(usuarioLogado)
        setUsuarioLogado({
            data: usuarioLogado,
            loaded: true,
        });
    }

    async function retrieveID() {
        const usuarioID = await AsyncStorage.getItem('idUsuario');
        // console.log(usuarioID)
        setUsuarioID({
            data: usuarioID,
            loaded: true,
        });
    }

    async function retrieveToken() {
        const token = await AsyncStorage.getItem('token');
        // console.log(token)
        setToken({
            data: token,
            loaded: true,
        });
    }


    // const FirstRoute = () => (
    //     <ScrollView>
    //         <View style={styles.aboutP}>
    //             <Text style={styles.aboutTitle}   >
    //                 Sua frase:
    //         </Text>
    //             <Text style={styles.aboutText}   >
    //                 {props.sobre}
    //             </Text>
    //         </View>
    //         {/* <View style={styles.aboutP}>
    //             <Text style={styles.aboutTitle}   >
    //                 Seu email:
    //         </Text>
    //             <Text style={styles.aboutText}   >
    //                 renato@polijunior.com.br
    //         </Text>
    //         </View>
    //         <View style={styles.aboutP}>
    //             <Text style={styles.aboutTitle}   >
    //                 Segue:
    //         </Text>
    //             <Text style={styles.aboutText}   >
    //                 434 Piuwers
    //         </Text>
    //         </View>
    //         <View style={styles.aboutP}>
    //             <Text style={styles.aboutTitle}   >
    //                 Seguido por:
    //         </Text>
    //             <Text style={styles.aboutText}   >
    //                 723 Piuwers
    //         </Text>
    //         </View>
    //         <View style={styles.aboutP}>
    //             <Text style={styles.aboutTitle}   >
    //                 Piou:
    //         </Text>
    //             <Text style={styles.aboutText}   >
    //                 12 Piadas
    //         </Text>
    //         </View> */}
    //     </ScrollView>
    // );

    // const SecondRoute = () => (
    //     <ScrollView style={styles.piusContainer}>
    //         {/* {props.pius.forEach(element => {

    //         });} */}
    //         <PiuBox name="Renato" username='@renato' iconSource='http://piupiuwer.polijr.com.br/media/usuarios/eu_qcxSEy3.jpg' mensagem='oi' />
    //         <PiuBox name='Renato' username='@renato' iconSource='http://piupiuwer.polijr.com.br/media/usuarios/eu_qcxSEy3.jpg' mensagem='testeee' />
    //     </ScrollView>
    // );

    async function deletePiuFuncoes(piuId) {
        await deletePiu(piuId)
        // console.log("passou aqui")
        loadPiusData()
    }

    let [userData, setUserData] = useState({
        data: null,
        loaded: false,
    });
    const { id } = route.params
    console.log(id)

    async function loadUserData() {
        const userData = await loadProfile(id);
        // console.log(pius);
        setUserData({
            data: userData,
            loaded: true,
        });
    }
    console.log(userData.data)


    function viewUser() {
        if (userData.data == null || usuarioLogado.data == null || usuarioID.data == null || token.data == null) {
            if (!userData.loaded) loadUserData();
            if (!usuarioLogado.loaded) retrieveUser();
            if (!usuarioID.loaded) retrieveID();
            if (!token.loaded) retrieveToken();

            // console.log(userData.data)

            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <Text style={{
                        fontSize: 20,
                        color: '#777',
                    }}
                    >
                        Carregando Piuwer...
                    </Text>
                </View>
            );
        }

        return (
            <>
                <ProfileComponent id={id} logado_id={usuarioID.data} username={userData.data.username} first_name={userData.data.first_name} last_name={userData.data.last_name} foto={userData.data.foto} sobre={userData.data.sobre} pius={userData.data.last_name} foto={userData.data.foto} />

                <FlatList
                    data={userData.data.pius}
                    renderItem={({ item }) => {
                        let liked = false
                        item.likers.forEach(liker => {
                            if (liker.username == usuarioLogado.data) {
                                liked = true;


                            }

                        });

                        // Adiciona um novo piu, ou o Component SemPius, à lista:
                        return <PiuBox id={item.id} delete={deletePiuFuncoes} id_usuario={usuarioID.data} name={`${item.usuario.first_name} ${item.usuario.last_name}`} username={item.usuario.username} op_id={item.usuario.id} iconSource={item.usuario.foto} mensagem={item.texto} likeStatus={liked} counter={item.likers.length} navigation={navigation} />
                    }}
                />
            </>
        );

        // <FlatList
        //     data={userData.data}
        //     renderItem={({ item }) => {

        //         // Adiciona um novo piu, ou o Component SemPius, à lista:
        //         return 
        //     }}
        // />
        // );
    }
    return (
        <View style={{ flex: 1 }}>
            {console.log(userData.data)}
            {viewUser()}

        </View>
    );

}