import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { likePiu } from '../api/likePiu'

export default function PiuBox(props) {
  // console.log(navigation)

  function navigateToProfile() {
    props.navigation.navigate('Profile', { id: props.op_id });
  }



  const [usuarioLogado, setUsuario] = useState({ data: null, loaded: false })
  async function getUsuario() {
    const value = await AsyncStorage.getItem('usuarioLogado');
    setUsuario({ data: value, loaded: true });
  }

  if (usuarioLogado.data == null) {
    getUsuario()
  }
  const [liked, setLiked] = useState({ status: false, initialCounter: props.counter, alreadyLiked: false })
  if (props.likeStatus) {
    useEffect(() => { setLiked({ status: true, initialCounter: props.counter, alreadyLiked: true }) }, [])
  }
  function toggleLike() {
    if (liked.alreadyLiked) {
      if (liked.status) { setLiked({ status: false, initialCounter: props.counter - 1 }) }
      if (!liked.status) { setLiked({ status: true, initialCounter: props.counter }) }
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

  let deletePiu = props.delete

  return <View style={styles.PiuContainer}>
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <TouchableOpacity onPress={() => navigateToProfile()}>
        <Image style={styles.iconStyle} source={{ uri: props.iconSource }} />
      </TouchableOpacity>
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
      <TouchableOpacity>
        <Image source={require('../screens/img/favorite-icon.png')} />
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