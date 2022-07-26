const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "tcc",
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

//Login e cadastro
app.post("/cadastro", (req,res) => {
    /*const user = 'admin'
    const password = 'admin'
    bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query("INSERT INTO usuarios (user, password) VALUES (?, ?)", [user, hash], (err, result) =>{
            if(err){
                console.log(err)
            }else{
            res.send("Página de Cadastro")
        }});
    })*/
});

app.post("/login", (req,res) =>{
    const user = req.body.user
    const password = req.body.password
    db.query("SELECT * FROM usuarios WHERE user = ?", user, (err, result) =>{
        if (err){
            res.send(err)
        }
        if (result.lenght>0){
            bcrypt.compare(password, result[0].password, (error, response) =>{
                if(response){
                    res.send(result)
                }
            })
        }
    })
})

//medicos
app.post("/medicos/cadastro", (req,res) =>{
    const nome = req.body.nome
    const crm = req.body.crm
    db.query("INSERT INTO medicos (nome, crm) VALUES (?,?)", [nome, crm], (err, result) => {
        res.send(result)
    })
})

app.get("/medicos", (req,res) =>{
    db.query("SELECT * FROM medicos", (err, result) => {
        res.send(result)
    })
})

app.delete("/medicos/deletar/:crm", (req,res) =>{
    const crm = req.params.crm
    db.query("DELETE FROM medicos WHERE crm = ?", crm, (err, result) =>{
        if (err) console.log(err)
    })
})

//remedios
app.post("/remedios/cadastro", (req,res) =>{
    const nome = req.body.nome
    const qte = req.body.qte
    const lote = req.body.lote
    const validade = req.body.validade
    db.query("INSERT INTO remedios (nome, qte, lote, validade) VALUES (?,?,?,?)", [nome, qte, lote, validade], (err, result) => {
        res.send(result)
    })
})

app.get("/remedios", (req,res) =>{
    db.query("SELECT * FROM remedios", (err, result) => {
        res.send(result)
    })
})

app.get("/remedios/vencer", (req,res) =>{
    db.query("SELECT nome, qte, lote, validade, DATEDIFF(validade, CURRENT_DATE) AS dias FROM remedios", (err, result) => {
        res.send(result)
    })
})

app.delete("/remedios/deletar/:lote/:nome", (req,res) =>{
    const lote = req.params.lote
    const nome = req.params.nome
    db.query("DELETE FROM remedios WHERE lote = ? AND nome = ?", [lote, nome], (err, result) =>{
        if (err) console.log(err)
    })
})

//leitos
app.get("/leitos", (req, res) =>{
    db.query("SELECT qte FROM leitos", (err, result) => {
        res.send(result)
    })
})

//pacientes
app.post("/pacientes/cadastro", (req, res) => {
    const nome = req.body.nome
    const sus = req.body.sus
    db.query("INSERT INTO pacientes (nome, sus) VALUES (?, ?)", [nome, sus], (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes", (req, res) =>{
    db.query("SELECT * FROM pacientes", (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes/:idpacientes", (req, res) =>{
    const idpacientes = req.params.idpacientes
    db.query("SELECT * FROM pacientes WHERE idpacientes = ?", idpacientes, (err, result) => {
        res.send(result)
    })
})

app.put("/pacientes/:idpacientes/atualizar", (req, res) =>{
    const idpacientes = req.params.idpacientes
    const nome = req.body.nome
    const sus = req.body.sus
    db.query("UPDATE pacientes SET nome = ?, sus = ? WHERE idpacientes = ?", [nome, sus, idpacientes], (err, result) => {
        res.send(result)
    })
})

app.post("/pacientes/:idpacientes/consulta/adicionar", (req, res) =>{
    const idpacientes = req.params.idpacientes
    const medico = req.body.medico
    const prontuario = req.body.prontuario
    db.query("INSERT INTO paciente_medico (FK_paciente, FK_medico, prontuario) VALUES (?, ?, ?)", [idpacientes, medico, prontuario], (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes/:idpacientes/consulta", (req, res) =>{
    const idpacientes = req.params.idpacientes
    db.query("SELECT * FROM paciente_medico WHERE FK_paciente = ?", idpacientes, (err, result) => {
        res.send(result)
    })
})

app.post("/pacientes/:idpacientes/remedio/adicionar", (req, res) =>{
    const idpacientes = req.params.idpacientes
    const remedio = req.body.remedio
    const qte = req.body.qte
    db.query("INSERT INTO paciente_remedio (FK_paciente, FK_remedio, qte) VALUES (?, ?, ?)", [idpacientes, remedio, qte], (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes/:idpacientes/remedio", (req, res) =>{
    const idpacientes = req.params.idpacientes
    db.query("SELECT * FROM paciente_remedio WHERE FK_paciente = ?", idpacientes, (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes/:idpacientes/leito", (req, res) =>{
    const idpacientes = req.params.idpacientes
    db.query("SELECT * FROM paciente_leito WHERE idpacientes = ?", idpacientes, (err, result) => {
        res.send(result)
    })
})

app.put("/pacientes/:idpacientes/leito/atualizar", (req, res) =>{
    const idpacientes = req.params.idpacientes
    const selecaoLeito = req.body.selecaoLeito
    db.query("UPDATE paciente_leito SET leito = ? WHERE FK_paciente = ?", [selecaoLeito, idpacientes], (err, result) => {
        res.send(result)
    })
})

app.post("/pacientes/:idpacientes/leito/inserir", (req, res) =>{
    const idpacientes = req.params.idpacientes
    const selecaoLeito = req.body.selecaoLeito
    db.query("INSERT INTO paciente_leito (FK_paciente, leito) VALUES (?, ?)", [idpacientes, selecaoLeito], (err, result) => {
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log("rodando na porta 3001")
});