import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import PiuBox from '../components/piu'
import { newPiu } from '../api/newpiu'
import AsyncStorage from '@react-native-community/async-storage'
import { loadPius } from '../api/loadPius'


export default function feed({ navigation }) {
  let [pius, setPius] = useState({
    data: null,
    loaded: false,
  });

  async function loadPiusData() {
    const pius = await loadPius();
    console.log(pius);
    setPius({
      data: pius,
      loaded: true,
    });
  }

  // loadPiusData();

  function navigateToProfile() {
    navigation.navigate('Profile');
  }

  const [visible, setVisible] = useState(false)
  const _openMenu = () => setVisible(true);
  const _closeMenu = () => setVisible(false);
  const [piuConteudo, setPiu] = useState('');

  function piusArea() {
    if (pius.data == null) {
      if (!pius.loaded) loadPiusData();
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
            Carregando pius...
                </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={pius.data}
        renderItem={({ item }) => {
          // Adiciona um novo piu, ou o Component SemPius, à lista:
          return <PiuBox name={`${item.usuario.first_name} ${item.usuario.last_name}`} username={` @${item.usuario.username}`} iconSource={item.usuario.foto} mensagem={item.texto} />
        }}
      />
    );
  }

  return (
    <Provider>
    <LinearGradient style={{ flex: 1 }} colors={['#ffffff', 'hsla(207, 55%, 62%, 0.2)']} >

      {/* barra de navegação superior */}
      <View style={styles.headerStyle}>
        <Image style={styles.logoStyle} source={require('./img/logo.png')} />
        <TextInput style={styles.containerText} placeholder="Procurando algo?" />
        <View style={styles.userOptions}>
          <TouchableOpacity onPress={navigateToProfile}>
            <Image style={styles.iconStyle} source={require('./img/anonymous-icon.png')} />
          </TouchableOpacity>
          <Menu visible={visible} onDismiss={_closeMenu} anchor={<TouchableOpacity onPress={_openMenu}><Image style={styles.moreOptions} source={require('../screens/img/moreoptions-icon.png')} /></TouchableOpacity>}>
            <Menu.Item onPress={navigateToProfile} title='Meu Perfil' />
            <Menu.Item title='Ajuda' />
            <Menu.Item title='Configurações' />
            <Menu.Item title='Sair' />
          </Menu>
        </View>
      </View>

      {/* <Navbar/> */}

      {/* conteudo da pag */}

        {/* novo piu */}
        {piuConteudo.length > 140 ? <Text style={{ color: 'red', fontSize: 16 }}>O piu não pode conter mais do que 140 caracteres!</Text>
          : null
        }
        <View style={styles.PiuContainer}>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.iconStyle} source={require('./img/anonymous-icon.png')} />
            <TextInput autoCorrect={false} multiline={true} style={[styles.newPiuInput, { color: piuConteudo.length > 140 ? 'red' : 'black' }]} placeholder="Compartilhe um novo piu" value={piuConteudo} onChangeText={piuConteudo => setPiu(piuConteudo)} />
          </View>
          <View style={styles.newPiuDetail}>
            <Text style={{ color: piuConteudo.length > 140 ? 'red' : 'black' }}>{piuConteudo.length}/140</Text>
            <TouchableOpacity disabled={piuConteudo.length == 0 ? true : piuConteudo.length > 140 ? true : false} onPress={() => { newPiu(piuConteudo), setPiu('') }} style={[styles.piuBtn, { marginLeft: 10, opacity: piuConteudo.length == 0 ? 0.7 : piuConteudo.length > 140 ? 0.7 : 1 }]}>
              <Text style={styles.btnText}>Piar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* feed */}
        <View style={{ flex: 1 }}>
              {piusArea()}
        </View>

        {/* Mensagem do final
        <Text style={styles.finalText}>Ops! Parece que não há mais nada por aqui</Text> */}
    </LinearGradient>
  </Provider>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    height: 70,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 5,
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
    maxHeight: 100,
    flexWrap: 'wrap',
    fontSize: 16,
    marginLeft: 10,
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

  finalText: {
    fontSize: 25,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 20,
  }
})
