import React from "react";
import {Routes, Route} from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/home";
import Leitos from "../pages/leitos";
import Medicos from "../pages/medicos";
import Pacientes from "../pages/pacientes";
import Remedios from "../pages/remedios";

function Rotas() {
   return (
       <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/leitos" element={<Leitos/>}/>
        <Route path="/medicos" element={<Medicos/>}/>
        <Route path="/pacientes" element={<Pacientes/>}/>
        <Route path="/remedios" element={<Remedios/>}/>
       </Routes>
   );
}

export default Rotas;