import React, { useState, useEffect } from 'react';
import './medicos.css'
import Axios from 'axios'
import {AiFillHome} from "react-icons/ai";
import {Link} from 'react-router-dom';


function Medicos () {

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
        .then(() => {
            alert("Apagado com sucesso")
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/medicos").then((response) => {
            setMedicosList(response.data)
        })
    })
    
    return(
        <div className='container_medicos'>
            <header className='cabecalho'>
                <Link to="/home"><AiFillHome size={25} color="#FFF"/></Link>
                <h2 className='cabecalho_titulo'>Página de Médicos</h2>
            </header>
            <div className='m_cadastro'>
                <h1 className='m_titulo'>Cadastro de Médicos</h1>
                <div className='subCadastro'>
                    <input type='text' name='nome' placeholder='Nome' onChange={(e)=>{
                        setNome(e.target.value)
                    }}/>
                    <input type='number' name='crm' placeholder='CRM'onChange={(e)=>{
                        setCRM(e.target.value)
                    }}/>
                    <button type='submit' onClick={cadastrarMedico}>Cadastrar</button>
                </div>
            </div>
            <hr/>
            <div className='m_listagem'>
                <h1 className='m_titulo'>Listagem de Médicos</h1>
                {medicosList.map((value) => {
                    return(
                        <div className='card_m'>
                            <p>Nome: {value.nome} | CRM: {value.crm}</p>
                            <button onClick={() => {deletarMedico(value.crm)}}>Apagar</button>
                        </div>
                    )
                })}
            </div>
            <footer className='rodape'>
                <h1 className='rodape_titulo'>Feito por Lucas Lima Simões</h1>
            </footer>
        </div>
    );
}

export default Medicos;