import React, { useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();

    const handleSubmit = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image
                    style={styles.avatar}
                    source={{uri: 'https://www.bootdey.com/img/Content/avatar/avatar8.png'}}
                />
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Current password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry={true}
                />
                <Text style={styles.label}>New password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter a new password"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={true}
                />
                <Text style={styles.label}>Repeat new password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Repeat your new password"
                    value={repeatPassword}
                    onChangeText={setRepeatPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                    <Text style={styles.buttonText}>Change password</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#fff',
    },
    form: {
        width: '80%',
    },
    label: {
        marginTop: 20,
        marginBottom:5
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#1E90FF',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign:'center',
    },
    avatarContainer: {
        marginTop: 10,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default ChangePassword;