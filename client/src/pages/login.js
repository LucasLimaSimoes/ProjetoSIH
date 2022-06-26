import React, {useState} from 'react';
import './login.css';
import {Navigate} from 'react-router-dom'
import Axios from 'axios';

function login () {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
  
    const handleLogin = () => {
      Axios.post("https://localhost:3001/login", {user: user, password: password},{
      }).then((response) =>{
          alert("Logado com sucesso");
          <Navigate to="/home" replace={true}/>
      })
    }
  
    return (
      <div className="container">
        <h1 className="title">SIHMPLR</h1>
        <div className="containerLogin">
          <input type="text" name="user" placeholder="Usuário" onChange={(e)=>{
            setUser(e.target.value)
          }}></input>
          <input type="text" name="password" placeholder="Senha" onChange={(e)=>{
            setPassword(e.target.value)
          }}></input>
          <button className="buttonEnter" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    );
  }

export default login;