import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView } from 'react-native';
import { AppLoading } from 'expo';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants';
import api from '../../services/api';
import axios from 'axios';

const EventDetails = ({ route }) => {
    const navigation = useNavigation();

    const { event } = route.params;
    const [institution, setInstitution] = useState(false);
    const [address, setAddress] = useState(false);

    function convertDate(date){
        const temp = new Date(date);
        return temp.getDate() + '/' + (temp.getMonth() + 1) + '/' + temp.getFullYear();
    }

    useEffect(() => {
        async function getInstitutionAndAddress(){
            axios.all([
                api.get('/institutions?id_institution=' + event.id_instituicao),
                api.get('/cep?val=' + event.zipcode)
            ])
            .then(axios.spread((inst, addr) => {
                setInstitution(inst.data);
                setAddress(addr.data);
            }))
            .catch(err => {
                console.log(err);
            });
        }
        if(event.id)
            getInstitutionAndAddress();
    }, []);

    function handleNavigateBack(){
        navigation.goBack();
    }

    function handleAddToCart(){
        navigation.navigate('Carrinho', {

        });
    }

    // Não exibe os elementos em tela enquanto não receber a instituição e o endereço da API
    if(!institution || !address)
        return <AppLoading/>

    return (
        <View style={ styles.container }>
            <TouchableOpacity onPress={ handleNavigateBack }>
                <Icon name='arrow-left-bold' size={ 24 } color='#8370AD'/>
            </TouchableOpacity>
            <Text style={ styles.title }>{ event.name }</Text>
            <View style={ styles.line_style } />
            <View style={ styles.categories }>
                <Icon name='tag-multiple' size={ 18 } color='#8370AD' allowFontScaling/>
                <Text style={ styles.categories_text }>{ event.categories.map(category => (' • ' + category.name)) }</Text>
            </View>
            
            <SafeAreaView>
                <ScrollView
                        vertical
                        showsVerticalScrollIndicator={ false }
                        contentContainerStyle={{ paddingBottom: 96 }}
                    >
                    <Text style={ styles.subtitle }>Descrição</Text>
                    <Text style={ styles.description_text }>{ event.description }</Text>
                    <Text style={ styles.subtitle }>Instituição</Text>
                    <Text style={ styles.description_text }>{ institution.name }</Text>
                    <Text style={ styles.subtitle }>Local</Text>
                    <>
                        <Text style={ styles.description_text } key={ String(address.id) }>{ address.street },</Text>
                        <Text style={ styles.address_text }>{ address.neighborhood }, Nº { event.num }</Text>
                        <Text style={ styles.address_text }>{ address.city }, { address.state } - { address.cep }</Text>
                    </>
                    <Text style={ styles.subtitle }>Data e horário</Text>
                    <Text style={ styles.description_text }>{ convertDate(event.event_date) } às { event.event_time }</Text>
                    <Text style={ styles.subtitle }>Ingresso</Text>
                    <View style={ styles.bottom }>
                        <Text style={ styles.description_text }>Quantidade disponível: { event.tickets_qty == 9999 ? 'não se aplica' : event.tickets_qty }</Text>
                        <Text style={ styles.ticket_price }>Valor: { event.ticket_val == 0 ? 'Gratuito' : 'R$' + event.ticket_val }</Text>
                    </View>
                    <TouchableOpacity style={ styles.button } onPress={ handleAddToCart }>
                        <Text style={ styles.button_text }>Adicionar ao carrinho</Text>
                    </TouchableOpacity>
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
    line_style: {
        borderWidth: 0.5,
        borderColor: '#8370AD',
        marginVertical: 8,
    },
    categories: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        paddingBottom: 8
    },
    categories_text: {
        marginLeft: 8,
        fontFamily: 'Roboto_400Regular',
        color: '#8370AD'
    },
    subtitle: {
        marginTop: 20,
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 20,
    },
    description_text: {
        marginTop: 8,
        fontFamily: 'Roboto_400Regular',
        color: '#8370AD',
        textAlign: 'justify'
    },
    address_text: {
        fontFamily: 'Roboto_400Regular',
        color: '#8370AD'
    },
    bottom: {
       flex: 1,
       flexDirection: 'row',
       justifyContent: 'space-between'
    },
    ticket_price:{
        marginTop: 8,
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        color: '#8370AD',
    },
    button: {
        marginTop: 32,
        backgroundColor: '#8370AD',
        borderRadius: 4,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_text: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 14,
        color: '#F0F5F5',
    },
});

export default EventDetails;
