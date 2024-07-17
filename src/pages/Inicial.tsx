import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from '@expo/vector-icons/Ionicons';
import Blocos from "../components/bloco";
import { useContext, useEffect } from "react";
import { BlocoContextType, criaContexto } from "../context/contexto";
import img from '../../assets/fundo.jpg';
import { useNavigation } from "@react-navigation/native";

export default function Inicial() {
  const context = useContext<BlocoContextType | undefined>(criaContexto);
  const { navigate } = useNavigation<any>();
  let numero = 0;

  useEffect(() => {
    // Qualquer efeito colateral ou atualização de estado deve ocorrer aqui
  }, [context?.list]);

  const handleNavigate = () => {
    console.log('clicou aqui')
    navigate('adicionar'); // Ação de navegação em resposta a um evento
  };

  return (
    <View style={css.Container}>
      <ImageBackground source={img} style={css.img}>
        {/* --------------------------------------------------------------------- */}
        <View style={css.TelaTop}>
          <Text style={css.texto}>Bloco de notas</Text>
        </View>
        {/* --------------------------------------------------------------------- */}
        <View style={css.TelaMid}>
          <ScrollView showsVerticalScrollIndicator={false} style={css.scroll}>
            {
              context?.list?.map((i: any, index: any) => (
                numero < 5 ? numero += 1 : numero = 1,
                <Blocos
                  key={index}
                  valor={numero}
                  bloco={i}
                />
              ))
            }
          </ScrollView>
        </View>
        {/* --------------------------------------------------------------------- */}
        <View style={css.TelaBot}>
          <Icon name="add-circle" size={50} color='orange' onPress={handleNavigate} />
        </View>
      </ImageBackground>
    </View>
  );
}

const css = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    color: 'white',
    fontSize: 40
  },
  TelaTop: {
    width: '100%',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  TelaMid: {
    width: '100%',
    height: '75%',
    borderTopWidth: 1,
    alignItems: 'center',
    padding: 10
  },
  scroll: {
    width: '100%',
    height: '100%',
    marginLeft: '12%'
  },
  TelaBot: {
    width: '100%',
    height: '10%',
    borderTopWidth: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  img: {
    width: "100%",
    height: '100%'
  }
});