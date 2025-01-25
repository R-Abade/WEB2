const express = require('express');
const mysql = require('mysql2');
const bd = require('./bd');

const port = 3000;
const app = express();

app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'abade',
    password: 'Raphaell1@',
    database: 'web2',
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao BD: ', err);
        return;
    }
    console.log('Conexão bem sucedida com o BD');
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});

app.get('/ferramentas', (request, response) => {
    connection.query('SELECT * FROM ferramentas', (err, results) => {
        if (err) {
            console.error('Erro ao realizar consulta: ', err);
            response.status(500).send('Erro ao realizar consulta');
            return;
        }
        response.send(results);
    });
});

app.get('/ferramentas/:id', (request, response) => {
    const id = request.params.id;
    connection.query('SELECT * FROM ferramentas WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao obter item: ', err);
            response.status(500).send('Erro ao obter item');
            return;
        }
        response.send(results.length ? results[0] : 'Item não encontrado');
    });
});

app.post('/ferramentas', (request, response) => {
    const { nome, preco } = request.body;
    connection.query('INSERT INTO ferramentas (nome, preco) VALUES (?, ?)', [nome, preco], (err, results) => {
        if (err) {
            console.error('Erro ao criar item: ', err);
            response.status(500).send('Erro ao criar ferramenta');
            return;
        }
        response.send({ id: results.insertId, nome, preco });
    });
});

app.delete('/ferramentas/:id', (request, response) => {
    const id = request.params.id;
    connection.query('DELETE FROM ferramentas WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar: ', err);
            return;
        }
        response.send(`Registro ${id} deletado com sucesso!`);
    });
});

app.put('/ferramentas/:id', (request, response) => {
    const id = request.params.id;
    const { nome, preco } = request.body;
    connection.query('UPDATE ferramentas SET nome = ?, preco = ? WHERE id = ?', [nome, preco, id], (err, results) => {
        if (err) {
            console.error('Erro na atualização de dados: ', err);
            return;
        }
        response.send(`Registro ${id} atualizado com sucesso!`);
    });
});

