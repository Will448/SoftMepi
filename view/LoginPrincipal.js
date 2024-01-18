import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db} from '../model/firebase-init';

const schema = yup.object({
    email: yup.string().email("Email inválido").required("O campo \"Email\" é obrigatório"),
    password: yup.string().min(6, "A senha deve conter pelo menos 6 dígitos").required("O campo \"Senha\" é obrigatório")
})

export default function LoginPrincipal(){

    const navigation=useNavigation();
    const [alertVisible, setAlertVisible] = useState(false);
    const [userTypeAlertVisible, setUserTypeAlertVisible] = useState(false);
    const [hidepass, setHidepass] = useState(true);
    const eyeIconName = hidepass ? 'eye' : 'eye-off';

    const {control, handleSubmit, formState : {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    async function loginFirebase(schema) {
        try {
            await signInWithEmailAndPassword(auth, schema.email, schema.password);
            console.log('Usuário logado com sucesso!');
    
            const currentUser = auth.currentUser;
            if (currentUser) {
                const currentUserUid = currentUser.uid;
                const userRef = doc(db, "users", currentUserUid);
                const userSnap = await getDoc(userRef);
    
                if (userSnap.exists()) {
                    const userType = userSnap.data().userType;
                    if (userType === "Suporte") {
                        navigation.navigate('DashboardSup');
                    } else if (userType === "Lider"){
                        navigation.navigate('DashboardLider');
                    } else if (userType === "Operador"){
                        navigation.navigate('DashboardOper');
                    } else {
                        setUserTypeAlertVisible(true);
                    }   
                } else {
                    console.log('Documento do usuário não encontrado no Firestore.');
                }
            } else {
                console.log('Usuário não está autenticado.');
            }
        } catch (error) {
            setAlertVisible(true);
        }
    }


return (
    <View style={styles.container}>

        <Image source={require('../assets/logo.jpg')} style={{width: '40%', height:'40%'}} />

        <Text style={styles.Text}>
            Acesse sua conta para continuar!
        </Text>

        <View style={[styles.containerEmail,{
            borderWidth: errors.email && 1,
            borderColor: errors.email && '#ff375b'
        }]}>
            <Controller
                control={control}
                name="email"
                render={({field:{onChange, onBlur, value}}) =>(
                    <TextInput
                        placeholder="Digite seu email"
                        placeholderTextColor='#fff'
                        style={styles.inputEmail}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
            <Feather style={styles.iconMail} name="mail" color='#fff' size={25} />
        </View>
        {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

        <View style={[styles.containerSenha, {
                            borderWidth: errors.password && 1,
                            borderColor: errors.password && '#ff375b',
                        }]}>
            <Controller
                control={control}
                name="password"
                render={({field:{onChange, onBlur, value}}) =>(
                    <TextInput
                        placeholder="Digite sua senha"
                        placeholderTextColor='#fff'
                        style={styles.inputSenha}
                        onChangeText={onChange}
                        value={value}
                        onBlur={onBlur}
                        secureTextEntry={hidepass}
                    />
                )}
            />
                <TouchableOpacity
                    style={styles.iconEye}
                    onPress={() => setHidepass(!hidepass)} 
                >
                    <Feather name={eyeIconName} color='#fff' size={25}/>
                </TouchableOpacity>
        </View>
        {errors.password && <Text style = {styles.labelError}>{errors.password?.message}</Text>}

        <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit(loginFirebase)}
        >
            <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

    </View>
)
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#4A5B48',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerEmail: {
        borderRadius: 40,
        height: 50,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#889B87',
        width:'90%',
        marginTop: 70
    },
    inputEmail:{
        width: '80%',
        backgroundColor: '#889B87',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 40,
        color: '#fff',
        height: 48,
        fontSize:17,
        marginLeft: 10
    },
    iconMail:{
        paddingStart: 15,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerSenha: {
        flexDirection:'row',
        width: '90%',
        backgroundColor:'#889B87',
        borderRadius: 40,
        height: 50,
        alignItems:'center',
        marginBottom: 4,
        marginTop: 12
    },
    inputSenha:{
        width: '80%',
        backgroundColor: '#889B87',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 40,
        color: '#fff',
        height: 48,
        fontSize:17,
        marginLeft: 10
    },
    iconEye: {
        padding: 8,
        width: '15%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelError:{
        alignSelf: 'flex-start',
        color:'#ff375b',
        marginBottom: 8,
        marginLeft: 30
    },
    button:{
        backgroundColor: '#4A5B48',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 40,
        borderColor: '#D8AE5E',
        borderWidth:2,
        alignItems: "center",
        justifyContent:"center",
        marginTop:12,
        width: '90%'
    },
    buttonText: {
        fontSize: 18,
        color: '#D8AE5E',
        fontWeight: 'bold',
    },
    Text: {
        textAlign: 'center',
        fontFamily: 'Brice-RegularSemiExpanded',
        fontSize: 23,
        color: '#D8AE5E',
    },

});


