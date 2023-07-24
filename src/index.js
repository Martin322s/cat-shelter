const express = require('express');
const { initViewEngine } = require('../config/hbs');
const app = express();
const port = 5000;
const breeds = require('./breeds.json');
const cats = require('./cats.json');
const fs = require('fs');
const path = require('path');

initViewEngine(app);
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home', { cats });
});

app.get('/cats/add-cat', (req, res) => {
    res.render('addCat', { breeds });
});

app.post('/cats/add-cat', (req, res) => {
    cats.push({ ...req.body, _id: cats.length });
    let jsonData = JSON.stringify(cats, '', 4);
    fs.writeFile(path.resolve('./src', 'cats.json'), jsonData, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.get('/cats/add-breed', async (req, res) => {
    res.render('addBreed');
});

app.post('/cats/add-breed', async (req, res) => {
    breeds.unshift({ breed: req.body.breed });
    let jsonData = JSON.stringify(breeds, '', 4);
    fs.writeFile(path.resolve('./src', 'breeds.json'), jsonData, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/cats/add-cat');
        }
    });
});

app.get('/cats/edit/:catId', (req, res) => {
    const catId = req.params.catId;
    const cat = cats.find(cat => cat._id === Number(catId));
    res.render('edit', { cat, breeds });
});

app.post('/cats/edit/:catId', (req, res) => {
    
});

app.listen((port), () => console.log(`Server is working at port: ${port}`));