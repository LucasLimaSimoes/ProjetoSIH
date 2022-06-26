import React, { useState, useEffect } from 'react';
import Axios from 'axios'


function remedios () {

    const [nome, setNome] = useState('')
    const [qte, setQTE] = useState(0)
    const [lote, setLote] = useState(0)
    const [validade, setValidade] = useState(new Date())
    const [remediosList, setRemediosList] = useState([])

    const cadastrarRemedio = () =>{
        Axios.post("http://localhost:3001/remedios/cadastro", {nome:nome, qte:qte, lote:lote, validade:validade})
        setMedicosList([...remediosList, {nome:nome, qte:qte, lote:lote, validade:validade},])
        .then(() => {
            alert("Cadastro realizado com sucesso")
        })
    }

    const deletarRemedio = (lote, nome) =>{
        Axios.delete(`http://localhost:3001/remedios/deletar/${lote}/${nome}`)
        
        .then(() => {
            alert("Apagado com sucesso")
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/remedios").then((response) => {
            setRemediosList(response.data)
        })
    }, [])
    
    return(
        <div className='container_remedios'>
            <div className='r_cadastro'>
                <h1 className='r_titulo'>Cadastro de Remedios</h1>
                <div className='subCadastro'>
                    <input type='text' name='nome' placeholder='Nome' onChange={(e)=>{
                        setNome(e.target.value)
                    }}/>
                    <input type='number' name='qte' placeholder='Quantidade'onChange={(e)=>{
                        setQTE(e.target.value)
                    }}/>
                    <input type='number' name='lote' placeholder='Lote'onChange={(e)=>{
                        setLote(e.target.value)
                    }}/>
                    <input type='number' name='validade' placeholder='Validade'onChange={(e)=>{
                        setValidade(e.target.value)
                    }}/>
                </div>
                <button type='submit' onClick={cadastrarRemedio}>Cadastrar</button>
            </div>
            <div className='r_listagem'>
                <h1 className='r_titulo'> Listagem de Remedios</h1>
                {remediosList.map((value) => {
                    return(
                        <div className='card_r'>
                            <h2>{value.nome} | {value.qte} | {value.lote} | {value.validade}</h2>
                            <button onClick={() => {deletarRemedio(value.lote, value.nome)}}>Apagar</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default remedios;