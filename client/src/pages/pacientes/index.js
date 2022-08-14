import React, { useState, useEffect } from 'react';
import './pacientes.css';
import Axios from 'axios';
import {AiFillHome} from "react-icons/ai";
import {Link} from 'react-router-dom';


function Pacientes () {

    const [nome, setNome] = useState('') //variavel pra receber o nome do paciente
    const [sus, setSUS] = useState(0) //variavel pra receber o numero do cartao do sus
    const [pacientesList, setPacientesList] = useState([]) //variavel pra receber a lista de pacientes do backend

    const cadastrarPaciente = () => { //cadastra novo paciente no bd
        if (nome == '') { //verifica se ha pelo menos um nome preenchido
            alert("Por favor preencha ao menos um nome")
        } else { //caso esteja
            Axios.post("http://localhost:3001/pacientes/cadastro", {nome:nome, sus:sus})
            .then(() => {
                alert("Cadastro realizado com sucesso")
            })
        }
    }

    useEffect(() => { //busca a lista de paciententes do backend
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
        </div>
    );
}

export default Pacientes;