import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Home(){

    return(
        <View>
            <Text>MEPI</Text>
            <Text>Monitoramento de EPI</Text>
            <TouchableOpacity>
                <Text>Acessar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4A5B48',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 48,
        color: '#D8AE5E',
        marginBottom: 16
    },
    subtitle: {
        fontSize: 24,
        color: '#D8AE5E',
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#4A5B48',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderColor: '#D8AE5E'
    },
    buttonText: {
        fontSize: 18,
        color: '#D8AE5E'
    }
})