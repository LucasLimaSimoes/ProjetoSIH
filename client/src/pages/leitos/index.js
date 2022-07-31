import React, {useEffect, useState} from 'react';
import './leitos.css'
import {Chart} from 'react-google-charts'
import Axios from 'axios'
import {AiFillHome} from "react-icons/ai";
import {Link} from 'react-router-dom'; 

  export const options_uti = {
    title: "UTI",
    chartArea: {left: '25%'}
  };

  export const options_enfermaria = {
    title: "Enfermaria",
    chartArea: {right: '10%'}
  };

  export const options_total = {
    title: "Total",
    chartArea: {left: '45%'}
  };


function Leitos () {
    const [leitosVagas, setLeitosVagas] = useState([])
    const [pacientesOcupando, setPacientesOcupando] = useState([])
    const [UTIOcupado, setUTIOcupado] = useState(0)
    const [UTILivre, setUTILivre] = useState(0)
    const [EnfermariaOcupado, setEnfermariaOcupado] = useState(0)
    const [EnfermariaLivre, setEnfermariaLivre] = useState(0)

    useEffect(() => {
      Axios.get("http://localhost:3001/leitos").then((response) =>{
        setLeitosVagas(response.data)
      })
    }, [])

    useEffect(() => {
      Axios.get("http://localhost:3001/leitos/ocupacao").then((response) => {
        setPacientesOcupando(response.data)
      })
    }, [])

    useEffect(() => {
      {pacientesOcupando.map((value) => {
        if(value.leito === "UTI") {
          setUTIOcupado(value.qte)
        }
        if(value.leito === "Enfermaria") {
          setEnfermariaOcupado(value.qte)
        }
      })}
  
      {leitosVagas.map((value) => {
        if(value.tipo === "UTI") {
          const valor1 = (value.qte - UTIOcupado)
          setUTILivre(valor1)
        }
        if(value.tipo === "Enfermaria") {
          const valor2 = (value.qte - EnfermariaOcupado)
          setEnfermariaLivre(valor2)
        }
      })}
    }, [pacientesOcupando])

    const data_uti = [
      ["Situação", "Quantidade"],
      ["Live", UTILivre],
      ["Ocupado", UTIOcupado],
    ];
    const data_enfermaria = [
      ["Situação", "Quantidade"],
      ["Live", EnfermariaLivre],
      ["Ocupado", EnfermariaOcupado],
    ];
    const data_total = [
      ["Situação", "Quantidade"],
      ["Live", (UTILivre+EnfermariaLivre)],
      ["Ocupado", (UTIOcupado+EnfermariaOcupado)],
    ];

    return(
        <div className='leitos'>
            <header className='cabecalho'>
                <Link to="/home"><AiFillHome size={25} color="#FFF"/></Link>
                <h2 className='cabecalho_titulo'>Página de Leitos</h2>
            </header>
            <div className='charts_1'>
                <Chart
                chartType="PieChart"
                data={data_uti}
                options={options_uti}
                width={"90%"}
                height={"400px"}
                />
                <Chart
                chartType="PieChart"
                data={data_enfermaria}
                options={options_enfermaria}
                width={"90%"}
                height={"400px"}
                />
              </div>
              <div className='charts_2'>
                <Chart
                chartType="PieChart"
                data={data_total}
                options={options_total}
                width={"90%"}
                height={"400px"}
                />
            </div>
            <footer className='rodape'>
                <h1 className='rodape_titulo'>Feito por Lucas Lima Simões</h1>
            </footer>
        </div>
    );
}

export default Leitos;