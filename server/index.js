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

app.get("/login", (req,res) =>{
    const user = req.body.user
    const password = req.body.password
    db.query("SELECT * FROM usuarios WHERE user = ?", [user], (err, result) =>{
        if (err){
            console.log(err)
        }
        if (result.lenght>0){
            bcrypt.compare(password, result[0].password, (err, result) =>{
                if(result){
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

app.listen(3001, () => {
    console.log("rodando na porta 3001")
});