import React from 'react';
import './home.css'
import {barra_lateral} from './barra_lateral';


function home () {
    return(
        <div>
            <barra_lateral/>
            <div className='home'>
                <h1 className='titulo'>Bem vindo ao sistema [inserir nome]</h1>
                <h2 className='subtitulo'>Você está na página principal, use a barra lateral para começar a usar o sisterma</h2>
            </div>
        </div>
    );
}

export default home;