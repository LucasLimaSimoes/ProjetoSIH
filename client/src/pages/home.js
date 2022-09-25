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
                <div className='grid'>
                <Link to="/medicos"><div className='card'>
                    <h2>
                        <div className='icone'>
                            <BiHealth size={25} color = "000"/>
                        </div>
                        <div className='texto'>
                            Clique aqui para ir para a página de médicos
                        </div>
                    </h2>
                </div></Link>
                <Link to="/pacientes"><div className='card'>
                    <h2>
                        <div className='icone'>
                            <BsFillPersonFill size={25} color = "000"/>
                        </div>
                        <div className='texto'>
                            Clique aqui para ir para a página de pacientes
                        </div>
                    </h2>
                </div></Link>
                </div>
                <div className='grid'>
                <Link to="/remedios"><div className='card'>
                    <h2>
                        <div className='icone'>
                            <AiFillMedicineBox size={25} color = "000"/>
                        </div>
                        <div className='texto'>
                            Clique aqui para ir para a página de medicações
                        </div>
                    </h2>
                </div></Link>
                <Link to="/leitos"><div className='card'>
                    <h2>
                        <div className='icone'>
                            <FaBed size={25} color = "000"/>
                        </div>
                        <div className='texto'>
                            Clique aqui para ir para a página de leitos
                        </div>
                    </h2>
                </div></Link>
                </div>
            </div>
        </div>
    );
}

export default Home;