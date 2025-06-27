import * as React from 'react';
import { Text, View, TextInput, TextInputComponent, TouchableOpacity, LogBox, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { style } from "../styles/style";
import { Link, useRouter, router } from "expo-router";
import { useUserDatabase } from '../database/useUserDatabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreLogs([
  "Invalid prop `style` supplied to `React.Fragment`",
]);

export default function Login() {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { findByEmail } = useUserDatabase(); 

  const handleSubmit = async () => {
    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos!');
    }

    try {
      const user = await findByEmail(email); // busca no banco

      if (!user) {
        return Alert.alert('Erro', 'Usuário não registrado!');
      }

      if (user.password !== password) {
        return Alert.alert('Erro', 'Senha incorreta!');
      }

      // Se passou tudo:
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      await AsyncStorage.setItem('userName', user.name);
      router.push('/inicio');

    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };



  return (
    <View style={style.fundo}>
      <LinearGradient
        colors={['rgb(178, 255, 89)', 'rgba(102, 225, 170, 1)', 'rgba(0, 168, 107, 1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0.6 }}
      >
        <View style={style.informar}>
          <Text style={style.titulo}>Login!</Text>
          <Text style={style.subtitulo}>Bem vindo de Volta!</Text>
        </View>
        <View style={style.container}>
          <View style={style.dataimput}>
            <TextInput style={style.imput1} value={email} onChangeText={setEmail} placeholder="Email ou Celular"></TextInput>
            <TextInput style={style.imput2} value={password} onChangeText={setPassword} secureTextEntry placeholder="Senha"></TextInput>
          </View>
          <View>
            <Text style={style.textbase1}>Esqueceu a Senha?</Text>
            <Link href={'/register'}>
              <Text style={style.textbase2}>Nao é Cadastrado? Clique aqui!</Text>
            </Link>
          </View>
          <View>
            <TouchableOpacity style={style.buttom1} onPress={handleSubmit}>
              <Text>Entrar</Text>
            </TouchableOpacity>
          </View>
          <Text style={style.textbase3}>Ou</Text>
          <View>
            <View style={style.caixa}>
              <TouchableOpacity style={style.buttom2}>
                <Text>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.buttom3}>
                <Text>Facebook</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}
