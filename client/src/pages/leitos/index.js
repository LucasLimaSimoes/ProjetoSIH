import React, {useEffect, useState} from 'react';
import './leitos.css';
import {Chart} from 'react-google-charts';
import Axios from 'axios';
import {AiFillHome} from "react-icons/ai";
import {Link} from 'react-router-dom'; 

  export const options_uti = { //opcoes para o grafico dos leitos de UTI
    title: "UTI",
    chartArea: {left: '25%'}
  };

  export const options_enfermaria = { //opcoes para o grafico dos leitos de Enfermaria
    title: "Enfermaria",
    chartArea: {right: '10%'}
  };

  export const options_total = { //opcoes para o grafico total
    title: "Total",
    chartArea: {left: '25%'}
  };


function Leitos () {
    const [leitosVagas, setLeitosVagas] = useState([]) //variavel pra receber o numero de vagas de cada tipo de leito
    const [pacientesOcupando, setPacientesOcupando] = useState([]) //variavel pra receber quais pacientes estao ocupando quais leitos
    const [UTIOcupado, setUTIOcupado] = useState(0) //variavel pra fazer a contagem de quantos pacientes estao no leito de tipo UTI
    const [UTILivre, setUTILivre] = useState(0) //total de vagas UTI - total de vagas UTI ocuapdas no momento
    const [EnfermariaOcupado, setEnfermariaOcupado] = useState(0) //variavel pra fazer a contagem de quantos pacientes estao no leito de tipo Enfermaria
    const [EnfermariaLivre, setEnfermariaLivre] = useState(0) //total de vagas Enfermaria - total de vagas Enfermaria ocuapdas no momento
    const [selecaoHospital, setSelecaoHospital] = useState(1) //variavel pra escolher de qual hospital se deseja ver os leitos

    useEffect(() => { //recebe a quantidade de leitos e ocupantes
      Axios.get(`http://localhost:3001/${selecaoHospital}/leitos`).then((response) => {
        setLeitosVagas(response.data)
      })
      if (selecaoHospital == 1) {
        Axios.get("http://localhost:3001/leitos/ocupacao").then((response) => {
          setPacientesOcupando(response.data)
        })
      } else if (selecaoHospital == 2) {
        const responseO2 = [{"leito":"Enfermaria","qte":75},{"leito":"UTI","qte":50}]
        setPacientesOcupando(responseO2)
      } else if (selecaoHospital == 3) {
        const responseO3 = [{"leito":"Enfermaria","qte":20},{"leito":"UTI","qte":10}]
        setPacientesOcupando(responseO3)
      }
    }, [selecaoHospital])

    const carregar = () => {
      pacientesOcupando.map((value) => { //seta as variaveis de ocupação de acordo com o tipo de leito
        if(value.leito === "UTI") {
          setUTIOcupado(value.qte)
        }
        if(value.leito === "Enfermaria") {
          setEnfermariaOcupado(value.qte)
        }
      })
  
      leitosVagas.map((value) => { //faz a operacao de subtracao e seta as variaveis que vao ser usadas no grafico
        const valor1 = (value.UTI - UTIOcupado)
        setUTILivre(valor1)
        const valor2 = (value.Enfermaria - EnfermariaOcupado)
        setEnfermariaLivre(valor2)
      })
    }

    const data_uti = [ //dados para o grafico de UTI
      ["Situação", "Quantidade"],
      ["Live", UTILivre],
      ["Ocupado", UTIOcupado],
    ];
    const data_enfermaria = [ //dados para o grafico de Enfermaria
      ["Situação", "Quantidade"],
      ["Live", EnfermariaLivre],
      ["Ocupado", EnfermariaOcupado],
    ];
    const data_total = [ //dados para o grafico total
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
            <div className='selecionarHospital'>
              <h1>Selecione o hospital do qual deseja verificar os leitos:</h1>
              <select name='teste' onChange={(e)=>{setSelecaoHospital(e.target.value)}}>
                  <option value='1'>Este Hospital</option>
                  <option value='2'>Hospital 2</option>
                  <option value='3'>Hospital 3</option>
              </select>
              <button className="carregar" onClick={carregar}>Carregar Gráficos</button>
            </div>
            <div className='charts_1'>
                <Chart
                chartType="PieChart"
                data={data_uti}
                options={options_uti}
                width={"100%"}
                height={"400px"}
                />
                <Chart
                chartType="PieChart"
                data={data_enfermaria}
                options={options_enfermaria}
                width={"100%"}
                height={"400px"}
                />
            </div>
            <div className='charts_2'>
                <Chart
                chartType="PieChart"
                data={data_total}
                options={options_total}
                width={"100%"}
                height={"400px"}
                />
            </div>
        </div>
    );
}

export default Leitos;