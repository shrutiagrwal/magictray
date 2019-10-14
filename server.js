const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded())
app.set('views', './views');
app.set("view engine", "ejs");
app.use(express.static('public'));
const form = require('./routes/form');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shrutiagarwal:shruti@magic-tray-ch4fm.mongodb.net/test?retryWrites=true&w=majority')
    .then(() => console.log("database connected.."))
    .catch(err => console.error("couldnt connected to database...", err))


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://shrutiagarwal:shruti@magic-tray-ch4fm.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
//     if (err)
//         console.log(err);
// });


app.listen(process.env.PORT || 3000, (err) => {
    console.log("server started");
    if (err)
        console.log(err);
});
app.get('/', (req, res) => {
    res.render('index');
})
app.use('/form', form);