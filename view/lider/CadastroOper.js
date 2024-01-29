import React, {useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';


import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import {auth,db} from '../../model/firebase-init';

import { useNavigation } from "@react-navigation/native";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

const schema = yup.object().shape({
    username: yup.string().required('Campo \"Nome"\ é obrigatório!'),
    email: yup.string().email("Email inválido").required('Campo \"Email"\ é obrigatório!'),
    password: yup.string().min(6, 'A senha deve conter pelo menos 6 (seis) caracteres').required('Campo \"Senha"\ é obrigatório!'),
    confirmarSenha: yup.string().required('Campo \"Confirmar Senha"\ é obrigatório!').test('password-match', 'Senhas devem ser iguais', function(value){
        return this.parent.password === value;
    })
});

export default function CadastroOper(){
    const navigation = useNavigation();
    const [hidepass, setHidepass] = useState(true);
    const eyeIconName = hidepass ? 'eye' : 'eye-off';

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
      });
  
      async function createUser(schema) {
        await createUserWithEmailAndPassword(auth, schema.email, schema.password, schema.confirmarSenha, schema.username, "Operador")
          .then(() => {
            console.log('Conta criada com sucesso!');
            
            const currentUser = auth.currentUser;
            if (currentUser) {
              const currentUserUid = currentUser.uid;
              const userRef = doc(db, "users", currentUserUid); 
              setDoc(userRef, {
                userType: "Operador",
              }, { merge: true });
            }
            navigation.navigate('DashboardLider');
          });
      }

return (
    <View style={styles.container}>

        <Image source={require('../../assets/logo.jpg')} style={{width: '40%', height:'40%'}} />

        <Text style={styles.Text}>
            Cadastrar Operador
        </Text>

        <View style={[styles.containerUsername,{
            borderWidth: errors.username && 1,
            borderColor: errors.username && '#ff375b'
        }]}>
            <Controller
                control={control}
                name="username"
                render={({field:{onChange, onBlur, value}}) =>(
                    <TextInput
                        placeholder="Digite seu nome"
                        placeholderTextColor='#fff'
                        style={styles.inputUsername}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                    />
                )}
            />
            <FontAwesome style={styles.iconUsername} name="user" color='#fff' size={25} />
        </View>
        {errors.username && <Text style={styles.labelError}>{errors.username?.message}</Text>}

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
            <MaterialIcons style={styles.iconPassword} name="password" color='#fff' size={25}/>
        </View>
        {errors.password && <Text style = {styles.labelError}>{errors.password?.message}</Text>}

        <View style={[styles.containerSenha, {
                            borderWidth: errors.password && 1,
                            borderColor: errors.password && '#ff375b',
                        }]}>
            <Controller
                control={control}
                name="confirmarSenha"
                rules={{ validate: (value) => schema.validate({ confirmarSenha: value }) }}
                defaultValue=""
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Confirme sua senha"
                    placeholderTextColor='#fff'
                    style={[styles.inputSenha, {
                      borderWidth: errors.password && 1,borderColor: errors.password && '#ff375b'
                    }]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
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
        {errors.confirmarSenha && <Text style={styles.labelError}>{errors.confirmarSenha.message}</Text>}

        <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit(createUser)}
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
    containerUsername: {
        borderRadius: 40,
        height: 50,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#889B87',
        width:'90%',
        marginTop: 70
    },
    inputUsername:{
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
    iconUsername:{
        paddingStart: 15,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerEmail: {
        borderRadius: 40,
        height: 50,
        marginBottom: 4,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#889B87',
        width:'90%',
        marginTop: 12
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
    iconPassword:{
        paddingStart: 15,
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
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
