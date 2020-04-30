import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';

const PiuBox = (props) =>{
    return <View style={styles.PiuContainer}>
        <View style={{ flexDirection: 'row' }}>
            <Image style={styles.iconStyle} source={props.iconSource} />
            <View style={styles.piuContent}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.piuwerNome}>{props.name}</Text>
                    <Text>{props.username}</Text>
                </View>
                <View style={{flexDirection: 'row' }}>
                    <Text>conteudo do piu wstagbhnj ewfgtydhsanm wfet gsdayh</Text>
                </View>
            </View>
        </View>
    </View>
};

export default PiuBox;

const styles = StyleSheet.create({

PiuContainer: {
    borderWidth: .5,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'column',
    marginVertical: 5,
},
  iconStyle: {
    height: 50,
    width: 50,
    borderRadius: 50,
    resizeMode: 'cover',
  },

  piuwerNome: {
    fontWeight: 'bold',
    marginHorizontal: 2,
    fontSize: 15,
  },

  piuContent: {
    marginLeft: 2,
    flexWrap: 'wrap',
    flex:1,
  },
})