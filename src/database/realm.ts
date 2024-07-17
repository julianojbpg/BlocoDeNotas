import Realm from "realm"
import tabela from "./tabela"
import { Bloco } from "../@types/tipos"


const realm = new Realm({schema:[ tabela]})
  

const Servicos_Realm = {
    
    PesquisaTodos: ():Bloco[] => {
        try {
            const lista =  realm.objects<Bloco>('blocos')
            return [...lista]
        } catch (error) {
            return [] as Bloco[]
        }  
    },

    addBloco: (bloco: Bloco) => {
        try {
            realm.write(()=>{
                 realm.create('blocos', bloco)
            })
            return { mgs:'Cadastrado com sucesso'}
        } catch (error) {
            return { mgs:'Erro ao Cadastrar ' + error}
        }
    },

    atualizarBloco: (bloco: any) =>{
        const result = realm.objectForPrimaryKey('blocos', bloco._id)
        try {
            if(result){
                realm.write(()=>{
                        result.texto = bloco.texto
                    }
                )
            } 
            return { mgs:'Atualizado com sucesso' }
        } catch (error) {
            return { mgs:'Erro ao atualizar post it' }  
        }

    },

    deletarBloco: (id: string)=>{
        const blocos = realm.objectForPrimaryKey('blocos', id)
        try {
            if (blocos) {
                realm.write(() => {
                    realm.delete(blocos);
                });
                }
            return {mgs:'Post it deletado com sucesso'} 
        } catch (error) {
            return {mgs:'Erro ao deletar post it'}
        }

    },
}

export default Servicos_Realm