import React from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import PiuBox from '../components/piu'
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
    <ScrollView>
        <View style={styles.aboutP}>
            <Text style={styles.aboutTitle}   >
                Sua frase:
        </Text>
            <Text style={styles.aboutText}   >
                Quase que eu viro um tangram
        </Text>
        </View>
        <View style={styles.aboutP}>
            <Text style={styles.aboutTitle}   >
                Seu email:
        </Text>
            <Text style={styles.aboutText}   >
                renato@polijunior.com.br
        </Text>
        </View>
        <View style={styles.aboutP}>
            <Text style={styles.aboutTitle}   >
                Segue:
        </Text>
            <Text style={styles.aboutText}   >
                434 Piuwers
        </Text>
        </View>
        <View style={styles.aboutP}>
            <Text style={styles.aboutTitle}   >
                Seguido por:
        </Text>
            <Text style={styles.aboutText}   >
                723 Piuwers
        </Text>
        </View>
        <View style={styles.aboutP}>
            <Text style={styles.aboutTitle}   >
                Piou:
        </Text>
            <Text style={styles.aboutText}   >
                12 Piadas
        </Text>
        </View>
    </ScrollView>
);

const SecondRoute = () => (
    <ScrollView style={styles.piusContainer}>
        <PiuBox name="Renato" username='@renato' iconSource={require('./img/eu.jpg')} mensagem='oi' />
        <PiuBox name='Renato' username='@renato' iconSource={require('./img/eu.jpg')} mensagem='testeee' />
        <PiuBox name="Renato" username='@renato' iconSource={require('./img/eu.jpg')} mensagem='oi' />
        <PiuBox name='Renato' username='@renato' iconSource={require('./img/eu.jpg')} mensagem='testeee' />
        <PiuBox name="Renato" username='@renato' iconSource={require('./img/eu.jpg')} mensagem='penultmo' />
        <PiuBox name='Renato' username='@renato' iconSource={require('./img/eu.jpg')} mensagem='ultimo' />
    </ScrollView>
);

const initialLayout = { backgroundColor: 'hsla(207, 60%, 44%, 0.85)', width: Dimensions.get('window').width, };




export default function profile() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Sobre você' },
        { key: 'second', title: 'Seus Pius' },
    ]);
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
    });


    return (
        <>
            <View style={styles.profileContainer}>
                <Image style={styles.imageProfile} source={require('./img/eu.jpg')} />
                <View style={styles.profileInfo}>
                    <Text style={styles.nameText} >Renato, o Kleber</Text>
                    <Text style={styles.userText} >@Renato</Text>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={() => console.log('feed')}>
                    <Text style={styles.loginText}>Seguir</Text>
                </TouchableOpacity>
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

const styles = StyleSheet.create({

    profileContainer: {
        // alignContent: "center",
        padding: 20,
        alignItems: "center",
        alignSelf: "center",

    },

    piusContainer:{
        marginTop:15,
        marginHorizontal:15,
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
        paddingHorizontal:15,
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
        paddingLeft:10,
        paddingVertical:5,
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
        flex:1,
        alignSelf:'stretch',

    }




})
