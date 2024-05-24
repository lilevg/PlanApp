import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from "react-native";
import {useNavigation} from "@react-navigation/native";

export const Todo = ({todo, onRemove}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('FullPlan', {todo})}
            onLongPress={onRemove.bind(null, todo.id)}
        >
            <View style={styles.todo}>
                <Text style={styles.text}>{todo.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        borderRadius: 5,
        marginBottom: 10,
    },
    text: {
        color: '#FFF'
    }
})