import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const feed = () => {
    return<View style={styles.MainContainer}>
        <View style={styles.headerStyle}>
            <Image style={styles.logoStyle} source={require('../img/logo.png')} />
            <TextInput style={styles.containerText} placeholder="Procurando algo?"/>
            <View style={styles.userOptions}>
              <Image style={styles.iconStyle} source={require('./img/anonymous-icon.png')} />
              <Image style={styles.moreOptions} source={require('./img/moreoptions-icon.png')} />
            </View>
        </View>
        <View style={styles.navBottom}>
            <Image style={styles.logoStyle} source={require('./img/logo.png')} />
            <TextInput style={styles.containerText} placeholder="Procurando algo?"/>
            <View style={styles.userOptions}>
              <Image style={styles.iconStyle} source={require('./img/anonymous-icon.png')} />
              <Image style={styles.moreOptions} source={require('./img/moreoptions-icon.png')} />
            </View>
        </View>     
    </View>
};

const styles = StyleSheet.create({
    MainContainer:{
      flex:1
    },
    headerStyle:{
        height: 50,
        flexDirection:'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        margin:20,
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    },

    logoStyle:{
        height:40,
        width:50,
        resizeMode: 'cover',

    },

    textStyle:{
        fontSize: 30,
        color:'hsla(207, 60%, 44%, 0.85)',
    },

    containerText:{
      backgroundColor: 'hsla(0, 0%, 77%, 0.5)',
      marginVertical:5,
      borderRadius:20,
      width: 200,
      fontSize:15,
      paddingHorizontal:10,

    },

    iconStyle:{
      height:50,
      width:50,
      borderRadius:100,
      resizeMode: 'cover',

    },

    userOptions:{
      flexDirection:'row',
    },

    moreOptions:{
      marginTop:10,
      marginLeft:10,
    },

    navBottom:{
      height: 50,
      flexDirection:'row',
      width:400,
      justifyContent: 'space-around',
      margin:10,
      position: 'absolute', 
      bottom: 0,
    }

})

export default feed;