const express = require('express');

let data = [];

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    return res.status(200).send("Hello World");
});

app.get('/users', (req, res) => {
    return res.status(200).json(data);
});

app.post('/users', (req, res) => {
    data.push(req.body);
    return res.status(200).json(req.body);
});

app.get('/users/:id', (req, res) => {
    const user_id = req.params.id;
    const user = data.filter(user => user.user_id === user_id);
    return res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
    const user_id = req.params.id;
    data = data.filter(user => user.user_id !== user_id);
    return res.status(200).send("success");
});


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});