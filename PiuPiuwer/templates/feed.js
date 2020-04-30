import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity} from 'react-native';

const feed = () => {
    return<View style={styles.MainContainer}>
        {/* barra de navegação superior */}
        <View style={styles.headerStyle}>
            <Image style={styles.logoStyle} source={require('./img/logo.png')} />
            <TextInput style={styles.containerText} placeholder="Procurando algo?"/>
            <View style={styles.userOptions}>
              <TouchableOpacity  onPress={() => {console.log('perfil')}}>
                <Image style={styles.iconStyle} source={require('./img/anonymous-icon.png')} />
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {console.log('opcoes')}}>
                <Image style={styles.moreOptions} source={require('./img/moreoptions-icon.png')} />
              </TouchableOpacity>
            </View>
        </View>

        {/* conteudo da pag */}
        <View style={styles.Container}>

          {/* novo piu */}
          <View style={styles.PiuContainer}>
            <View style={{flexDirection:'row'}}>
              <Image style={styles.iconStyle} source={require('./img/anonymous-icon.png')} />
              <TextInput multiline={true} style={styles.newPiuInput} placeholder="Compartilhe um novo piu"/>
            </View>
            <View style={styles.newPiuDetail}> 
              <Text>0/140</Text>
              <TouchableOpacity  onPress={() => {console.log('novo piu')}} style={[styles.piuBtn, {marginLeft:10}]}>
                <Text style={styles.btnText}>Piar</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* feed */}
          <View style={styles.PiuContainer}>
            <View style={{flexDirection:'row'}}>
              <Image style={styles.iconStyle} source={require('./img/anonymous-icon.png')} />
              <View style={styles.piuContent}>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.piuwerNome}>Nome</Text>
                  <Text>@Usuario</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={{width:300, flexWrap:'wrap'}}>conteudo do piu wstagbhnj ewfgtydhsanm wfet gsdayh</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* barra de navegação de baixo */}
        <View style={styles.navBottom}>
            <TouchableOpacity  onPress={() => {console.log('home')}} >
              <Image style={styles.navBtn} source={require('./img/home-icon.png')} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => {console.log('notificacoes')}}>
            <Image style={styles.navBtn} source={require('./img/notification-icon.png')} />
            </TouchableOpacity>            
            <TouchableOpacity  onPress={() => {console.log('novo piu')}} style={styles.piuBtn}>
              <Text style={styles.btnText}>Novo Piu</Text>
            </TouchableOpacity>
        </View>     
    </View>
};

const styles = StyleSheet.create({
    MainContainer:{
      flex:1
    },
    headerStyle:{
        height: 55,
        flexDirection:'row',
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        marginVertical:10,
        borderBottomColor:'grey',
        borderBottomWidth: 1,
        alignItems: 'center',
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
      borderRadius:50,
      resizeMode:'cover',
    },

    userOptions:{
      flexDirection:'row',
    },

    moreOptions:{
      marginTop:10,
      marginLeft:10,
    },

    Container:{
      marginHorizontal:20,
      flexDirection: 'column'
    },

    PiuContainer:{
      borderWidth:.5,
      borderColor: 'grey',
      borderRadius:10,
      padding:10,
      flexDirection:'column',
      marginVertical:5,
    },

    newPiuInput:{
      width:300,
      maxHeight:90,
      flexWrap:'wrap'
    },

    newPiuDetail:{
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'flex-end',
      bottom:0,
    },

    piuwerNome:{
      fontWeight:'bold',
      marginHorizontal:2,
      fontSize:15,
    },

    piuContent:{
      marginLeft:2,
      flexWrap:'wrap'
    },

    navBottom:{
      height: 60,
      flexDirection:'row',
      width: 420,
      justifyContent: 'space-around',
      paddingTop:5,
      position: 'absolute', 
      bottom: 0,
      alignItems: 'center',
      borderTopColor:'grey',
      borderTopWidth: 1,
    },

    navBtn:{
      height:40,
      width:35,
      resizeMode: 'cover',
    },

    piuBtn:{
      backgroundColor: 'hsla(207, 60%, 44%, 0.85)',
      alignItems: 'center',
      paddingHorizontal:15,
      paddingVertical:10,
      borderRadius: 50,
    },

    btnText:{
      color: 'white',
      fontSize: 15,
    }



})

export default feed;