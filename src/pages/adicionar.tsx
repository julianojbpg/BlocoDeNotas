import { Alert, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from '@expo/vector-icons/Ionicons';
import { useContext, useState } from "react";
import { Bloco, Textos } from "../@types/tipos";
import uuid from 'react-native-uuid';
import { BlocoContextType, criaContexto } from "../context/contexto";
import img from '../../assets/fundo.jpg';
import { useNavigation } from "@react-navigation/native";

const date = new Date().toLocaleDateString();

export default function Adicionar() {
  const { navigate } = useNavigation<any>();
  const contexto = useContext<BlocoContextType | undefined>(criaContexto);

  const [conteudo, setConteudo] = useState<Textos>({
    titulo: 'Digite seu titulo aqui',
    texto: 'Digite seu Conteudo Aqui'
  });

  const [bloco, setBloco] = useState<Bloco>({
    _id: uuid.v4().toString(),
    titulo: '',
    texto: '',
    data: date
  });

  function CadastrarBloco() {
    if (bloco.titulo === '') {
      return Alert.alert('Titulo', 'Titulo Precisa ser Preenchido');
    }
    if (bloco.texto === '') {
      return Alert.alert('Conteudo', 'Conteudo Precisa ser Preenchido');
    }
    if (bloco.data === '' || bloco._id === '') {
      return Alert.alert('Dados', 'Dados precisam ser preenchidos');
    } else {
      const mgs = contexto?.Add(bloco);
      setBloco({ data: '', _id: '', texto: '', titulo: '' });
      Alert.alert('Cadastro', mgs || 'Bloco cadastrado com sucesso');
      navigate('Inicial');
      return;
    }
  }

  return (
    <View style={css.Container}>
      <ImageBackground source={img} style={css.img}>
        <View style={css.TelaTop}>
          <Text style={css.texto}>Novo Bloco</Text>
        </View>
        <View style={css.TelaMid}>
          <View style={css.TelaCadastro}>
            <TextInput
              placeholder={conteudo.titulo}
              placeholderTextColor='black'
              onFocus={() => setConteudo({ ...conteudo, titulo: '' })}
              onBlur={() => setConteudo({ ...conteudo, titulo: 'Digite seu Titulo Aqui' })}
              onChangeText={(e) => setBloco({ ...bloco, titulo: e })}
              value={bloco.titulo}
              style={[
                css.input,
                {
                  width: '100%',
                  height: '20%',
                  textAlign: 'center',
                  fontSize: 25
                }
              ]}
            />
            <TextInput
              placeholder={conteudo.texto}
              placeholderTextColor='black'
              onFocus={() => setConteudo({ ...conteudo, texto: '' })}
              onBlur={() => setConteudo({ ...conteudo, texto: 'Digite seu Conteudo Aqui' })}
              value={bloco.texto}
              onChangeText={(e) => setBloco({ ...bloco, texto: e })}
              style={[
                css.input,
                {
                  borderTopWidth: 1,
                  height: '80%',
                  fontSize: 20
                }
              ]}
            />
          </View>
        </View>
        <View style={css.TelaBot}>
          <Icon
            name="arrow-back-circle-sharp"
            size={50}
            color='rgb(0,150,136)'
            onPress={() => navigate('Inicial')}
          />
          <Icon
            name="add-circle"
            size={50}
            color='orange'
            onPress={CadastrarBloco}
          />
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
    backgroundColor: 'rgb(43,43,43)'
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  TelaBot: {
    width: '100%',
    height: '10%',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row'
  },
  TelaCadastro: {
    width: '80%',
    height: 400,
    backgroundColor: 'rgb(255,255,0)'
  },
  input: {
    width: '100%',
    textAlign: 'center',
  },
  img: {
    width: "100%",
    height: '100%'
  }
});