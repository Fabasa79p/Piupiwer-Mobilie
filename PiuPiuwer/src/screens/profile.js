import React from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import PiuBox from '../components/piu'
// import { Container } from './styles';

export default function profile() {
    return (
        <>
            <View style={styles.profileContainer}>
                <Image style={styles.imageProfile} source={require('./img/eu.jpg')} />
                <View style={styles.profileInfo}>
                    <Text style={styles.infoText} >12 Piadas</Text>
                    <Text style={styles.infoText} >568 Seguidores</Text>
                    <Text style={styles.infoText} >732 Seguindo</Text>
                </View>
            </View>
            <ScrollView>
                <PiuBox name="Renato" username='@renato' iconSource={require('./img/eu.jpg')} mensagem='oi' />
                <PiuBox name='Renato' username='@renato' iconSource={require('./img/eu.jpg')} mensagem='testeee' />
                <PiuBox name="Renato" username='@renato' iconSource={require('./img/eu.jpg')} mensagem='oi' />
                <PiuBox name='Renato' username='@renato' iconSource={require('./img/eu.jpg')} mensagem='testeee' />
                <PiuBox name="Renato" username='@renato' iconSource={require('./img/eu.jpg')} mensagem='penultmo' />
                <PiuBox name='Renato' username='@renato' iconSource={require('./img/eu.jpg')} mensagem='ultimo' />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({

    profileContainer: {
        padding: 25,
        alignItems: "center",
        // alignContent: "center"
        borderWidth: .5,
        borderColor: 'grey',

    },

    imageProfile: {
        height: 200,
        width: 200,
        borderRadius: 100,
        resizeMode: 'cover',
    },
    profileInfo: {
        alignContent: "center",
        flexDirection: "row",
    },
    infoText: {
        padding: 5,
        fontSize: 20,
    },



})
