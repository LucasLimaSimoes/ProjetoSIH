const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createPool({ //conecta com o banco de dados
    host: "localhost",
    user: "root",
    password: "",
    database: "tcc",
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

//Login e cadastro
app.post("/cadastro", (req,res) => { //faz o cadastro de usuarios
    const user = req.body.user
    const password = req.body.password
    bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query("INSERT INTO usuarios (user, password) VALUES (?, ?)", [user, hash], (err, result) => {
            res.send(result)
        })
    })
})

app.post("/login", (req,res) => { //faz o login de um usuario
    const user = req.body.user
    const password = req.body.password
    db.query("SELECT * FROM usuarios WHERE usuario = ?", user, (err, result) => { //procura o usuario no banco de dados
        if (result.length > 0) { //caso encontre
            const hash = result[0].senha
            bcrypt.compare(password, hash, (error, response) => { //compara a senha dada com a criptografada cadastrada
                if (response) { //caso a senha esteja certa
                    res.send(result)
                } else { //caso esteja errada
                    res.send(response)
                }
            })
        } else { //caso nao encontre o usuario
            res.send(result)
        }
    })
})

//medicos
app.post("/medicos/cadastro", (req,res) => { //insere um novo registro na tabela medicos
    const nome = req.body.nome
    const crm = req.body.crm
    const especialidade = req.body.especialidade
    db.query("INSERT INTO medicos (nome, crm, especialidade) VALUES (?,?,?)", [nome, crm, especialidade], (err, result) => {
        res.send(result)
    })
})

app.get("/medicos", (req,res) => { //devolve todos os registros da tabela medicos
    db.query("SELECT * FROM medicos", (err, result) => {
        res.send(result)
    })
})

app.delete("/medicos/deletar/:idmedicos", (req,res) => { //deleta um registro da tabela medicos
    const idmedicos = req.params.idmedicos
    db.query("DELETE FROM medicos WHERE idmedicos = ?", idmedicos, (err, result) => {
        if (err) console.log(err)
    })
})

//remedios
app.post("/remedios/cadastro", (req,res) => { //insere um novo registro na tabela remedios
    const nome = req.body.nome
    const qte = req.body.qte
    const lote = req.body.lote
    const validade = req.body.validade
    db.query("INSERT INTO remedios (nome, qte, lote, validade) VALUES (?,?,?,?)", [nome, qte, lote, validade], (err, result) => {
        res.send(result)
    })
})

app.get("/remedios", (req,res) => { //devolve todos os registros da tabela remedios
    db.query("SELECT * FROM remedios", (err, result) => {
        res.send(result)
    })
})

app.get("/remedios/vencer", (req,res) => { //devolve registros da tabela remedios com a quantidade de dias até a validade
    db.query("SELECT remedios.idremedios, remedios.nome, (remedios.qte - IFNULL(paciente_remedio.qte, 0)) AS qte, remedios.lote, remedios.validade, DATEDIFF(remedios.validade, CURRENT_DATE) AS dias FROM remedios LEFT JOIN paciente_remedio ON remedios.idremedios = paciente_remedio.FK_remedio", (err, result) => {
        res.send(result)
    })
})

app.delete("/remedios/deletar/:idremedios", (req,res) => { //deleta um regsitro da tabela remedios
    const idremedios = req.params.idremedios
    db.query("DELETE FROM remedios WHERE idremedios = ?", idremedios, (err, result) => {
        if (err) console.log(err)
    })
})

app.get("/remedios/estoque", (req,res) => { //devolve registros da tabela remedios diminuindo o que foi consumido na tabela paciente_remedio
    db.query("SELECT remedios.idremedios, remedios.nome, (remedios.qte - IFNULL(paciente_remedio.qte, 0)) AS qte, remedios.lote, remedios.validade FROM remedios LEFT JOIN paciente_remedio ON remedios.idremedios = paciente_remedio.FK_remedio", (err, result) => {
        res.send(result)
    })
})

//leitos
app.get("/:selecaoHospital/leitos", (req, res) => { //devolve determinada linha da tabela hospitais
    const selecaoHospital = req.params.selecaoHospital
    db.query("SELECT * FROM hospitais WHERE idhospitais = ?", selecaoHospital, (err, result) => {
        res.send(result)
    })
})

app.get("/leitos/ocupacao", (req, res) => { //conta quantos de cada tipo de leito estão ocupados na tabela paciente_leito
    db.query("SELECT leito, COUNT(FK_paciente) AS qte FROM paciente_leito GROUP BY leito", (err, result) => {
        res.send(result)
    })
})

//pacientes
app.post("/pacientes/cadastro", (req, res) => { //insere um novo registro na tabela pacientes
    const nome = req.body.nome
    const sus = req.body.sus
    db.query("INSERT INTO pacientes (nome, sus) VALUES (?, ?)", [nome, sus], (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes", (req, res) => { //devolve todos os registros da tabela pacientes
    db.query("SELECT * FROM pacientes", (err, result) => {
        res.send(result)
    })
})

//detalhes
app.get("/pacientes/:idpacientes", (req, res) => { //devolve o registro de um determinado paciente
    const idpacientes = req.params.idpacientes
    db.query("SELECT * FROM pacientes WHERE idpacientes = ?", idpacientes, (err, result) => {
        res.send(result)
    })
})

app.put("/pacientes/:idpacientes/atualizar", (req, res) => { //atualiza os registros de um determinado paciente na tabela pacientes
    const idpacientes = req.params.idpacientes
    const nome = req.body.nome
    const sus = req.body.sus
    db.query("UPDATE pacientes SET nome = ?, sus = ? WHERE idpacientes = ?", [nome, sus, idpacientes], (err, result) => {
        res.send(result)
    })
})

app.post("/pacientes/:idpacientes/consulta/adicionar", (req, res) => { //insere um novo registro na tabela paciente_medico
    const idpacientes = req.params.idpacientes
    const medico = req.body.medico
    const prontuario = req.body.prontuario
    db.query("INSERT INTO paciente_medico (FK_paciente, FK_medico, prontuario) VALUES (?, ?, ?)", [idpacientes, medico, prontuario], (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes/:idpacientes/consulta", (req, res) => { //devolve os registros de determinado paciente na tabela paciente_medico
    const idpacientes = req.params.idpacientes
    db.query("SELECT medicos.nome, medicos.especialidade, paciente_medico.prontuario, paciente_medico.data FROM paciente_medico INNER JOIN medicos ON paciente_medico.FK_medico = medicos.idmedicos WHERE paciente_medico.FK_paciente = ?", idpacientes, (err, result) => {
        res.send(result)
    })
})

app.post("/pacientes/:idpacientes/remedio/adicionar", (req, res) => { //insere um novo registro na tabela paciente_remedio
    const idpacientes = req.params.idpacientes
    const remedio = req.body.remedio
    const qte = req.body.qte
    db.query("INSERT INTO paciente_remedio (FK_paciente, FK_remedio, qte) VALUES (?, ?, ?)", [idpacientes, remedio, qte], (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes/:idpacientes/remedio", (req, res) => { //devolve os registros de determinado paciente na tabela paciente_remedio
    const idpacientes = req.params.idpacientes
    db.query("SELECT remedios.nome, paciente_remedio.qte, paciente_remedio.data FROM paciente_remedio INNER JOIN remedios ON paciente_remedio.FK_remedio = remedios.idremedios WHERE paciente_remedio.FK_paciente = ?", idpacientes, (err, result) => {
        res.send(result)
    })
})

app.get("/pacientes/:idpacientes/leito", (req, res) => { //devolve o registro de determinado paciente na tabela paciente_leito
    const idpacientes = req.params.idpacientes
    db.query("SELECT * FROM paciente_leito WHERE FK_paciente = ?", idpacientes, (err, result) => {
        res.send(result)
    })
})

app.put("/pacientes/:idpacientes/leito/atualizar", (req, res) => { //atualiza o registro de determinado paciente na tabela paciente_leito
    const idpacientes = req.params.idpacientes
    const selecaoLeito = req.body.selecaoLeito
    db.query("UPDATE paciente_leito SET leito = ? WHERE FK_paciente = ?", [selecaoLeito, idpacientes], (err, result) => {
        res.send(result)
    })
})

app.post("/pacientes/:idpacientes/leito/inserir", (req, res) => { //insere novo registro na tabela paciente_leito
    const idpacientes = req.params.idpacientes
    const selecaoLeito = req.body.selecaoLeito
    db.query("INSERT INTO paciente_leito (FK_paciente, leito) VALUES (?, ?)", [idpacientes, selecaoLeito], (err, result) => {
        res.send(result)
    })
})

app.listen(3001, () => {
    console.log("rodando na porta 3001")
})