import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import './remedios.css'
import {AiFillHome} from "react-icons/ai";
import {Link} from 'react-router-dom';
import _ from 'lodash';


function Remedios () {

    const [nome, setNome] = useState('')
    const [qte, setQTE] = useState(0)
    const [lote, setLote] = useState(0)
    const [validade, setValidade] = useState(new Date())
    const [remediosList, setRemediosList] = useState([])
    const [remediosVencerList, setRemediosVencerList] = useState([])
    const [estoqueRemedios, setEstoqueRemedios] = useState([])

    const cadastrarRemedio = () =>{
        Axios.post("http://localhost:3001/remedios/cadastro", {nome:nome, qte:qte, lote:lote, validade:validade})
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
    })

    useEffect(() => {
        Axios.get("http://localhost:3001/remedios/vencer").then((response) => {
            setRemediosVencerList(response.data)
        })
    })

    useEffect(() => {
        Axios.get("http://localhost:3001/remedios/estoque").then((response) => {
            setEstoqueRemedios(response.data)
        })
    })

    const values = _.groupBy(estoqueRemedios, (value) => value.nome)
	const result = _.map(values, (value, key) => [
        key, _.sumBy(values[key], (v) => v.qte),
    ])
    
    return(
        <div className='container_remedios'>
            <header className='cabecalho'>
                <Link to="/home"><AiFillHome size={25} color="#FFF"/></Link>
                <h2 className='cabecalho_titulo'>Página de Remédios</h2>
            </header>
            <div className='r_cadastro'>
                <h1 className='r_titulo'>Cadastro de Remedios</h1>
                <div className='subCadastro'>
                    <input type='text' name='nome' placeholder='Nome' onChange={(e)=>{
                        setNome(e.target.value)
                    }}/>
                    <input type='number' name='qte' placeholder='Quantidade' onChange={(e)=>{
                        setQTE(e.target.value)
                    }}/>
                    <input type='number' name='lote' placeholder='Lote' onChange={(e)=>{
                        setLote(e.target.value)
                    }}/>
                    <input type='date' name='validade' placeholder='Validade' onChange={(e)=>{
                        setValidade(e.target.value)
                    }}/>
                    <button type='submit' onClick={cadastrarRemedio}>Cadastrar</button>
                </div>
            </div>
            <hr/>
            <div className='r_vencer'>
                <h1 className='r_tituloVencer'>Remédios Perto do Vencimento</h1>
                {remediosVencerList.map((value) => {
                    if (value.dias < 31) {
                        const data1 = value.validade.split('T')
                        const data2 = data1[0]
                        const dataFormatada = data2.split('-').reverse().join('/')
                        return(
                            <div className='card_vencer'>
                                <p>Nome: {value.nome} | Quantidade: {value.qte} | Lote: {value.lote} | Data de Validade: {dataFormatada} | Dias até o Vencimento: {value.dias}</p>
                                <button onClick={() => {deletarRemedio(value.lote, value.nome)}}>Descartar</button>
                            </div>
                    )}
                })}
            </div>
            <hr/>
            <div className='r_listagem'>
                <h1 className='r_titulo'>Listagem de Remedios</h1>
                {result.map((value) => {
                    return(
                        <div className='card_r'>
                            <p>Nome: {value[0]} | Quantidade em Estoque: {value[1]}</p>
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

export default Remedios;