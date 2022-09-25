import React, { useState, useEffect } from 'react';
import './remedios.css';
import Axios from 'axios';
import {AiFillHome} from "react-icons/ai";
import {Link} from 'react-router-dom';
import _ from 'lodash';


function Remedios () {

    const [nome, setNome] = useState('') //variavel pra receber o nome do remedio
    const [qte, setQTE] = useState(0) //variavel pra receber a quantidade do remedio
    const [lote, setLote] = useState(0) //variavel pra receber o lote do remedio
    const [validade, setValidade] = useState(new Date()) //variavel pra receber a validade do remedio
    const [remediosVencerList, setRemediosVencerList] = useState([]) //variavel pra receber a lista de remedios do backend com dias até o vencimento
    const [estoqueRemedios, setEstoqueRemedios] = useState([]) //variavel pra trabalhar com o estoque de remedios

    const cadastrarRemedio = () => { //cadastra um novo remedio no bd
        if (nome == '' || qte == 0 || lote == 0) { //verifica se os dados estao preenchidos
            alert("Por favor preencha os dados")
        } else { //caso estejam
            Axios.post("http://localhost:3001/remedios/cadastro", {nome:nome, qte:qte, lote:lote, validade:validade})
            .then(() => {
                alert("Cadastro realizado com sucesso")
            })
        }
    }

    const deletarRemedio = (idremedios) => { //remove um remedio do bd
        Axios.delete(`http://localhost:3001/remedios/deletar/${idremedios}`)
        .then(() => {
            alert("Apagado com sucesso")
        })
    }
    

    useEffect(() => { //recebe a lista de remedios com dias ate o vencimento do backend
        Axios.get("http://localhost:3001/remedios/vencer").then((response) => {
            setRemediosVencerList(response.data)
        })
    })

    useEffect(() => { //seta a variavel que sera trabalhada na exibicao de estoque
        Axios.get("http://localhost:3001/remedios/estoque").then((response) => {
            setEstoqueRemedios(response.data)
        })
    })

    const values = _.groupBy(estoqueRemedios, (value) => value.nome) //agrupa os remedios por nome
	const result = _.map(values, (value, key) => [ //devolve nome do remedio e quantidade total
        key, _.sumBy(values[key], (v) => v.qte),
    ])
    
    return(
        <div className='container_remedios'>
            <header className='cabecalho'>
                <Link to="/home"><AiFillHome size={25} color="#FFF"/></Link>
                <h2 className='cabecalho_titulo'>Página de Remédios</h2>
            </header>
            <div className='r_cadastro'>
                <h1 className='r_titulo'>Cadastro de Medicações</h1>
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
                <h1 className='r_tituloVencer'>Medicações Perto do Vencimento</h1>
                {remediosVencerList.map((value) => { //percorre a variavel remediosVencerList
                    if (value.dias < 31) { //verifica os dias ate o vencimento, exibe se menor que 31 dias
                        const data1 = value.validade.split('T') //formatacao de data
                        const data2 = data1[0]
                        const dataFormatada = data2.split('-').reverse().join('/')
                        return(
                            <div className='card_vencer'>
                                <p>Nome: {value.nome} | Quantidade: {value.qte} | Lote: {value.lote} | Data de Validade: {dataFormatada} | Dias até o Vencimento: {value.dias}</p>
                                <button onClick={() => {deletarRemedio(value.idremedios)}}>Descartar</button>
                            </div>
                    )}
                })}
            </div>
            <hr/>
            <div className='r_listagem'>
                <h1 className='r_titulo'>Listagem de Medicações</h1>
                {result.map((value) => { //percorre a variavel result, que possui os remedios em estoque
                    return(
                        <div className='card_r'>
                            <p>Nome: {value[0]} | Quantidade em Estoque: {value[1]}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Remedios;