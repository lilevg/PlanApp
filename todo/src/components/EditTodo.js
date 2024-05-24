import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { gStyle } from "../styles/style";

export const EditTodo = ({ item, onSave }) => {
    const {
        id,
        title: initialTitle,
        startTime: initialStartTime,
        endTime: initialEndTime,
        description: initialDescription,
        importance: initialImportance,
        completed: initialCompleted,
    } = item;
    const [title, setTitle] = useState(initialTitle);
    const [startTime, setStartTime] = useState(initialStartTime);
    const [endTime, setEndTime] = useState(initialEndTime);
    const [description, setDescription] = useState(initialDescription);
    const [importance, setImportance] = useState(initialImportance);
    const [completed, setCompleted] = useState(initialCompleted);

    const handleSave = () => {
        onSave({ id, title, startTime, endTime, description, importance, completed });
    };

    return (
        <View style={[styles.container, gStyle.container]}>
            <View style={[gStyle.smthOnOneLine, { justifyContent: 'space-between', alignItems: 'center' }]}>
                <Text style={styles.title}>Edit Plan</Text>
                <FontAwesome6 name="add" size={24} color="white" onPress={handleSave} style={{transform: 'rotate(45deg)'}}/>
            </View>

            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
            />
            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={startTime}
                onChangeText={setStartTime}
                placeholder="Enter start time"
            />
            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={endTime}
                onChangeText={setEndTime}
                placeholder="Enter end time"
            />
            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
            />
            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={importance}
                onChangeText={setImportance}
                placeholder="Enter importance"
            />
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText} onPress={() => setCompleted(true)}>Complete task</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000',
        borderRadius: 10,
        padding: 20,
        top: '33%',
        width: '100%', // Set width to 100% to make it full width
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
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
        color: 'white',
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
