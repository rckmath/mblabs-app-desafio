import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import TagButton from './TagButton';

function handleNavigationToEventDetails(event, navigation) {
    navigation.navigate('DetalhesEvento', {
        event
    });
}

class Card extends Component {
    render() {
        return (
            <View style={ styles.event }>
                <TouchableOpacity onPress={() => { handleNavigationToEventDetails(this.props.event, this.props.navigation) }}>
                    <Text style={ styles.event_title }>{ this.props.event.name }</Text>
                    
                    <View style={ styles.tags_container }>
                        <Icon name='tag-multiple' size={ 18 } color='#8370AD' allowFontScaling/>
                        { this.props.event.categories.map(category => (
                            <TagButton name={ category.name } key={ category.id }/>
                        ))}
                    </View>

                    <View style={ styles.info_container }>
                        <Text numberOfLines={2} style={ styles.info_text }>{ this.props.event.description }</Text>
                    </View>

                    <View style={ styles.bottom_info_container }>
                        <Text style={ styles.price_text }> { this.props.event.ticket_val > 0 ? 'R$ ' + this.props.event.ticket_val : 'Gratuito' } </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
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
});

export default Card;
