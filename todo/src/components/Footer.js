import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import {useNavigation} from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export const Footer = () => {
    const navigation = useNavigation()
    const loadScene = () => {
        navigation.navigate('Profile')
    }
    const toSearch = () => {
        navigation.navigate('Search')
    }
    const toProfile = () => {
        navigation.navigate('Mynew')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={loadScene}>
                <FontAwesome5 name="user-alt" size={25} color="white"  tyle={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toSearch}>
                <FontAwesome name="search" size={24} color="white"  tyle={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity  onPress={toProfile}>
                <MaterialCommunityIcons name="book-open-variant" size={24} color="white"  tyle={styles.icon}  />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#282828',
        paddingVertical: 10,
        height: 70,
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 5,
        tintColor: 'white'
    },
});
