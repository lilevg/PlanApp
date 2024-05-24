import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EditProfile } from "../components/EditProfile";
import { getUserId } from "../functions/getUserId";
import { getUserInfo } from "../functions/getUserInfo";

export const Profile = ({ onSignIn }) => {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userEmail, setEmail] = useState('');
    const [userInfo, setUserInfo] = useState({});
    const [modalWindowEdit, setModalWindowEdit] = useState(false);

    const handleSignout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            onSignIn(false); // Trigger sign out
        } catch (e) {
            console.error(e);
        }
    };

    const handleSave = async (editedItem) => {
        setModalWindowEdit(false);
        try {
            const response = await fetch(`http://192.168.1.100:8000/user/${userId}`, {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editedItem.name,
                    surname: editedItem.surname,
                    email: editedItem.email,
                }),
            });
            const result = await response.json();
            // Update local state with the new user information
            setUserName(result.name);
            setUserSurname(result.surname);
            setEmail(result.email);
            setUserInfo(result);
        } catch (e) {
            console.error(e.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = await getUserId();
                if (user_id) {
                    setUserId(user_id);
                    const user = await getUserInfo(user_id);
                    setUserName(user.name);
                    setUserSurname(user.surname);
                    setEmail(user.email);
                    setUserInfo(user);
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatar}>{`${userName ? userName.charAt(0) : ''} ${userSurname ? userSurname.charAt(0) : ''}`}</Text>
                </View>

                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{`${userName} ${userSurname}`}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoText}>{userEmail}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalWindowEdit(true)} style={[styles.button, { backgroundColor: '#282828' }]}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSignout}>
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
                <Modal visible={modalWindowEdit} transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <EditProfile onSave={handleSave} item={userInfo} />
                    </View>
                </Modal>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#191919',
    },
    body: {
        marginTop: 120,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 0.16,
    },
    avatar: {
        color: 'white',
        fontSize: 72,
        fontWeight: '700',
    },
    nameContainer: {
        marginTop: 24,
        alignItems: 'center',
    },
    name: {
        color: 'white',
        fontSize: 24,
        fontWeight: '600',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
        marginRight: 8,
    },
    infoText: {
        color: '#ffffff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
