import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants';

import Card from '../../components/Card';
import api from '../../services/api';

const Home = () => {
    const navigation = useNavigation();

    const [events, setEvents] = useState([])

    useEffect(() => {
        function getEvents(){
            api.get('/institutions/events')
            .then(res => {
                setEvents(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        }
        getEvents();
    }, []);

    // Não exibe os elementos em tela enquanto não receber a instituição e o endereço da API
    if(!events)
        return <AppLoading/>

    return( 
        <ImageBackground
            source={ require('../../assets/background-image.png') }
            style={ styles.container }
            imageStyle={{ width: 427, height: 378 }}
        >
            <Image source={ require('../../assets/logo.png') } style={{ width: '70%', alignSelf: 'center' }} resizeMode='contain'/>
            <Text style={ styles.title }>Seu hub de eventos preferido ;)</Text>
            <SafeAreaView>
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
        marginBottom: 160
    },
});

export default Home;