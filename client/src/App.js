import './styles.css';

function App() {
  return (
    <div className="container">
      <h1 className="title">[inserir nome]</h1>
      <div className="containerLogin">
        <input type="text" placeholder="Usuário"></input>
        <input type="text" placeholder="Senha"></input>
        <button className="buttonEnter" onClick={alert("Botão pressionado")}>Entrar</button>
      </div>
    </div>
  );
}

export default App;
