const express = require('express');
const fs = require('fs');
const extra = require('./routes/extra.js');

const app = express();
const PORT: number = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(extra);

let users: Array<{}>;

fs.readFile('./users.json', 'utf8', (err: Error, data: string) => {
    if (err) return console.error(err);
    users = JSON.parse(data);
});

function register(): void {
    fs.writeFile('./users.json', JSON.stringify(users), (err: Error) => {
        if (err) console.error(err);
    });
};

app.get('/', (req: any, res: any) => {
    res.render('index');
});

app.get('/users', (req: any, res: any) => {
    res.render('users', { users });
});

app.post('/users', (req: any, res: any) => {
    const { user }  = req.body;
    users.push({nome: user});
    register();
    res.redirect('/users')
});

app.get('/users/add', (req: any, res: any) => {
    res.render('adduser');
});

app.get('/users/:id', (req: any, res: any) => {
    const { id } = req.params;
    const user = users[id];
    res.render('user-id', { user });
});

app.delete('/users/:id', (req: any, res: any) => {
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
