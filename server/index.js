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
    const sqlInsert = "INSERT INTO users (user, password) VALUES ('admin', 'admin');";
    db.query(sqlInsert, (err, result) =>{
        res.send("Hello world");
    });
});

app.listen(3001, () => {
    console.log("rodando na porta 3001");
});