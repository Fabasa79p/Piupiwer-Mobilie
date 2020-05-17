import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { likePiu } from '../api/likePiu'
import { favoritarPiu } from '../api/favoritarPiu'

export default function PiuBox(props) {

  //funções de navegação
  function navigateToProfile() {
    props.navigation.navigate('Profile', { id: props.op_id });
  }

  function navigateToOwnProfile() {
    props.navigation.navigate('OwnProfile', { id: props.op_id })
  }


  const [usuarioLogado, setUsuario] = useState({ data: null, loaded: false })

  //recupera o usuario
  async function getUsuario() {
    const value = await AsyncStorage.getItem('usuarioLogado');
    setUsuario({ data: value, loaded: true });
  }
  if (usuarioLogado.data == null) {
    getUsuario()
  }

  // funções para curitr
  const [liked, setLiked] = useState({ status: false, initialCounter: props.counter, alreadyLiked: false })
  if (props.likeStatus) {
    useEffect(() => { setLiked({ status: true, initialCounter: props.counter, alreadyLiked: true }) }, [])
  }
  function toggleLike() {
    if (liked.alreadyLiked) {
      if (liked.status) { setLiked({ status: false, initialCounter: props.counter - 1,  alreadyLiked: true  }) }
      if (!liked.status) { setLiked({ status: true, initialCounter: props.counter,  alreadyLiked: true  }) }
    }
    if (!liked.alreadyLiked) {
      if (liked.status) { setLiked({ status: false, initialCounter: props.counter }) }
      if (!liked.status) { setLiked({ status: true, initialCounter: props.counter + 1 }) }
    }
  }

  function likeHandler() {
    likePiu(props.id, props.id_usuario);
    toggleLike();
  }

  // funções para favoritar
  const [favoritado, setFavoritado] = useState({ status: false, initialCounter: props.favoriteCounter, favorited: false })
  if (props.favoritadoStatus) {
    useEffect(() => { setFavoritado({ status: true, initialCounter: props.favoriteCounter, favorited: true }) }, [])
  }

  function toggleFavorite() {
    if (favoritado.favorited) {
      if (favoritado.status) { setFavoritado({ status: false, initialCounter: props.favoriteCounter - 1, favorited: true })}
      if (!favoritado.status) { setFavoritado({ status: true, initialCounter: props.favoriteCounter, favorited: true }) }
      console.log(favoritado.favorited)
    }
    if (!favoritado.favorited) {
      if (favoritado.status) { setFavoritado({ status: false, initialCounter: props.favoriteCounter }) }
      if (!favoritado.status) { setFavoritado({ status: true, initialCounter: props.favoriteCounter + 1 }) }
    }
  }

  function favoriteHandler() {
    favoritarPiu(props.id, props.id_usuario);
    toggleFavorite();
  }

  //função para deletar o piu
  let deletePiu = props.delete

  //componente piu
  return <View style={styles.PiuContainer}>
    <View style={{ flexDirection: 'row', flex: 1 }}>
        {props.username == usuarioLogado.data ?
          <TouchableOpacity  onPress={() => navigateToOwnProfile()}>
            <Image style={styles.iconStyle} source={{ uri: props.iconSource }} />
          </TouchableOpacity>
        :<TouchableOpacity  onPress={() => navigateToProfile()}>
            <Image style={styles.iconStyle} source={{ uri: props.iconSource }} />
          </TouchableOpacity>}
      <View style={styles.piuContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.piuwerNome}>{props.name}</Text>
          <Text> @{props.username}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.piuText}>{props.mensagem}</Text>
        </View>
      </View>
      {props.username == usuarioLogado.data ?
        <TouchableOpacity onPress={() => { deletePiu(props.id) }}>
              <Image source={require('../screens/img/bin-icon.png')} />
        </TouchableOpacity>
      :null}
    </View>
    <View style={{alignSelf: 'stretch', justifyContent: 'space-around', flexDirection:'row'}}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end' }} onPress={() => { likeHandler(); }}>
        {liked.status ? <Image source={require('../screens/img/liked-icon.png')} /> : <Image source={require('../screens/img/like-icon.png')} />}
        <Text style={styles.piuText}>{liked.initialCounter}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'flex-end' }} onPress={() => { favoriteHandler() }}>
        {favoritado.status ? <Image source={require('../screens/img/favorited-icon.png')} /> : <Image source={require('../screens/img/favorite-icon.png')} />}
        <Text style={styles.piuText}>{favoritado.initialCounter}</Text>
      </TouchableOpacity>
    </View>    
  </View>
};





const styles = StyleSheet.create({
  PiuContainer: {
    borderWidth: .4,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    marginVertical: 5,
    flex: 1,
    marginHorizontal:10,
    backgroundColor: 'hsla(0, 0%, 96%, .7)'
  },

  iconStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: 'cover',
  },

  piuwerNome: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 2,
  },

  piuContent: {
    marginLeft: 10,
    flexWrap: 'wrap',
    flex: 1,
    alignSelf: 'stretch',

  },

  piuText: {
    fontSize: 18,
  }
})