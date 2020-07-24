import React, { useState, useEffect, async } from 'react';
import { Alert, View, Text, TextInput, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import api from '../../services/api';
import { CpfMask } from '../../utils/CpfMask';

const SignIn = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [icon, setIcon] = useState('eye-off');
    const [hidePassword, setHidePassword] = useState(true);
    
    _changeIcon = () => {
        icon !== 'eye-off'
        ? (setIcon('eye-off'), setHidePassword(false))
        : (setIcon('eye'), setHidePassword(true))
    }

    function handleCpfFieldChange(text){
        setCpf(CpfMask(text));
    }

    const signIn = async () => {
        await api.post('/login', {
            email,
            password: pass
        })
        .then(res => {
            if(res.data.auth && (res.status == 200))
                Alert.alert('Booouaaa', 'Login efetuado com sucesso, meu compatriota! ;)');

            setEmail('');
            setPass('');

            navigation.navigate('Home');
        })
        .catch(err => {
            console.log(err);
            Alert.alert('Ooooops...', 'Alguma coisa deu errado. Verifique suas credenciais de acesso e tente novamente!');
        })
    }
    
    const signUp = async () => {
        if(pass != passConfirm)
            return Alert.alert('Ooooops...', 'Caro compatriota, as senhas não coincidem, favor verificar!');

        await api.post('/users', {
            name,
            cpf,
            email,
            password: pass,
            type: 3
        })
        .then(res => {
            if(res.status == 200){
                setEmail('');
                setPass('');
                setCpf('');
                setPassConfirm('');
                setName('');
                setIsSignUp(false);

                Alert.alert('Booouaaa', 'Cadastro efetuado com sucesso, agora é só logar e aproveitar o app ;)');
            }
        })
        .catch(err => {
            let error_message = 'Alguma coisa deu errado.';

            if(err.response.status == 409)
                error_message = 'Parece que já existe alguém cadastrado com este e-mail. Uma dica: use outro ;)';

            Alert.alert('Ooooops...', error_message);
        })
    }

    return (
        <ImageBackground
            source={ require('../../assets/background-image.png') }
            style={ styles.container }
            imageStyle={{ width: 427, height: 378 }}
        >
            <SafeAreaView>
                <ScrollView
                    vertical
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={{ paddingVertical: 32 }}
                >
                    <Text style={ styles.title }>{ isSignUp ? 'Cadastro' : 'Login' }</Text>
                    {
                        isSignUp &&
                        <>
                            <Text style={ styles.input_title }>Nome completo:</Text>
                            <TextInput
                                style={ styles.input_box }
                                placeholder='Insira seu nome completo'
                                placeholderTextColor="#AAA"
                                onChangeText={ text => setName(text) }
                                defaultValue={ name }
                                value={ name }
                                onFocus={ () => {  } }
                            />
                            <Text style={ styles.input_title }>CPF:</Text>
                            <TextInput
                                style={ styles.input_box }
                                placeholder='Insira seu CPF'
                                placeholderTextColor="#AAA"
                                onChangeText={ text => handleCpfFieldChange(text) }
                                value={ cpf }
                                keyboardType='number-pad'
                                onChange={ () => { handleCpfFieldChange(cpf) } }
                            />
                        </>
                    }

                    <Text style={ styles.input_title }>E-mail:</Text>
                    <TextInput
                        style={ styles.input_box }
                        placeholder='Insira seu e-mail'
                        placeholderTextColor="#AAA"
                        onChangeText={ text => setEmail(text) }
                        defaultValue={ email }
                        value={ email }
                        keyboardType='email-address'
                    />
                    <Text style={ styles.input_title }>Senha:</Text>
                    <View style={ styles.input_pass }>
                        <TextInput
                            style={ styles.input_pass_range }
                            placeholder='Insira sua senha'
                            placeholderTextColor="#AAA"
                            secureTextEntry={ hidePassword }
                            onChangeText={ text => setPass(text) }
                            defaultValue={ pass }
                            value={ pass }
                        />
                        <Icon style={ styles.input_icon } name={icon} size={ 20 } onPress={() => _changeIcon()} color='#8370AD'/>
                    </View>
                
                    {
                        isSignUp &&
                        <>
                            <Text style={ styles.input_title }>Confirme a senha:</Text>
                            <TextInput
                                style={ styles.input_box }
                                placeholder='Insira a senha novamente'
                                placeholderTextColor="#AAA"
                                secureTextEntry
                                onChangeText={ text => setPassConfirm(text) }
                                defaultValue={ passConfirm }
                                value={ passConfirm }
                            />
                        </>
                    }

                    <TouchableOpacity onPress={() => { setIsSignUp(!isSignUp) }}>
                        <Text style={ styles.switch }>{ isSignUp ? 'Efetue login' : 'Não tem uma conta? Cadastre-se'}</Text>
                    </TouchableOpacity>
                
                    <TouchableOpacity style={ styles.button } onPress={() => { isSignUp ? signUp() : signIn() }}>
                        <Text style={ styles.button_text }>{ isSignUp ? 'Cadastrar' : 'Logar' }</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView> 
        </ImageBackground>
    );
};


// 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        paddingTop: Constants.statusBarHeight,
        justifyContent: 'center',
        backgroundColor: '#F0F5F5',
    },
    title: {
        fontSize: 21,
        textAlign: 'left',
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 256,
        marginTop: -24,
        paddingBottom: 24,
    },
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
    input_icon: {
        position: 'absolute',
        marginLeft: 256,
        padding: 6,
    },
    input_pass: {
        flexDirection: 'row',
        height: 32,
        borderColor: '#AAA',
        borderWidth: 1,
        borderRadius: 16,
        color: '#303030',
        paddingLeft: 16,
    },
    input_pass_range: {
        width: 224
    },
    switch: {
        marginTop: 8,
        fontFamily: 'Roboto_400Regular',
        textAlign: 'right'
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

export default SignIn;
