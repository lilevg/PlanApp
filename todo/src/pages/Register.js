import React, { useState } from 'react';
import {View, TextInput, Button, Image, TouchableOpacity, Text, StyleSheet} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {FontAwesome5, MaterialIcons} from "@expo/vector-icons";
import { FontAwesome6 } from '@expo/vector-icons';

const Registration = ({onSignIn}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const storeData = async (userId) => {
        try {
            await AsyncStorage.setItem('userId', userId);
        } catch (e) {
            console.error(e)
        }
    };
    const handleRegister = async () => {
        // Проверка наличия всех данных перед отправкой запроса
        if (!name || !surname || !email || !password) {
            console.error("Please fill in all fields");
            return;
        }

        // Проверка, что пароль и его подтверждение совпадают
        // if (password !== repeatPassword) {
        //     console.error("Passwords do not match");
        //     return;
        // }

        try {

            console.log(email)
            const response = await fetch('http://192.168.1.100:8000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password,
                }),
            });
            console.log(response)
            const data = await response.json();
            console.log(data)
            if(data.token){
                await storeData(data.user.id);
                onSignIn(true);
            }
            console.log(data);
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <FontAwesome6 name="user-large" size={24} color="white"  style={styles.inputIcon}/>
                <TextInput
                    style={styles.inputs}
                    placeholder="Name"
                    keyboardType="name"
                    underlineColorAndroid="transparent"
                    onChangeText={name => setName(name)}
                    placeholderTextColor={'white'}
                />
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome6 name="user-large" size={24} color="white"  style={styles.inputIcon}/>
                <TextInput
                    style={styles.inputs}
                    placeholder="Surname"
                    keyboardType="name"
                    underlineColorAndroid="transparent"
                    onChangeText={surname => setSurname(surname)}
                    placeholderTextColor={'white'}
                />
            </View>
            <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={24} color="white" style={styles.inputIcon} />
                <TextInput
                    style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid="transparent"
                    onChangeText={email => setEmail(email)}
                    placeholderTextColor={'white'}
                />
            </View>

            <View style={styles.inputContainer}>
                <FontAwesome5 name="key" size={24} color="white" style={styles.inputIcon}/>
                <TextInput
                    style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid="transparent"
                    onChangeText={password => setPassword(password)}
                    placeholderTextColor={'white'}
                />
            </View>
            {/*<View style={styles.inputContainer}>*/}
            {/*    <Image*/}
            {/*        style={styles.inputIcon}*/}
            {/*        source={{ uri: 'https://img.icons8.com/ios-glyphs/512/key.png' }}*/}
            {/*    />*/}
            {/*    <TextInput*/}
            {/*        style={styles.inputs}*/}
            {/*        placeholder="Repeat your password"*/}
            {/*        secureTextEntry={true}*/}
            {/*        underlineColorAndroid="transparent"*/}
            {/*        onChangeText={password => setRepeatPassword(repeatPassword)}*/}
            {/*    />*/}
            {/*</View>*/}
            <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={handleRegister}>
                <Text style={styles.loginText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#282828',
    },
    inputContainer: {
        borderBottomColor: '#191919',
        backgroundColor: '#191919',
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
        borderBottomColor: '#FFFFFF',
        flex: 1,
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
    loginText: {
        color: 'white',
    },
})
export default Registration;
