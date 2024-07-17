import React, { useContext, useEffect, useState } from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import { Bloco } from '../@types/tipos'
import { BlocoContextType, criaContexto } from '../context/contexto'



interface BlocoProps {
    bloco: Bloco
    valor: number
}


const Blocos: React.FC<BlocoProps> = ({valor, bloco}) => {

    const contexto = useContext<BlocoContextType | undefined>(criaContexto)
    const [rgb, setRgb] = useState('green')
    const [tamanho, setTamanho] = useState<number>(100)
    const [status, setIstatus] = useState<boolean>(false)
    const [valores,setValores] = useState<Bloco>({
        _id: bloco._id,
        data: bloco.data,
        texto:bloco.texto,
        titulo: bloco.titulo
    })
    
    useEffect(() => {
        const ColorirBloco = () => {
            switch (valor) {
                case 1:
                    setRgb('rgb(237,125,49)')
                    break
                case 2:
                    setRgb('rgb(220,44,0161)')
                    break
                case 3:
                    setRgb('rgb(0,208,94)')
                    break
                case 4:
                    setRgb('rgb(15,202,216)')
                    break
                case 5:
                    setRgb('rgb(255,255,0)')
                    break
                default:
                    break
            }
        }
        ColorirBloco();
    }, [valor]);
    useEffect(()=>{
        status ? setTamanho(300) : setTamanho(100)
    },[status])
    


    function AtualizarTexto(){
        const mgs = contexto?.atualizar(valores)
        setIstatus(!status)
        return Alert.alert('Atualização', mgs)
    }
    function Deletar(){
        const mgs = contexto?.deletar(valores._id)
        return Alert.alert('Deletar', mgs)
    }

    return (
            <View style={[css.Container, {height: tamanho, backgroundColor: rgb }]}>
                <Pressable onPress={()=>setIstatus(!status)} style={{width:'100%',height:'100%'}}>
                <View style={css.tela_titulo}>
                    <View style={[css.viewdotitulo, status ? {width: '80%'} : {width: '100%'}]}>
                            <Text style={css.texto} >{valores.titulo}</Text>
                    </View>

                    <TouchableOpacity style={[css.Icons, status ? {display: 'flex',} : {display: 'none'}]} >
                        <Pressable style={css.viewIcon} onPress={AtualizarTexto}>
                            <Icon name='save' size={25} color={'black'}  style={{paddingRight: 5}}/>
                        </Pressable>
                        <Pressable style={css.viewIcon} onPress={Deletar}>
                            <Icon name='trash-bin' size={25} color={'black'} />
                        </Pressable>
                    </TouchableOpacity>

                </View>

                <View style={[status ? {height: '60%'}: css.textoData, {width: '100%'}]}>
                    <Text 
                        style={[{color:'black'} ,status ? {display:'none'} : {display:'flex'}]} 
                        onPress={()=>setIstatus(!status)}>{valores.data}
                    </Text>
                    <TextInput 
                        style={[css.input,status ? {display:'flex'} : {display:'none'}]}
                        multiline={true}
                        onBlur={AtualizarTexto}
                        value={valores.texto}
                        onChangeText={(e) => setValores({...valores,texto: e})}
                    />
                </View>
                </Pressable>
            </View>
    );
}

export default Blocos;

const css = StyleSheet.create({
    Container: {
        width:'86%',
        marginTop: 10,
        padding: 10,
        flexWrap: 'nowrap'
    },
    texto:{
        fontSize: 20,
        color: 'black'
    },
    tela_titulo:{
        width: '100%',
        height: 40,
        flexDirection: 'row',
    },
    viewdotitulo:{
        alignItems:'center',
        justifyContent:'space-between',
        height:'100%',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    Icons:{
        width:'20%',
        height:'100%',
        alignItems:'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    input:{
        width:'100%',
        height: '90%',
        color: 'black',
        fontSize: 20,
        padding: 10,
        marginTop: 5
    },
    textoData:{
        height: '90%', 
        paddingLeft:'70%',
        flexDirection:'row',
    },
    viewIcon:{
        width:'50%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
});