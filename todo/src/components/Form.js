import React from 'react';
import {View, StyleSheet, TextInput, Button, Alert} from "react-native";
import {Formick} from "formick";

export const Form = () => {
    return (
        <View>
            <Formick initialValues={{name: '', surname: '', email: ''}} onSubmit={(values) => {
                console.log(values)
            }}>

            </Formick>
        </View>
    )
}

