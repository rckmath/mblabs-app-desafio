import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants';

import api from '../../services/api';

const Home = () => {
    const navigation = useNavigation();

    const [events, setEvents] = useState([])

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

    return( 
        <ImageBackground
            source={ require('../../assets/background-image.png') }
            style={ styles.container }
            imageStyle={{ width: 427, height: 378 }}
        >
                <Image source={ require('../../assets/logo.png') } style={{ width: '70%', alignSelf: 'center' }} resizeMode='contain'/>
                <Text style={ styles.title }>Seu hub de eventos preferido ;)</Text>
                <View style={ styles.events_container }>
                    <SafeAreaView>
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
                                            <Text style={ styles.price_text }> { event.ticket_val > 0 ? 'R$ ' + event.ticket_val : 'Gratuito' } </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>
                    </SafeAreaView> 
                </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: Constants.statusBarHeight,
        alignContent: 'center',
        backgroundColor: '#F0F5F5',
    },
    title: {
        fontSize: 21,
        textAlign: 'left',
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 256,
        marginTop: -24
    },
    events_container: {
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 192
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

export default Home;