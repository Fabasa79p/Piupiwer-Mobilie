import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Button, TextInput, TouchableOpacity, Dimensions, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Menu, Provider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import PiuBox from '../components/piu'
import { newPiu } from '../api/newpiu'
import AsyncStorage from '@react-native-community/async-storage'
import { loadPius } from '../api/loadPius'
import { deletePiu } from '../api/deletePiu'
import { loadProfile } from '../api/loadProfile'
import { loadUser } from '../api/loadUser'
import { useFocusEffect } from '@react-navigation/native';

export default function feed({ navigation }) {
  const [pius, setPius] = useState({
    data: null,
    loaded: false,
  });
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
  const [search, setSearch] = useState({
    data: null,
    loaded: false,
  });

  const [searchList, setSearchList] = useState({
    data: null,
    loaded: false,
  });

  const [userData, setUserData] = useState({
    data: null,
    loaded: false,
  });

  async function loadSearchList() {
    const searchList = await loadProfile(null);
    setSearchList({
      data: searchList,
      loaded: true,
    });
  }

  // function navigateToSearch(id) {
  //   navigation.navigate('Profile', { id: id });
  // }

  function navigateToSearch(search) {
    navigation.navigate('Search', { termo: search })
  }

  // function searchHandler() {
  //   let found = false
  //   searchList.data.forEach(user => {
  //     if (user.username == search) {
  //       found = true;
  //       navigateToSearch(user.id)
  //     }

  //   });
  //   if (!found) {
  //     return Alert.alert('Usuário não encontrado!')
  //   }
  //   console.log(found)
  // }

  async function loadPiusData(dadosUser, IDUser) {
    const pius = await loadPius();
    const followPius = [];
    const piuwersSeguidos =[]
    console.log(dadosUser)
    piuwersSeguidos.push(parseInt(IDUser))

    //faz a lista de id das pessoas que o usuario segue
    await dadosUser.seguindo.forEach(following => {
      piuwersSeguidos.push(following.id)
    })

    //filtra os pius de acordo com a lista que o user segue
    pius.forEach(piu =>{
      if (piuwersSeguidos.includes(piu.usuario.id)){
        followPius.push(piu)}
    })
    setPius({
      data: followPius,
      loaded: true,
    });    
  }
  async function retrieveUser() {
    const usuarioLogado = await AsyncStorage.getItem('usuarioLogado');
    setUsuarioLogado({
      data: usuarioLogado,
      loaded: true,
    });
  }


  async function retrieveID() {
    const usuarioID = await AsyncStorage.getItem('idUsuario');
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

  async function getUserData() {
    console.log("PASSOU AQUI")
    const userData = await loadUser(usuarioID.data)
    setUserData({
      data: userData,
      loaded: true,
    });
  }


  function navigateToProfile() {
    navigation.navigate('Profile', { id: usuarioID.data })
  }

  function navigateToOwnProfile() {
    navigation.navigate('OwnProfile', { id: usuarioID.data })
  }
  const [visible, setVisible] = useState(false)
  const _openMenu = () => setVisible(true);
  const _closeMenu = () => setVisible(false);
  const [piuConteudo, setPiu] = useState('');

  async function deletePiuFuncoes(piuId) {
    await deletePiu(piuId)
    setPius(pius.data.filter(piu => piu.id != piuId))
  }

  useFocusEffect(
    React.useCallback(() => {
      setPius({
        data: null,
        loaded: false,
      });
      setUserData({
        data: null,
        loaded: false,
      });
    }, [])
  );

  function navigateToLogin() {
    navigation.navigate('Login')
  }


  function piusArea() {
    if (pius.data == null || usuarioLogado.data == null || usuarioID.data == null || token.data == null || searchList.data == null || userData.data == null) {

      if (!usuarioLogado.loaded) retrieveUser();
      if (!usuarioID.loaded) retrieveID();
      if (!token.loaded) retrieveToken();
      if (!searchList.loaded) loadSearchList();
      if (!userData.loaded) getUserData();
      if (!pius.loaded && userData.loaded && usuarioID.loaded) loadPiusData(userData.data, usuarioID.data);


      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',

        }}
        >
          {/* <Image style={styles.loadStyle} source={require('./img/logo.png')} /> */}

          <Text style={{
            fontSize: 20,
            color: '#777',
            // padding: 30,
          }}
          >
            Carregando pius...
                </Text>
          <ActivityIndicator size="large" color="hsla(207, 60%, 44%, 0.85)" />
        </View>
      );
    }

    return (
      <Provider>
        <LinearGradient style={{ flex: 1 }} colors={['#ffffff', 'hsla(207, 55%, 62%, 0.2)']} >
          {/* barra de navegação superior */}
          <View style={styles.headerStyle}>
            <Image style={styles.logoStyle} source={require('./img/logo.png')} />
            <TextInput style={styles.containerText} placeholder="Procurando algo?" value={search} onChangeText={Search => setSearch(Search)} /><TouchableOpacity onPress={() => { navigateToSearch(search) }}><Image source={require('../screens/img/search.png')} style={styles.searcn} /></TouchableOpacity>
            <View style={styles.userOptions}>
              <TouchableOpacity onPress={() => { navigateToOwnProfile() }}>
                <Image style={styles.iconStyle} source={{ uri: userData.data.foto }} />
              </TouchableOpacity>
              <Menu visible={visible} onDismiss={_closeMenu} anchor={<TouchableOpacity onPress={_openMenu}><Image style={styles.moreOptions} source={require('../screens/img/moreoptions-icon.png')} /></TouchableOpacity>}>
                <Menu.Item onPress={() => { navigateToOwnProfile() }} title='Meu Perfil' />
                <Menu.Item title='Ajuda' />
                <Menu.Item title='Configurações' />
                <Menu.Item title='Sair' onPress={() => {  navigateToLogin() }}/>
              </Menu>
            </View>
          </View>

          {/* <Navbar/> */}

          {/* conteudo da pag */}

          {/* novo piu */}
          {piuConteudo.length > 140 ? <Text style={{ color: 'red', fontSize: 16, textAlign: 'center' }}>O piu não pode conter mais do que 140 caracteres!</Text>
            : null
          }
          <View style={styles.PiuContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Image style={styles.iconStyle} source={{ uri: userData.data.foto }} />
              <TextInput autoCorrect={false} multiline={true} style={[styles.newPiuInput, { color: piuConteudo.length > 140 ? 'red' : 'black' }]} placeholder="Compartilhe um novo piu" value={piuConteudo} onChangeText={piuConteudo => setPiu(piuConteudo)} />
            </View>
            <View style={styles.newPiuDetail}>
              <Text style={{ color: piuConteudo.length > 140 ? 'red' : 'black' }}>{piuConteudo.length}/140</Text>
              <TouchableOpacity disabled={piuConteudo.length == 0 ? true : piuConteudo.length > 140 ? true : false} onPress={() => { novoPiuFuncoes(piuConteudo) }} style={[styles.piuBtn, { marginLeft: 10, opacity: piuConteudo.length == 0 ? 0.7 : piuConteudo.length > 140 ? 0.7 : 1 }]}>
                <Text style={styles.btnText}>Piar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={pius.data}
            renderItem={({ item }) => {
              let liked = false
              let favoritado = false
              item.likers.forEach(liker => {
                if (liker.username == usuarioLogado.data) {
                  liked = true;
                }
              });
              item.favoritado_por.forEach(favoritado_por => {
                if (favoritado_por.username == usuarioLogado.data) {
                  favoritado = true;
                }
              });
              // Adiciona um novo piu, ou o Component SemPius, à lista:
              return <PiuBox id={item.id} delete={deletePiuFuncoes} id_usuario={usuarioID.data} name={`${item.usuario.first_name} ${item.usuario.last_name}`} username={item.usuario.username} op_id={item.usuario.id} iconSource={item.usuario.foto} mensagem={item.texto} likeStatus={liked} counter={item.likers.length} favoritadoStatus={favoritado} favoriteCounter={item.favoritado_por.length} navigation={navigation} />

            }}
          />
        </LinearGradient>
      </Provider>
    );
  }

  async function novoPiuFuncoes(piuConteudo) {
    const novoPiu = await newPiu(piuConteudo)
    setPius([...pius.data, novoPiu])
    setPiu('')
  }

  return (
    <View style={{ flex: 1 }}>
      {piusArea()}
    </View>
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

  loadStyle: {
    height: 60,
    width: 70,
    resizeMode: 'cover',
    alignSelf: 'flex-start'
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
    marginHorizontal: 5,
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
  },
  search: {
    height: 10,
    width: 10
  }
})
