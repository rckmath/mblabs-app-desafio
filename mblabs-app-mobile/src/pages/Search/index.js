import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput, Picker } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants';
import api from '../../services/api';

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
                <View style={ styles.events_container }>
                    <ScrollView
                        vertical
                        showsVerticalScrollIndicator={ false }
                        contentContainerStyle={{ paddingVertical: 16 }}
                    >
                        {events.map(event => (
                            <View style={ styles.event } key={ String(event.id) }>
                                <TouchableOpacity onPress={ () => { handleNavigationToEventDetails(event) } }>
                                    <Text style={ styles.event_title }>{ event.name }</Text>
                                    <View style={ styles.tags_container }>
                                        <Icon name='tag-multiple' size={ 18 } color='#8370AD' allowFontScaling/>
                                        { event.categories.map(category => (
                                            <View style={ styles.tag_container } key={ String(category.id) }>
                                                <TouchableOpacity>
                                                    <Text style= { styles.tag_title }>{ category.name }</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))}
                                    </View>
                                    <View style={ styles.info_container }>
                                        <Text style={ styles.info_text }>{ event.description }</Text>
                                    </View>
                                    <View style={ styles.bottom_info_container }>
                                        <Text style={ styles.price_text }> { 'R$' + event.ticket_val } </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                </View>
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
        marginBottom: 192
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
    event: {
        flex: 1,
        backgroundColor: '#f0f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
        height: 144,
        width: 288,
        borderRadius: 4,
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 16,
        marginRight: 8,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    event_title: {
        fontFamily: 'Ubuntu_700Bold',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
      },
    tags_container: {
        marginTop: 8,
        flexDirection: 'row'
    },
    info_container: {
        marginTop: 8,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    info_text: {
        fontSize: 10,
        marginTop: 8,
        fontFamily: 'Roboto_400Regular',
    },
    bottom_info_container: {
        marginTop: 8,
    },
    price_text: {
        fontSize: 12,
        fontFamily: 'Roboto_400Regular',
        textAlign: 'right',
        color: '#8370AD',
        fontWeight: 'bold',
    },
    tag_container: {
        backgroundColor: '#8370AD',
        borderRadius: 32,
        width: 60,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4
    },
    tag_title: {
        fontSize: 10,
        color: '#f0f5f5',
        fontFamily: 'Roboto_400Regular'
    }
});

export default Search;