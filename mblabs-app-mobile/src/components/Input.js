import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

class Input extends Component {
    render() {
        return (
            <View>
                <Text style={ styles.input_title }>{ this.props.name }</Text>
                <TextInput
                    style={ styles.input_box }
                    placeholder={ 'Insira seu ' + this.props.field }
                    placeholderTextColor="#AAA"
                    onChangeText={ text => this.props.setVal(text) }
                    defaultValue={ this.props.value }
                    value={ this.props.val }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    input_title: {
        marginTop: 12,
        marginBottom: 6,
        color: '#8370AD',
        fontFamily: 'Roboto_500Medium',
        fontWeight: 'bold',
    },
    input_box: {
        height: 32,
        borderColor: '#AAA',
        borderWidth: 1,
        borderRadius: 16,
        color: '#303030',
        paddingLeft: 16,
    },
});

export default Input;