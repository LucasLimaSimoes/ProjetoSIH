const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "tcc",
});

app.get("/", (req,res) =>{
    db.query("INSERT INTO usuarios (user, password) VALUES ('teste', 'teste')", (err, result) =>{
        res.send("Teste4");
    });
});

app.listen(3001, () => {
    console.log("rodando na porta 3001");
});