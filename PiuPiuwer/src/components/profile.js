import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import PiuBox from '../components/piu'
import { TabView, SceneMap } from 'react-native-tab-view';
import { loadProfile } from '../api/loadProfile'
import { follow } from '../api/follow'





export default function ProfileComponent(props) {
    { console.log(props.pius) }





    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Sobre você' },
        { key: 'second', title: 'Seus Pius' },
    ]);
    // const renderScene = SceneMap({
    //     first: FirstRoute,
    //     second: SecondRoute,
    // });


    return (
        <>
            <View style={styles.profileContainer}>
                <Image style={styles.imageProfile} source={{ uri: props.foto }} />
                <View style={styles.profileInfo}>
                    <Text style={styles.nameText} >{props.first_name} {props.last_name}</Text>
                    <Text style={styles.userText} >@{props.username}</Text>
                    <Text style={styles.userText} >{props.sobre}</Text>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => follow(props.id, props.logado_id)}>
                    <Text style={styles.loginText}>Seguir</Text>
                </TouchableOpacity>
            </View>
        </>
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
    loginButton: {
        alignSelf: "center",
        margin: 10,
        backgroundColor: 'hsla(207, 60%, 44%, 0.85)',
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
