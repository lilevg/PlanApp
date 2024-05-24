import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import {gStyle} from "../styles/style";
const { width } = Dimensions.get('window');


export const EditProfile = ({ onSave, item: user }) => {
    const {
        name: initialName, surname: initialSurname, email: initialEmail
    } = user;
    const [name, setUserName] = useState(initialName);
    const [surname, setUserSurname] = useState(initialSurname);
    const [email, setEmail] = useState(initialEmail);
    const handleSave = () => {
        onSave({ name, surname, email });
    };

    return (
        <View style={styles.container}>
            <View style={gStyle.smthOnOneLine}>
                <FontAwesome6 name="add" size={24} color="white" onPress={handleSave} style={{transform: 'rotate(45deg)'}}/>
            </View>

            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={name}
                onChangeText={setUserName}
                placeholder='Change name'
            />
            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={surname}
                onChangeText={setUserSurname}
                placeholder='Change surname'
            />
            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={email}
                onChangeText={setEmail}
                placeholder='Change email'
            />
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: width - 40, // Make the container full width minus some padding
        backgroundColor: '#000000',
        borderRadius: 10,
        padding: 20,
        margin: 20,
        alignSelf: 'center', // Center the container horizontally
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white'
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#282828',
        padding: 15,
        borderRadius: 20,
        marginBottom: 10,
        color: 'white'
    },
    button: {
        backgroundColor: '#282828',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

