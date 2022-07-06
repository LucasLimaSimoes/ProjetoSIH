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

app.listen(3001, () => {
    console.log("rodando na porta 3001")
});