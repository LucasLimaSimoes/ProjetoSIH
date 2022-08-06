import React, {useState, useEffect} from 'react';
import './pacientes.detalhes.css'
import {Link, useParams} from 'react-router-dom';
import Axios from 'axios';
import {AiFillHome} from "react-icons/ai";

function PacientesDetalhes () {

    const {idpacientes} = useParams();
    const [pacienteDetalhes, setPacienteDetalhes] = useState([])
    const [nome, setNome] = useState('')
    const [sus, setSUS] = useState(0)

    const [medicosList, setMedicosList] = useState([])
    const [medico, setMedico] =  useState(0)
    const [prontuario, setProntuario] = useState(0)
    const [consultas, setConsultas] = useState([])

    const [remediosList, setRemediosList] = useState([])
    const [remedio, setRemedio] = useState(0)
    const [qte, setQTE] = useState(0)
    const [remediosLevadosList, setRemediosLevadosList] = useState([])

    const [leitoOcupado, setLeitoOcupado] = useState([])
    const [selecaoLeito, setSelecaoLeito] = useState('')

    const atualizarPaciente = () =>{
        Axios.put(`http://localhost:3001/pacientes/${idpacientes}/atualizar`, {nome:nome, sus:sus})
        .then(() => {
            alert("Dados do paciente atualizados")
        })
    }

    const atualizarConsulta = () =>{
        Axios.post(`http://localhost:3001/pacientes/${idpacientes}/consulta/adicionar`, {medico:medico, prontuario:prontuario})
        .then(() => {
            alert("Dados de consulta atualizados")
        })
    }

    const atualizarRemedios = () =>{
        Axios.post(`http://localhost:3001/pacientes/${idpacientes}/remedio/adicionar`, {remedio:remedio, qte:qte})
        .then(() => {
            alert("Dados de remedios atualizados")
        })
    }

    const atualizarLeito = () =>{
        if(leitoOcupado.length>0){
            Axios.put(`http://localhost:3001/pacientes/${idpacientes}/leito/atualizar`, {selecaoLeito:selecaoLeito})
            .then(() => {
                alert("Leitos atualizados")
            })
        }else{
            Axios.post(`http://localhost:3001/pacientes/${idpacientes}/leito/inserir`, {selecaoLeito:selecaoLeito})
            .then(() => {
                alert("Leitos atualizados")
            })
        }
    }

    useEffect(() => {
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}`)
        .then((response) => {
            setPacienteDetalhes(response.data)
        })
    })

    useEffect(() => {
        Axios.get("http://localhost:3001/medicos")
        .then((response) => {
            setMedicosList(response.data)
        })
    })

    useEffect(() => {
        Axios.get("http://localhost:3001/remedios")
        .then((response) => {
            setRemediosList(response.data)
        })
    })

    useEffect(() => {
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}/consulta`)
        .then((response) => {
            setConsultas(response.data)
        })
    })

    useEffect(() => {
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}/remedio`)
        .then((response) => {
            setRemediosLevadosList(response.data)
        })
    })

    useEffect(() => {
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}/leito`)
        .then((response) => {
            setLeitoOcupado(response.data)
        })
    })

    return(
        <div>
            <header className='cabecalho'>
                <Link to="/home"><AiFillHome size={25} color="#FFF"/></Link>
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
                            <p>Médico: {value.nome} | Prontuário: {value.prontuario} | Data: {dataFormatada}</p>
                        </div>
                    )
                })}
            <hr/>
            <h1>Cadastrar nova consulta</h1>
            <div className='consulta_nova'>
                <select name='selecaoMedico' onChange={(e)=>{setMedico(e.target.value)}}>
                    {medicosList.map((value) => {
                        return(
                            <option value={value.idmedicos}>{value.nome}</option>
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
            <h1>Remédios tomados</h1>
            {remediosLevadosList.map((value) => {
                    const data1 = value.data.split('T')
                    const data2 = data1[0]
                    const dataFormatada = data2.split('-').reverse().join('/')
                    return(
                        <div className='detalhes_remedios_sub'>
                            <p>Remédio: {value.nome} | Quantidade: {value.qte} | Data: {dataFormatada}</p>
                        </div>
                    )
                })}
            <hr/>
            <h1>Tomar novo remédio</h1>
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