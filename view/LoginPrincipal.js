import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons ';
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
    try{
        const userCred = await signInWithEmailAndPassword(auth, schema.email, schema.password);
        const currentUser = userCred.user;
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
    } catch (error){
        setAlertVisible(true);
    }
}

return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.containerEmail}>
                <Controller
                    control={control}
                    name="email"
                    render={({field:{onChange, onBlur, value}}) =>(
                        <TextInput
                            placeholder="Digite seu email"
                            placeholderTextColor='#fff'
                            style={[styles.inputEmail,{
                                borderWidth: errors.email && 1,
                                borderColor: errors.email && '#ff375b'
                            }]}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                            keyboardType='email-adress'
                        />
                    )}
                />
                    <Icon style={styles.iconMail} name="mail" color='#fff' size={25} />
            </View>
            {errors.email && <Text style={styles.labelError}>{errors.email?.message}</Text>}

            <View style={styles.containerSenha}>
                <Controller
                    control={control}
                    name="email"
                    render={({field:{onChange, onBlur, value}}) =>(
                        <TextInput
                            placeholder="Digite sua senha"
                            placeholderTextColor='#fff'
                            style={[styles.inputSenha,{
                                borderWidth: errors.password && 1,
                                borderColor: errors.password && '#ff375b' 
                            }]}
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
                        <Icon name={eyeIconName} color='#fff' size={25}/>
                    </TouchableOpacity>
            </View>
            {errors.password && <Text style = {styles.labelError}>{errors.password?.message}</Text>}

            <TouchableOpacity 
                style={styles.button}
                onPress={handleSubmit(loginFirebase)}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

    </ScrollView>
    
    <CustomAlert
        visible={alertVisible}
        title="Alerta"
        message="Email ou senha incorretos. Tente novamente."
        onClose={() => setAlertVisible(false)}
    />

    <CustomAlert
        visible={userTypeAlertVisible}
        title="Alerta"
        message="Usuário não é do tipo 'Operador'."
        onClose={() => setUserTypeAlertVisible(false)}
    />

    </View>
)
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#E2F4FF"
    },
    containerEmail: {
        borderRadius: 5,
        height: 50,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#0E5CB5',
        width:'100%'
    },
    inputEmail:{
        width: '85%',
        height: 50,
        padding: 8,
        fontSize: 18,
        borderRadius: 5,
        color: '#fff',
    },
    iconMail:{
        paddingStart: 15,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerSenha: {
        flexDirection:'row',
        width: '100%',
        backgroundColor:'#0E5CB5',
        borderRadius: 5,
        height: 50,
        alignItems:'center',
        marginBottom: 4,
        marginTop: 12
    },
    inputSenha:{
        width: '85%',
        height: 50,
        padding: 8,
        fontSize: 18,
        borderRadius: 5,
        color: '#fff',
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
        marginBottom: 8
    },
    button:{
        backgroundColor: '#0E5CB5',
        width: '100%',
        height: 45,
        borderRadius: 5,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText:{
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    }
});


