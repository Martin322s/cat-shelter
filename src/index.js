const express = require('express');
const { initViewEngine } = require('../config/hbs');
const app = express();
const port = 5000;

initViewEngine(app);
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cats/add-cat', (req, res) => {
    res.render('addCat');
});

app.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});

app.listen((port), () => console.log(`Server is working at port: ${port}`));