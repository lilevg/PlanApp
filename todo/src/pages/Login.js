import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {storeUserId} from "../functions/storeUserId";
import {getUserInfo} from "../functions/getUserInfo";
import {log} from "expo/build/devtools/logger";
import {gStyle} from "../styles/style";

const Login = ({ onSignIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const handleLogin = async () => {
        const response = await fetch('http://192.168.1.100:8000/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const user = await response.json();
        console.log(user)
        if(user.refreshToken){
            await storeUserId(user.user.id);

            await onSignIn(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="white" style={styles.inputIcon} />
                <TextInput
                    style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={'white'}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome5 name="key" size={24} color="white" style={styles.inputIcon}/>
                <TextInput
                    style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor={'white'}
                />
            </View>

            <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={handleLogin}>
                <Text style={gStyle.placeHolderText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => navigation.navigate("Registration")}>
                <Text style={gStyle.placeHolderText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#191919',
    },
    inputContainer: {
        borderBottomColor: '#282828',
        backgroundColor: '#282828',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputs: {
        fontFamily: 'poppins-thin',
        height: 45,
        marginLeft: 16,
        flex: 1,
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
        color: 'white'
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: '#000000',
    },
});

export default Login;
