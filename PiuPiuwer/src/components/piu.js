import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { deletePiu } from '../api/deletePiu'
import { loadPius } from '../api/loadPius'

export default function PiuBox(props) {
  const [usuarioLogado, setUsuario] = useState({data: null, loaded: false})
  async function getUsuario() {
    const value = await AsyncStorage.getItem('usuarioLogado');
    setUsuario({data: value, loaded: true});
  }

  if (usuarioLogado.data == null) {
    getUsuario()
  }

  async function loadPiusData() {
    const pius = await loadPius();
    console.log("Passei aqui")
    console.log(pius);
  }

  async function deletePiuFunctions(deleteId){
    await deletePiu(deleteId)
    console.log("Ei")
    loadPiusData()
  }

  return <View style={styles.PiuContainer}>
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <Image style={styles.iconStyle} source={{ uri: props.iconSource }} />
      <View style={styles.piuContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.piuwerNome}>{props.name}</Text>
          <Text>{props.username}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.piuText}>{props.mensagem}</Text>
        </View>
      </View>
      {props.username == ` @${usuarioLogado.data}` ?
        <View style={{ alignSelf: 'stretch', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => { deletePiuFunctions(props.id) }}>
            <Image source={require('../screens/img/bin-icon.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../screens/img/like-icon.png')} />
          </TouchableOpacity>
        </View>
        :
        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
          <Image source={require('../screens/img/like-icon.png')} />
        </TouchableOpacity>
      }
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