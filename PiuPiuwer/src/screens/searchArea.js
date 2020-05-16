import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, StatusBar, Image, Button, TextInput, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import ProfileComponent from '../components/profile'
import SearchItem from '../components/searchItem'
import { loadProfile } from '../api/loadProfile'
import { searchTerm } from '../api/searchResults'
import LinearGradient from 'react-native-linear-gradient';


export default function searchArea({route, navigation}) {
    let [resultados, setResultados] = useState({
        data: null,
        loaded: false
    });
    const { termo } = route.params
    // console.log(`Termo ${termo}`)

    async function loadResultados() {
        console.log(termo)
        const resultadosBusca = await searchTerm(termo)
        setResultados({
          data: resultadosBusca,
          loaded: true,
        });
    }
      
    function viewUser() {
        if (!resultados.loaded) {
            loadResultados();
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
                        Carregando...
                    </Text>
                </View>
            );
        } else {
            return (
                <LinearGradient style={{ flex: 1 }} colors={['#ffffff', 'hsla(207, 55%, 62%, 0.2)']} >
                    { resultados.data.length >0?
                        <View>
                            <View>
                                <Text style={{fontSize:30, textAlign:'center', marginVertical:10}}>Resultados da busca</Text>
                            </View>
                            <FlatList
                                data={resultados.data}
                                renderItem={({ item }) => {
                                    return <SearchItem id={item.id} name={`${item.first_name} ${item.last_name}`} username={item.username} iconSource={item.foto} navigation={navigation} />
                                }}
                            />
                        </View>
                    : <Text style={{fontSize:40, textAlign: "center", marginTop:40}}>Ops! Parece que não encontramos nada.</Text> 
                    }
                </LinearGradient>
                    
            );
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {viewUser()}

        </View>
    );

}
