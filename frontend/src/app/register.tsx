import * as React from 'react';
import { Text, View, TextInput, TextInputComponent, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter, router } from "expo-router";
import { style } from "../styles/style";
import { useUserDatabase } from "../database/useUserDatabase";

export default function Register() {

  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confpass, setConfPass] = React.useState('')

  const userDatabase = useUserDatabase()

  const handleSubmit = async () => {
    if (!email || !name || !password || !confpass) {
      return Alert.alert('Erro', 'Preencha todos os campos!');
    }

    if (confpass !== password) {
      return Alert.alert('Erro', 'Senhas não conferem!');
    }

    try {
      await userDatabase.create({ name, email, password });
      Alert.alert('Sucesso', 'Seja bem-vindo!');
      setTimeout(() => {
        router.push('/inicio');
      }, 1500);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao registrar usuário.');
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
          <Text style={style.titulo}>Registre-Se!</Text>
          <Text style={style.subtitulo}>Seja Bem vindo!</Text>
        </View>
        <View style={style.container}>
          <View style={style.dataimputR}>
            <TextInput style={style.imput1} value={name} onChangeText={setName} placeholder="Nome"></TextInput>
            <TextInput style={style.imput1} value={email} onChangeText={setEmail} placeholder="Email ou Celular"></TextInput>
            <TextInput style={style.imput1} value={password} onChangeText={setPassword} secureTextEntry placeholder="Senha"></TextInput>
            <TextInput style={style.imput2} value={confpass} onChangeText={setConfPass} secureTextEntry placeholder="Repita a Senha"></TextInput>
          </View>
          <View>
            <Link href={'./'}>
              <Text style={style.textbase2} >Ja é Cadastrado? Clique aqui!</Text>
            </Link>
          </View>
          <View>
            <TouchableOpacity style={style.buttom1R} onPress={handleSubmit}>
              <Text>Entrar</Text>
            </TouchableOpacity>
          </View>
          <Text style={style.textbase3R}>Ou</Text>
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
