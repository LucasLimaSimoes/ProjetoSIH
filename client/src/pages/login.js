import React, {useState} from 'react';
import './login.css';
import {useNavigate} from 'react-router-dom';
import Axios from 'axios';

function Login () {
    const [user, setUser] = useState("") //variavel pra receber o nome de usuario
    const [password, setPassword] = useState("") //variavel pra receber a senha

    const navigate = useNavigate() //usado pra redirecionar para outra pagina
  
    const login = () => { //tenta fazer o login
      Axios.post("http://localhost:3001/login", {user:user, password:password}) //envia os inputs de usuario e senha pro backend
      .then((response) =>{
        if (response.data.length>0) { //caso usuario e senha estejam certos
          alert("Logado com sucesso");
          navigate("/home")
        } else { //caso usuario e/ou senha estejam errados
          alert("Usuário e/ou senha incorretos")
        }
      })
    }
    
  
    return (
      <div className="container">
        <h1 className="title">Sistema de Informação Hospitalar</h1>
        <div className="containerLogin">
          <input type="text" name="user" placeholder="Usuário" onChange={(e)=>{
            setUser(e.target.value)
          }}></input>
          <input type="password" name="password" placeholder="Senha" onChange={(e)=>{
            setPassword(e.target.value)
          }}></input>
          <button className="buttonEnter" onClick={login}>Entrar</button>
        </div>
      </div>
    );
  }

export default Login;