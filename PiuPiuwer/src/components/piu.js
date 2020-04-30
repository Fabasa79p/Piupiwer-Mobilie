import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';

export default function PiuBox(props) {
    return <View style={styles.PiuContainer}>
        <View style={{ flexDirection: 'row', flex:1}}>
            <Image style={styles.iconStyle} source={props.iconSource} />
            <View style={styles.piuContent}>
                <View style={{ flexDirection: 'row', alignItems:'center' }}>
                    <Text style={styles.piuwerNome}>{props.name}</Text>
                    <Text>{props.username}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.piuText}>{props.mensagem}</Text>
                </View>
            </View>
              {props.name=='Renato'?
                <View style={{alignSelf:'stretch', justifyContent:'space-between'}}>
                  <Image source={require('../screens/img/arrow-icon.png')} />
                  <Image source={require('../screens/img/like-icon.png')} />
                </View>
              :
                <Image style={{alignSelf:'flex-end'}} source={require('../screens/img/like-icon.png')} />}
        </View>
      </View>
};


const styles = StyleSheet.create({
  PiuContainer: {
    borderWidth: .5,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    marginVertical: 5,
    flex:1,
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
    flex:1,
    alignSelf:'stretch',
    
  },

  piuText: {
    fontSize: 18,
  }
})