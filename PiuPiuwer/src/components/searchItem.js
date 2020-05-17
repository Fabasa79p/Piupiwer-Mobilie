import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

export default function SearchItem(props) {
  //função de navegação
  function navigateToProfile() {
    props.navigation.navigate('Profile', { id: props.id });
  }

  //componente item de navegação
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
      </View>
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