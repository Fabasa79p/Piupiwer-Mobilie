import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';

export default function Navbar ({navigation}){
    function navigateToProfile() {
        navigation.navigate('Profile');
    }

    return <View style={styles.headerStyle}>
        <Image style={styles.logoStyle} source={require('../screens/img/logo.png')} />
        <TextInput style={styles.containerText} placeholder="Procurando algo?" />
        <View style={styles.userOptions}>
            <TouchableOpacity onPress={navigateToProfile}>
                <Image style={styles.iconStyle} source={require('../screens/img/moreoptions-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { console.log('opcoes') }}>
                <Image style={styles.moreOptions} source={require('../screens/img/moreoptions-icon.png')} />
            </TouchableOpacity>
        </View>
  </View>
};


const styles = StyleSheet.create({
    MainContainer: {
      flex: 1
    },
    headerStyle: {
      height: 70,
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'space-around',
      paddingTop: 10,
      paddingBottom:5,
      marginBottom:5,
      borderBottomColor: 'grey',
      borderBottomWidth: 1,
      alignItems: 'center',
    },
  
    logoStyle: {
      height: 40,
      width: 50,
      resizeMode: 'cover',
    },
  
    textStyle: {
      fontSize: 30,
      color: 'hsla(207, 60%, 44%, 0.85)',
    },
  
    containerText: {
      backgroundColor: 'hsla(0, 0%, 77%, 0.5)',
      marginVertical: 5,
      borderRadius: 20,
      width: 200,
      fontSize: 15,
      paddingHorizontal: 10,
    },
  
    iconStyle: {
      height: 50,
      width: 50,
      borderRadius: 50,
      resizeMode: 'cover',
    },
  
    userOptions: {
      flexDirection: 'row',
    },
  
    moreOptions: {
      marginTop: 10,
      marginLeft: 10,
    },
  
    Container: {
      marginHorizontal: 20,
      flexDirection: 'column',
      marginBottom: 70,
    },
  
    PiuContainer: {
      borderWidth: .5,
      borderColor: 'grey',
      borderRadius: 10,
      padding: 10,
      flexDirection: 'column',
      marginVertical: 5,
    },
  
    newPiuInput: {
      width: 300,
      maxHeight: 90,
      flexWrap: 'wrap'
    },
  
    newPiuDetail: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-end',
      bottom: 0,
    },
  
    navBtn: {
      height: 40,
      width: 35,
      resizeMode: 'cover',
    },
  
    piuBtn: {
      backgroundColor: 'hsla(207, 60%, 44%, 0.85)',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 50,
    },
  
    btnText: {
      color: 'white',
      fontSize: 15,
    },
  
    finalText:{
      fontSize:25,
      alignSelf:'center',
      textAlign:'center'
    }
  })