import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import {useNavigation} from '@react-navigation/native';

export default function WelcomePrincipal(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>MEPI</Text>
            <Text style={styles.subtitle}>Monitoramento de EPI</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('LoginPrincipal')}
            >
                <Text style={styles.buttonText}>Acessar</Text>
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
        borderRadius: 40,
        borderColor: '#D8AE5E',
        borderWidth:2
    },
    buttonText: {
        fontSize: 18,
        color: '#D8AE5E'
    }
})