import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import {useNavigation} from '@react-navigation/native';

export default function WelcomePrincipal(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>
            <Image source={require('../assets/capacete.png')} style={styles.logo}/>
            <Text style={styles.title}>MEPI</Text>
            <Text style={styles.subtitle}>M O N I T O R A M E N T O
            {'\n'}  
            D E   E P I</Text>
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
    },
    title: {
        fontSize: 48,
        color: '#D8AE5E',
        fontFamily: 'Brice-RegularSemiExpanded',
        marginTop:'-19%'
    },
    subtitle: {
        fontSize: 24,
        color: '#D8AE5E',
        fontFamily: 'Corporate-S-SC-Regular',
        textAlign:'center',
    },
    button: {
        backgroundColor: '#4A5B48',
        paddingVertical: 15,
        paddingHorizontal: 48,
        borderRadius: 40,
        borderColor: '#D8AE5E',
        borderWidth:2,
        marginTop:'45%'
    },
    buttonText: {
        fontSize: 20,
        color: '#D8AE5E'
    },
    logo:{
        width:300,
        height:300,
        resizeMode: 'contain'
    }
})