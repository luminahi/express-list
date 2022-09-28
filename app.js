"use strict";
const express = require('express');
const fs = require('fs');
const extra = require('./routes/extra.js');
const app = express();
const PORT = 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(extra);
let users;
fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err)
        return console.error(err);
    users = JSON.parse(data);
});
function register() {
    fs.writeFile('./users.json', JSON.stringify(users), (err) => {
        if (err)
            console.error(err);
    });
}
;
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/users', (req, res) => {
    res.render('users', { users });
});
app.post('/users', (req, res) => {
    const { user } = req.body;
    users.push({ nome: user });
    register();
    res.redirect('/users');
});
app.get('/users/add', (req, res) => {
    res.render('adduser');
});
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users[id];
    res.render('user-id', { user });
});
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    users = users.filter((x) => {
        return x == users[id] ? false : true;
    });
    register();
    res.send('removed');
});
app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});
