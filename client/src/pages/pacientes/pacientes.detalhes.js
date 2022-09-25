import React, {useState, useEffect} from 'react';
import './pacientes.detalhes.css';
import Axios from 'axios';
import {AiOutlineArrowLeft} from "react-icons/ai";
import {Link, useParams} from 'react-router-dom';

function PacientesDetalhes () {

    const {idpacientes} = useParams(); //pega do parametro da pagina a id do paciente
    const [pacienteDetalhes, setPacienteDetalhes] = useState([]) //variavel pra receber os detalhes do backend
    const [nome, setNome] = useState('') //variavel usada para atualizacao de nome
    const [sus, setSUS] = useState(0) //variavel usada para atualizacao do numero do cartao

    const [medicosList, setMedicosList] = useState([]) //recebe a lista de medicos do backend
    const [medico, setMedico] =  useState(0) //variavel que pega a id do medico selecionado pra consulta
    const [prontuario, setProntuario] = useState(0) //variavel que pega o prontuario da cosulta
    const [consultas, setConsultas] = useState([]) //recebe a lista de consultas feitas pelo paciente do backend

    const [remediosList, setRemediosList] = useState([]) //recebe a lista de remedios do backend
    const [remedio, setRemedio] = useState(0) //variavel que pega a id do remedio selecionado
    const [qte, setQTE] = useState(0) //variavel que pega a quantidade do remedio selecionado
    const [remediosLevadosList, setRemediosLevadosList] = useState([]) //recebe lista de remedios tomados pelo paciente do backend

    const [leitoOcupado, setLeitoOcupado] = useState([]) //recebe leito ja selecionado do backend
    const [selecaoLeito, setSelecaoLeito] = useState('') //recebe novo leito selecionado do backend

    const atualizarPaciente = () => { //atualiza os dados do paciente
        if (nome == '') { //verifica se ao menos o nome do paciente esta preenchido
            alert("Preencha ao menos o nome")
        } else { //caso esteja
            Axios.put(`http://localhost:3001/pacientes/${idpacientes}/atualizar`, {nome:nome, sus:sus})
            .then(() => {
                alert("Dados do paciente atualizados")
            })
        }
    }

    const atualizarConsulta = () => { //cadastra uma nova consulta do paciente
        if (medico == 0 || prontuario == 0 ) { //verifica se os dados da consulta estao preenchidos
            alert("Preencha os dados da consulta")
        } else { //caso estejam
            Axios.post(`http://localhost:3001/pacientes/${idpacientes}/consulta/adicionar`, {medico:medico, prontuario:prontuario})
            .then(() => {
                alert("Dados de consulta cadastrados")
            })
        }
    }

    const atualizarRemedios = () => { //cadastra um novo remedio tomado pelo paciente
        if (remedio == 0 || qte == 0) {
            alert("Preencha os dados do remédio")
        } else {
            Axios.post(`http://localhost:3001/pacientes/${idpacientes}/remedio/adicionar`, {remedio:remedio, qte:qte})
            .then(() => {
                alert("Dados de remedios cadastrados")
            })
        }
    }

    const atualizarLeito = () => { //atualiza a situacao de leito do paciente
        if(leitoOcupado.length>0) { //se ja existe um registro desse paciente, o registro sera atualizado
            Axios.put(`http://localhost:3001/pacientes/${idpacientes}/leito/atualizar`, {selecaoLeito:selecaoLeito})
            .then(() => {
                alert("Leitos atualizados")
            })
        } else { //caso contrario sera feito um novo registro
            Axios.post(`http://localhost:3001/pacientes/${idpacientes}/leito/inserir`, {selecaoLeito:selecaoLeito})
            .then(() => {
                alert("Leitos atualizados")
            })
        }
    }

    useEffect(() => { //recebe os detalhes do paciente do backend
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}`)
        .then((response) => {
            setPacienteDetalhes(response.data)
        })
    })

    useEffect(() => { //recebe dados dos medicos do backend
        Axios.get("http://localhost:3001/medicos")
        .then((response) => {
            setMedicosList(response.data)
        })
    })

    useEffect(() => { //recebe dados dos remedios do backend
        Axios.get("http://localhost:3001/remedios")
        .then((response) => {
            setRemediosList(response.data)
        })
    })

    useEffect(() => { //recebe dados de consultas do backend
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}/consulta`)
        .then((response) => {
            setConsultas(response.data)
        })
    })

    useEffect(() => { //recebe remedios ja tomados pelo paciente do backend
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}/remedio`)
        .then((response) => {
            setRemediosLevadosList(response.data)
        })
    })

    useEffect(() => { //recebe leito atualmente ocupado pelo paciente do backend
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}/leito`)
        .then((response) => {
            setLeitoOcupado(response.data)
        })
    })

    return(
        <div>
            <header className='cabecalho'>
                <Link to="/pacientes"><AiOutlineArrowLeft size={25} color="#FFF"/></Link>
                <h2 className='cabecalho_titulo'>Detalhes de Paciente</h2>
            </header>
        <div className='detalhes_paciente'>
            {pacienteDetalhes.map((value) => {
                    return(
                        <div>
                            <div className='detalhes_paciente_leituras'>
                                <h1>Nome do paciente: {value.nome} | Número do cartão SUS: {value.sus}</h1>
                            </div>
                            <div className='detalhes_paciente_inputs'>
                                <p>Use os campos ao lado para fazer atualizações, se necessário:</p>
                                <input type='text' name='nome' placeholder='Atualizar nome' onChange={(e)=>{
                                    setNome(e.target.value)
                                }}/>
                                <input type='number' name='sus' placeholder='Atualizar número do cartão SUS' onChange={(e)=>{
                                    setSUS(e.target.value)
                                }}/>
                                <button type='submit' onClick={atualizarPaciente}>Salvar Alterações</button>
                            </div>
                        </div>
                    )
                })}
        </div>
        <hr/>
        <div className='detalhes_medicos'>
            <h1>Consultas já feitas</h1>
            {consultas.map((value) => {
                    const data1 = value.data.split('T')
                    const data2 = data1[0]
                    const dataFormatada = data2.split('-').reverse().join('/')
                    return(
                        <div className='detalhes_medicos_sub'>
                            <p>Médico: {value.nome} | Especialidade: {value.especialidade} | Prontuário: {value.prontuario} | Data: {dataFormatada}</p>
                        </div>
                    )
                })}
            <hr/>
            <h1>Cadastrar nova consulta</h1>
            <div className='consulta_nova'>
                <select name='selecaoMedico' onChange={(e)=>{setMedico(e.target.value)}}>
                    {medicosList.map((value) => {
                        return(
                            <option value={value.idmedicos}>{value.nome} {value.especialidade}</option>
                        )
                    })}
                </select>
                <input type='number' name='prontuario' placeholder='Prontuário' onChange={(e)=>{
                    setProntuario(e.target.value)
                }}/>
                <button type='submit' onClick={atualizarConsulta}>Gravar Consulta</button>
            </div>
        </div>
        <hr/>
        <div className='detalhes_remedios'>
            <h1>Medicações administradas</h1>
            {remediosLevadosList.map((value) => {
                    const data1 = value.data.split('T')
                    const data2 = data1[0]
                    const dataFormatada = data2.split('-').reverse().join('/')
                    return(
                        <div className='detalhes_remedios_sub'>
                            <p>Medicação: {value.nome} | Quantidade: {value.qte} | Data: {dataFormatada}</p>
                        </div>
                    )
                })}
            <hr/>
            <h1>Tomar nova medicação</h1>
            <div className='remedio_novo'>
                <select name='selecaoRemedio' onChange={(e)=>{setRemedio(e.target.value)}}>
                {remediosList.map((value) => {
                        return(
                            <option value={value.idremedios}>{value.nome} Lote: {value.lote}</option>
                        )
                    })}
                </select>
                <input type='number' name='qte' placeholder='Quantidade' onChange={(e)=>{
                    setQTE(e.target.value)
                }}/>
                <button type='submit' onClick={atualizarRemedios}>Atualizar Remédios</button>
            </div>
        </div>
        <hr/>
        <div className='detalhes_leito'>
            <h1>Seleção de leito</h1>
            {leitoOcupado.map((value) => {
                return(
                    <p>O leito atualmente ocupado é: {value.leito}</p>
                )
            })}
            <select name='selecaoLeito' onChange={(e)=>{setSelecaoLeito(e.target.value)}}>
                <option value='liberado'>Liberado</option>
                <option value='UTI'>UTI</option>
                <option value='Enfermaria'>Enfermaria</option>
            </select>
            <button type='submit' onClick={atualizarLeito}>Atualizar Leitos</button>
        </div>
            
        </div>
    );
}

export default PacientesDetalhes