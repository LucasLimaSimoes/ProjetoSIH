import React from "react";
import {Routes, Route} from "react-router-dom";

import Login from "../pages/login"; //importa a pagina de login
import Home from "../pages/home"; //importa a pagina home
import Leitos from "../pages/leitos"; //importa a pagina de leitos
import Medicos from "../pages/medicos"; //importa a pagina de medicos
import Pacientes from "../pages/pacientes"; //importa a pagina de pacientes
import PacientesDetalhes from "../pages/pacientes/pacientes.detalhes"; //importa a pagina de detalhes de pacientes
import Remedios from "../pages/remedios"; //importa a pagina de remedios

function Rotas() {
   return (
       <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/leitos" element={<Leitos/>}/>
        <Route path="/medicos" element={<Medicos/>}/>
        <Route path="/pacientes" element={<Pacientes/>}/>
        <Route path="/pacientes/:idpacientes" element={<PacientesDetalhes/>}/>
        <Route path="/remedios" element={<Remedios/>}/>
       </Routes>
   );
}

export default Rotas;