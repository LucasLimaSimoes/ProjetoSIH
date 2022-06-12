import React/*, {useState, useEffect}*/ from 'react';
import './login.css';
import Axios from 'axios';

 const login =() => {
    /*const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
  
    const handleLogin = () => {
      Axios.post("https://localhost:3001/login", {user: user, password: password},{
        
      }).then((response) =>{
        if(response){
          alert("Logado com sucesso");
          //<Redirect to="./pages/home" />
        }
      })
    }*/
  
    return (
      <div className="container">
        <h1 className="title">[inserir nome]</h1>
        <div className="containerLogin">
          <input type="text" name="user" placeholder="Usuário" /*onChange={(e)=>{
            setUser(e.target.value)
          }}*/></input>
          <input type="text" name="password" placeholder="Senha" /*onChange={(e)=>{
            setPassword(e.target.value)
          }}*/></input>
          <button className="buttonEnter" /*onClick={handleLogin}*/>Entrar</button>
        </div>
      </div>
    );
  }

export default login;