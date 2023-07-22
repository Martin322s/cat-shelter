const express = require('express');
const { initViewEngine } = require('../config/hbs');
const app = express();
const port = 5000;

initViewEngine(app);

app.listen((port), () => console.log(`Server is working at port: ${port}`));