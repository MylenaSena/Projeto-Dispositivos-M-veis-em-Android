import * as React from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { style } from "../styles/style";
import Carousel from 'react-native-reanimated-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

type CarouselItem = {
    id: string;
    title: string;
};

export default function Inicio() {
    const [selectedType, setSelectedType] = React.useState('Todos');
    const [userName, setUserName] = React.useState('');

    React.useEffect(() => {
        const getUserName = async () => {
            try {
                const storedName = await AsyncStorage.getItem('userName');
                if (storedName) {
                    setUserName(storedName);
                }
            } catch (error) {
                console.error("Erro ao buscar nome do usuário:", error);
            }
        };

        getUserName();
    }, []);

    const carouselItems: CarouselItem[] = [
        { id: '1', title: 'Campanha de Doação' },
        { id: '2', title: 'Ajuda para Idosos' },
        { id: '3', title: 'Resgate de Animais' },
    ];

    return (
        <View style={style.fundoini}>
            <View style={style.User}>
                <TouchableOpacity style={style.UserBt}></TouchableOpacity>
                <Text style={style.textuser}>{userName || 'User'}</Text>
            </View>

            <View style={style.Search}>
                <TextInput placeholder="Pesquisar" style={style.BarPesq}></TextInput>
            </View>

            <View style={style.Categoria}>
                <Text style={style.CategText}>Categoria</Text>
            </View>

            <View style={style.Tipos}>
                {['Todos', 'Idosos', 'Animais'].map((tipo) => (
                    <TouchableOpacity key={tipo} onPress={() => setSelectedType(tipo)}>
                        <Text style={selectedType === tipo ? style.TiposBt : style.TiposBt2}>{tipo}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={style.CarroselCub}>
                <Carousel
                    loop
                    width={width}
                    height={280}
                    autoPlay={true}
                    data={carouselItems}
                    scrollAnimationDuration={2000}
                    renderItem={({ item }: { item: CarouselItem }) => (
                        <LinearGradient
                            colors={['#b2ff59', '#66e1aa', '#00a86b']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0.6 }}
                            style={style.CarroselIten}
                        >
                            <Text style={{ fontSize: 20, color: 'white' }}>{item.title}</Text>
                        </LinearGradient>
                    )}
                />
            </View>

            <View style={style.Categoria}>
                <Text style={style.CategText}>Mais Populares</Text>
            </View>

            <View>
                {/* Conteúdo extra pode ser adicionado aqui */}
            </View>
        </View>
    );
}
