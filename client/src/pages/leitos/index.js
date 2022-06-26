import React, {useEffect, useState} from 'react';
import {Chart} from 'react-google-charts'
import _ from 'lodash'

export const data_uti = [
    ["Situação", "Quantidade"],
    ["Live", 40],
    ["Ocupado", 10],
  ];

export const data_enfermaria = [
    ["Situação", "Quantidade"],
    ["Live", 85],
    ["Ocupado", 15],
  ];

export const data_total = [
    ["Situação", "Quantidade"],
    ["Live", 125],
    ["Ocupado", 25],
  ];

  export const options_uti = {
    title: "UTI",
  };

  export const options_enfermaria = {
    title: "Enfermaria",
  };

  export const options_total = {
    title: "Total",
  };


function leitos () {
    const [chartData, setChartData] = useState([]);

    const loadData = (data) => {
        const valueTotal = _.sumBy(data, function(o) {return o.quantidade})
    }

    useEffect(() => {
        const data = [
            {idleito: "1", tipo: "UTI", quantidade: "50"},
            {idleito: "2", tipo: "Enfermaria", quantidade: "100"},
        ]

        loadData(data)
    }, [])

    return(
        <div className='leitos'>
            <header><h2>Página de Leitos</h2></header>
            <div className='charts'>
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

export default leitos;