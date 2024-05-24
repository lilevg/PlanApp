import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Dimensions } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {log} from "expo/build/devtools/logger";
import {gStyle} from "../styles/style";
const { width } = Dimensions.get('window');

export const AddTodo = ({ item: plan, onSave, cancel }) => {
    const {
        title: initialTitle,
        description: initialDescription,
        importance: initialImportance,
        completed: initialCompleted,
    } = plan;

    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [importance, setImportance] = useState(initialImportance);
    const [completed, setCompleted] = useState(initialCompleted);
    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const handleStartTimeConfirm = (selectedDate) => {
        setStartTime(selectedDate); // Зберігаємо вибраний час початку
        hideStartTimePicker();
    };

    const handleEndTimeConfirm = (selectedDate) => {
        setEndTime(selectedDate); // Зберігаємо вибраний час завершення
        hideEndTimePicker();
    };


    const handleSave = async () => {
        if (!title || !title.trim()) {
            Alert.alert('Error', 'Please enter a title');
            return;
        }
        await onSave({ title, startTime, endTime, description, importance, completed });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Plan</Text>
            <FontAwesome6
                name="add"
                size={24}
                color="white"
                onPress={cancel}
                style={styles.icon}
            />

            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title"
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={showStartTimePicker}>
                <TextInput
                    style={[styles.input, gStyle.placeHolderText]}
                    value={startTime.toISOString()}
                    placeholder="Select Start Time"
                    placeholderTextColor="#888"
                    editable={false}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={showEndTimePicker}>
                <TextInput
                    style={[styles.input, gStyle.placeHolderText]}
                    value={endTime.toISOString()}
                    placeholder="Select End Time"
                    placeholderTextColor="#888"
                    editable={false}
                />
            </TouchableOpacity>
            <TextInput
                style={[styles.input, gStyle.placeHolderText]}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="datetime"
                date={startTime}
                onConfirm={handleStartTimeConfirm}
                onCancel={hideStartTimePicker}
                textColor="#000000"
            />
            <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="datetime"
                onConfirm={handleEndTimeConfirm}
                onCancel={hideEndTimePicker}
                textColor="#000000"
                date={endTime}
            />
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
        color: 'white',
        textAlign: 'center',
    },
    icon: {
        transform: 'rotate(45deg)',
        alignSelf: 'flex-end',
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
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: 150,
        color: 'white',
        marginBottom: 10,
    },
});
