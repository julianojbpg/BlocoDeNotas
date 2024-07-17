import { Bloco } from "../@types/tipos";
import Servicos_Realm from "../database/realm";
import { ReactNode, createContext, useEffect, useState } from "react";

export interface BlocoContextType{
    list:Bloco[] 
    Add:(data:Bloco)=>string
    atualizar:(bloco:Bloco)=> string
    deletar:(id:string)=>string
}
interface Default{
    children:ReactNode
}
export const criaContexto = createContext<BlocoContextType | undefined>(undefined)

export function ContextoProvider({children}: Default){

    const [list, setList] = useState<Bloco[]>([] as Bloco[])
    const [load, setLoad] = useState<boolean>(false)

    useEffect(()=>{
        alimentalista()
    }, [])

    useEffect(()=>{
        alimentalista()
    },[load])
    


    function alimentalista(){
        const listarealm = Servicos_Realm.PesquisaTodos()
        setList(listarealm)
    }
    function Add(data:Bloco):string{
        const {mgs} = Servicos_Realm.addBloco(data)
        setLoad(!load)
        return mgs
    }
    function atualizar(bloco:Bloco):string{
        setList([])
        const {mgs} = Servicos_Realm.atualizarBloco(bloco)
        setLoad(!load)
        return mgs
    }

    function deletar(id:string):string{
        setList([])
        const {mgs} = Servicos_Realm.deletarBloco(id)
        setLoad(!load)
        return mgs
    }
    

    return(
        <criaContexto.Provider value={{list,Add,atualizar,deletar}}>
            {children}
        </criaContexto.Provider>
    )

}