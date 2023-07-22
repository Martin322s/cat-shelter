const express = require('express');
const { initViewEngine } = require('../config/hbs');
const app = express();
const port = 5000;

const breeds = {
    breed: 'Bombay Cat',
    brred: 'American Bobtail Cat',
    breed: 'Bengal Cat',
    breed: 'British Shorthair Cat',
    breed: 'Unknown'
};

initViewEngine(app);
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cats/add-cat', (req, res) => {
    res.render('addCat', breeds);
});

app.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});

app.post('/cats/add-breed', (req, res) => {
    breeds.unshift(req.body.breed);
    res.redirect('/cats/add-cat');
});

app.listen((port), () => console.log(`Server is working at port: ${port}`));