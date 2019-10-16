const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded())
require('dotenv').config();
app.set('views', './views');
app.set("view engine", "ejs");
app.use(express.static('public'));
const form = require('./routes/form');
const mongoose = require('mongoose');
mongoose.connect(process.env.database)
    .then(() => console.log("database connected.."))
    .catch(err => console.error("couldnt connected to database...", err))





app.listen(process.env.PORT || 3000, (err) => {
    console.log("server started");
    if (err)
        console.log(err);
});
app.get('/', (req, res) => {
    res.render('index');
})
app.use('/form', form);