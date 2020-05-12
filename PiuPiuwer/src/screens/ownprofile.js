import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import ProfileComponent from '../components/profile'
import PiuBox from '../components/piu'
import { TabView, SceneMap } from 'react-native-tab-view';
import { loadProfile } from '../api/loadProfile'
import { deletePiu } from '../api/deletePiu'
import AsyncStorage from '@react-native-community/async-storage'


export default function ownProfile({ route, navigation }) {
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

    let [userData, setUserData] = useState({
        data: null,
        loaded: false
    });
    const { id } = route.params
    console.log(`User de ID ${id}`)

    async function loadUserData() {
        const userData = await loadProfile(id);
        console.log(userData)
        setUserData({
            data: userData,
            loaded: true,
        });
    }

    async function deletePiuFuncoes(piuId) {
        await deletePiu(piuId)
        loadUserData()
    }

    const FirstRoute = () => (
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
    );

    const SecondRoute = () => (
    <Text>Oiiiiiiiiiiiiiiiii</Text>
    );
    
    const initialLayout = { backgroundColor: 'hsla(207, 60%, 44%, 0.85)', width: Dimensions.get('window').width, };

    function viewUser() {
        const [index, setIndex] = React.useState(0);
        const [routes] = React.useState([
            { key: 'first', title: 'Seus Pius' },
            { key: 'second', title: 'Pius Favoritados' },
        ]);
        const renderScene = SceneMap({
            first: FirstRoute,
            second: SecondRoute,
        }); 
        if (userData.data == null || usuarioLogado.data == null || usuarioID.data == null || token.data == null) {
            if (!userData.loaded) loadUserData();
            if (!usuarioLogado.loaded) retrieveUser();
            if (!usuarioID.loaded) retrieveID();
            if (!token.loaded) retrieveToken();

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
        } else { 
            return (
                <>
                    <View style={styles.profileContainer}>
                        <Image style={styles.imageProfile} source={{ uri: userData.data.foto }} />
                        <View style={styles.profileInfo}>
                            <Text style={styles.nameText} >{userData.data.first_name} {userData.data.last_name}</Text>
                            <Text style={styles.userText} >@{userData.data.username}</Text>
                            <Text style={styles.userText} >{userData.data.sobre}</Text>
                        </View>
                    </View>
                    <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    />                    
                </>
            );
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {viewUser()}
        </View>
    );

}


const styles = StyleSheet.create({
    profileContainer: {
        // alignContent: "center",
        padding: 20,
        alignItems: "center",
        alignSelf: "center",

    },

    piusContainer: {
        marginTop: 15,
        marginHorizontal: 15,
    },

    imageProfile: {
        height: 150,
        width: 150,
        borderRadius: 100,
        resizeMode: 'cover',
        alignSelf: "center",
    },
    profileInfo: {
    },
    nameText: {
        alignSelf: "center",
        paddingTop: 5,
        fontSize: 24,
        fontWeight: "bold"
    },
    userText: {
        alignSelf: "center",
        fontSize: 20,
    },
    scene: {
        flex: 1,
    },
    followButton: {
        alignSelf: "center",
        margin: 10,
        backgroundColor: 'hsla(207, 60%, 44%, 0.85)',
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 50
    },
    unfollowButton: {
        alignSelf: "center",
        margin: 10,
        backgroundColor: '#ff784f',
        alignItems: 'center',
        padding: 5,
        paddingHorizontal: 15,
        borderRadius: 50
    },
    loginText: {
        alignSelf: "center",
        color: 'white',
        fontSize: 20,
    },
    aboutP: {
        flexDirection: "row",
        borderBottomColor: 'grey',
        borderBottomWidth: .3,
        paddingLeft: 10,
        paddingVertical: 5,
    },
    aboutTitle: {
        padding: 5,
        fontSize: 18,
        fontWeight: "bold",
    },
    aboutText: {
        padding: 5,
        fontSize: 18,
        flexWrap: 'wrap',
        flex: 1,
        alignSelf: 'stretch',

    }
})
