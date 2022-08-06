import React, {useState} from 'react';
import './login.css';
import {useNavigate} from 'react-router-dom'
import Axios from 'axios';

function Login () {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()
  
    const login = () => {
      Axios.post("http://localhost:3001/login", {user:user, password:password})
      .then((response) =>{
        if (response.data.length>0) {
          alert("Logado com sucesso");
          navigate("/home")
        }else{
          alert("Usuário ou senha incorretos")
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
          <input type="text" name="password" placeholder="Senha" onChange={(e)=>{
            setPassword(e.target.value)
          }}></input>
          <button className="buttonEnter" onClick={login}>Entrar</button>
        </div>
      </div>
    );
  }

export default Login;