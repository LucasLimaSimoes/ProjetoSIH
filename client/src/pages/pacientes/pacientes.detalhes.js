import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Axios from 'axios';
import {AiFillHome} from "react-icons/ai";

function PacientesDetalhes () {

    const {idpacientes} = useParams();
    const [pacienteDetalhes, setPacienteDetalhes] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:3001/pacientes/${idpacientes}`)
        .then((response) => {
            setPacienteDetalhes(response.data)
        })
    }, [])

    return(
        <div>
            <header className='cabecalho'>
                <Link to="/home"><AiFillHome size={25} color="#FFF"/></Link>
                <h2 className='cabecalho_titulo'>Detalhes de Paciente</h2>
            </header>
        <div>
            <h1>ID = {idpacientes}</h1>
            {pacienteDetalhes.map((value) => {
                    return(
                        <div className='card_p'>
                            <h2>{value.nome} | {value.sus}</h2>
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

export default PacientesDetalhes