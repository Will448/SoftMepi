import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function DashboardLider(){
    const navigation = useNavigation();

    return(
        <View style={styles.container}>

            <Image source={require('../../assets/capacete.png')} style={styles.logo}/>

            <Text style={styles.title}>Bem vindo!</Text>

            <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('CadastroOper')}
            >
                <Text style={styles.textButton}>Cadastrar Operador</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('RelatórioOper')}
            >
                <Text style={styles.textButton}>Relatório de Operadores</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('CadastroEPI')}
            >
                <Text style={styles.textButton}>Cadastrar EPI</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('Estoque')}
            >
                <Text style={styles.textButton}>Estoque</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.Button}
            onPress={() => navigation.navigate('Pedidos')}
            >
                <Text style={styles.textButton}>Pedidos</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4A5B48',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo:{
        width:300,
        height:300,
        resizeMode: 'contain'
    },
    title:{
        textAlign: 'center',
        fontFamily: 'Brice-RegularSemiExpanded',
        fontSize: 23,
        color: '#D8AE5E',
        marginBottom: '10%',
        marginTop:'-15%'
    },
    Button:{
        backgroundColor: '#4A5B48',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 40,
        borderColor: '#D8AE5E',
        borderWidth:2,
        alignItems: "center",
        justifyContent:"center",
        marginTop:'5%',
        width: '90%'
    },
    textButton:{
        fontSize: 18,
        color: '#D8AE5E',
        fontWeight: 'bold',
    },
})