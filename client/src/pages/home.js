import React from 'react';
import './home.css';
import {BiHealth} from "react-icons/bi";
import {BsFillPersonFill} from "react-icons/bs";
import {AiFillMedicineBox} from "react-icons/ai";
import {FaBed} from "react-icons/fa";
import {Link} from 'react-router-dom';


function Home () {
    return(
        <div className='total'>
            <header className='cabecalho'>
                <h1 className='cabecalho_titulo'>Home</h1>
            </header>
            <div className='home'>
                <h1 className='titulo'>Bem vindo ao Sistema de Informação Hospitalar</h1>
                <h2 className='subtitulo'>Você está na página principal, selecione abaixo o que deseja fazer</h2>
                <h2>
                    <Link to="/medicos"><BiHealth size={25} color = "000"/></Link>
                    Clique neste ícone para ir para a página de médicos
                </h2>
                <h2>
                    <Link to="/pacientes"><BsFillPersonFill size={25} color = "000"/></Link>
                    Clique neste ícone para ir para a página de pacientes
                </h2>
                <h2>
                    <Link to="/remedios"><AiFillMedicineBox size={25} color = "000"/></Link>
                    Clique neste ícone para ir para a página de remédios
                </h2>
                <h2>
                    <Link to="/leitos"><FaBed size={25} color = "000"/></Link>
                    Clique neste ícone para ir para a página de leitos
                </h2>
            </div>
        </div>
    );
}

export default Home;