import React, { useState, useEffect } from 'react';
import './medicos.css'
import Axios from 'axios'


function medicos () {

    const [nome, setNome] = useState('')
    const [crm, setCRM] = useState(0)
    const [medicosList, setMedicosList] = useState([])

    const cadastrarMedico = () =>{
        Axios.post("http://localhost:3001/medicos/cadastro", {nome:nome, crm:crm})
        setMedicosList([...medicosList, {nome:nome, crm:crm},])
        .then(() => {
            alert("Cadastro realizado com sucesso")
        })
    }

    const deletarMedico = (crm) =>{
        Axios.delete(`http://localhost:3001/medicos/deletar/${crm}`)
        //setMedicosList([...medicosList, {nome:nome, crm:crm},])
        .then(() => {
            alert("Apagado com sucesso")
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/medicos").then((response) => {
            setMedicosList(response.data)
        })
    }, [])
    
    return(
        <div className='container_medicos'>
            <div className='m_cadastro'>
                <h1 className='m_titulo'>Cadastro de Médicos</h1>
                <div className='subCadastro'>
                    <input type='text' name='nome' placeholder='Nome' onChange={(e)=>{
                        setNome(e.target.value)
                    }}/>
                    <input type='text' name='crm' placeholder='CRM'onChange={(e)=>{
                        setCRM(e.target.value)
                    }}/>
                </div>
                <button type='submit' onClick={cadastrarMedico}>Cadastrar</button>
            </div>
            <div className='m_listagem'>
                <h1 className='m_titulo'> Listagem de Médicos</h1>
                {medicosList.map((value) => {
                    return(
                        <div className='card_m'>
                            <h2>{value.nome} | {value.crm}</h2>
                            <button onClick={() => {deletarMedico(value.crm)}}>Apagar</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default medicos;