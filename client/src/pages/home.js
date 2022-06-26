import React from 'react';
import './home.css';
import {Link} from 'react-router-dom';


function home () {
    return(
        <div>
            <header>
                <h1>Home</h1>
            </header>
            <div className='home'>
                <h1 className='titulo'>Bem vindo ao SIHMPLR</h1>
                <h2 className='subtitulo'>Você está na página principal, selecione abaixo o que deseja fazer</h2>
                <h2><Link to="/medicos">Médicos</Link></h2>
                <h2><Link to="/pacientes">Pacientes</Link></h2>
                <h2><Link to="/remedios">Remedios</Link></h2>
                <h2><Link to="/leitos">Leitos</Link></h2>
            </div>
        </div>
    );
}

export default home;