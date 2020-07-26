import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants';
import api from '../../services/api';

import Card from '../../components/Card';

const Search = () => {
    const navigation = useNavigation();

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        function getEvents(){
            api.get('/institutions/events').then(res => {
                setEvents(res.data);
            });
        }
        getEvents();
    }, []);

    function handleNavigationToEventDetails(event) {
        navigation.navigate('DetalhesEvento', {
            event
        });
    }

    return (
        <View style={ styles.container }>
            <SafeAreaView>
                <TextInput
                    style={ styles.input_box }
                    placeholder='Faça sua busca'
                        placeholderTextColor="#AAA"
                        onChangeText={ text => setSearch(text) }
                        defaultValue={ search }
                        value={ search }
                        keyboardType='default'
                />
                <MaterialIcons style={ styles.input_icon } name='search' size={ 20 } onPress={ () => {  } } color='#8370AD'/>
                <TouchableOpacity style={ styles.filter_container }>
                    <Icon name='filter' size={ 14 } color='#F0F5F5'/>
                    <Text style={ styles.filter_text }>Filtros</Text>
                </TouchableOpacity>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={{ paddingVertical: 16 }}
                >
                    <View style={ styles.events_container }>
                        { events != undefined && (events.map(event => (
                            <Card event={ event } navigation={ navigation } key={ event.id }/>)
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#F0F5F5',
      
    },
    title: {
        marginTop: 16,
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 24,
        color: '#8370AD',
    },
    events_container: {
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 80
    },
    input_box: {
        height: 32,
        borderColor: '#AAA',
        borderWidth: 1,
        borderRadius: 16,
        color: '#303030',
        paddingLeft: 40,
    },
    input_icon: {
        position: 'absolute',
        marginLeft: 6,
        padding: 6,
    },
    filter_container: {
        flexDirection: 'row',
        padding: 3,
        marginTop: 16,
        backgroundColor: '#8370AD',
        width: '25%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
    },
    filter_text: {
        fontSize: 14,
        fontFamily: 'Roboto_400Regular',
        color: '#F0F5F5',
        marginLeft: 4,
    },
});

export default Search;