import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

class TagButton extends Component {
    render() {
        return (
            <View style={ styles.container }>
                <TouchableOpacity>
                    <Text style= { styles.title }>Tecnologia</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8370AD',
        borderRadius: 32,
        width: 60,
        height: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4
    },
    title: {
        fontSize: 10,
        color: '#f0f5f5',
        fontFamily: 'Roboto_400Regular'
    }
});

export default TagButton;
