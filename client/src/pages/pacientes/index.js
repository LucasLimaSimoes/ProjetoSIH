import React, { useState, useEffect } from 'react';
import './pacientes.css'
import Axios from 'axios'
import {AiFillHome} from "react-icons/ai";
import {Link} from 'react-router-dom';


function Pacientes () {

    const [nome, setNome] = useState('')
    const [sus, setSUS] = useState(0)
    const [pacientesList, setPacientesList] = useState([])

    const cadastrarPaciente = () =>{
        Axios.post("http://localhost:3001/pacientes/cadastro", {nome:nome, sus:sus})
        .then(() => {
            alert("Cadastro realizado com sucesso")
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/pacientes").then((response) => {
            setPacientesList(response.data)
        })
    })
    
    return(
        <div className='container_pacientes'>
            <header className='cabecalho'>
                <Link to="/home"><AiFillHome size={25} color="#FFF"/></Link>
                <h2 className='cabecalho_titulo'>Página de Pacientes</h2>
            </header>
            <div className='p_cadastro'>
                <h1 className='p_titulo'>Cadastro de Pacientes</h1>
                <div className='subCadastro'>
                    <input type='text' name='nome' placeholder='Nome' onChange={(e)=>{
                        setNome(e.target.value)
                    }}/>
                    <input type='number' name='sus' placeholder='Número do cartão SUS'onChange={(e)=>{
                        setSUS(e.target.value)
                    }}/>
                    <button type='submit' onClick={cadastrarPaciente}>Cadastrar</button>
                </div>
            </div>
            <hr/>
            <div className='p_listagem'>
                <h1 className='p_titulo'> Listagem de Pacientes</h1>
                {pacientesList.map((value) => {
                    return(
                        <div className='card_p'>
                            <p>Nome: {value.nome} | Número do Catão SUS: {value.sus}</p>
                            <Link to={'/pacientes/'+value.idpacientes}><button>Detalhes</button></Link>
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

export default Pacientes;