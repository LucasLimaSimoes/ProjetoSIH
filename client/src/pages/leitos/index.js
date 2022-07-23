import React, {useEffect, useState} from 'react';
import './leitos.css'
import {Chart} from 'react-google-charts'
import _ from 'lodash'
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
    const totalVagas = _.sumBy(leitosVagas, function(o) {return o.qte})

    const data_uti = [
      ["Situação", "Quantidade"],
      ["Live", 40 /*leitosVagas[0].qte*/],
      ["Ocupado", 10],
    ];
    const data_enfermaria = [
      ["Situação", "Quantidade"],
      ["Live", 85],
      ["Ocupado", 15],
    ];
    const data_total = [
      ["Situação", "Quantidade"],
      ["Live", totalVagas],
      ["Ocupado", 25],
    ];

    useEffect(() => {
      Axios.get("http://localhost:3001/leitos").then((response) =>{
        setLeitosVagas(response.data)
      })
    }, [])

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