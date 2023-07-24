const express = require('express');
const { initViewEngine } = require('../config/hbs');
const app = express();
const port = 5000;
const breeds = require('./breeds.json');
const fs = require('fs');

initViewEngine(app);
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cats/add-cat', (req, res) => {
    res.render('addCat', { breeds });
});

app.get('/cats/add-breed', async (req, res) => {
    res.render('addBreed');
});

app.post('/cats/add-breed', async (req, res) => {
    breeds.unshift({ breed: req.body.breed });
    let jsonData = JSON.stringify(breeds);
    fs.writeFile('breeds.json', jsonData, { encoding: 'utf-8'}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/cats/add-cat');
        }
    });
});

app.listen((port), () => console.log(`Server is working at port: ${port}`));