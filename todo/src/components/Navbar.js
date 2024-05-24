import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export const Navbar = (props) => {
    const [modalWindowMenu, setModalWindowMenu] = useState(false);
    const navigation = useNavigation();

    const toggleMenu = () => {
        setModalWindowMenu(!modalWindowMenu);
    };

    const pressMenuItem = (pageName) => {
        navigation.navigate(pageName);
        toggleMenu();
    }

    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{props.title}</Text>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
                <Entypo name="menu" size={30} color="white" />
            </TouchableOpacity>
            <Modal visible={modalWindowMenu} transparent={true} animationType="fade">
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={toggleMenu} style={styles.menuIcon}>
                        <Entypo name="menu" size={30} color="white" />
                    </TouchableOpacity>
                    <View style={styles.menu}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => pressMenuItem('Profile')}>
                            <Text style={styles.menuItemText}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuItemText}>Option 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem}>
                            <Text style={styles.menuItemText}>Option 3</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        height: 50, // Зміна висоти навбару
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#282828',
        paddingBottom: 10,
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10, // Збільшення відступу знизу тексту
    },
    menuIcon: {
        paddingRight: 10,
    },
    menuContainer: {
        top: 50,
        left: '50%',
        alignItems: 'flex-start',
        backgroundColor: '#000000',
    },
    menu: {
        width: 200,
        // backgroundColor: '#fff',
        elevation: 8,
        paddingVertical: 10,
    },
    menuItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    menuItemText: {
        fontSize: 18,
        color: '#ffffff',
    },
});
