import React, {useState, useEffect} from 'react';
import './medicos.css';
import Axios from 'axios';
import {AiFillHome} from "react-icons/ai";
import {Link} from 'react-router-dom';


function Medicos () {

    const [nome, setNome] = useState('') //variavel pra receber nome do medico
    const [crm, setCRM] = useState(0) //variavel pra receber o CRM do medico
    const [especialidade, setEspecialidade] = useState('') //variavel pra receber a especialidade do medico
    const [medicosList, setMedicosList] = useState([]) //variavel pra receber a lista de medicos do backend

    const cadastrarMedico = () => { //cadastra um novo medico no banco de dados
        if (nome == '' || crm == 0 || especialidade == '') { //verifica se os dados estao preenchidos
            alert("Por favor preencha os dados")
        } else { //caso estejam
            Axios.post("http://localhost:3001/medicos/cadastro", {nome:nome, crm:crm, especialidade:especialidade}) //envia as variaveis nome, crm e especialidade pro backend
            .then(() => {
                alert("Cadastro realizado com sucesso")
            })
        }
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/medicos").then((response) => { //recebe a lista de medicos do backend
            setMedicosList(response.data) //seta a variavel medicosList com a resposta do backend
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
                    <input type='number' name='crm' placeholder='CRM' onChange={(e)=>{
                        setCRM(e.target.value)
                    }}/>
                    <input type='text' name='especialidade' placeholder='Especialidade' onChange={(e)=>{
                        setEspecialidade(e.target.value)
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
                            <p>Nome: {value.nome} | CRM: {value.crm} | Especialidade: {value.especialidade}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Medicos;