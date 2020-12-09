const CryptoJS = require('crypto-js');
const AES = require('crypto-js/aes');

const express = require('express')
const hbs = require('hbs');
const path = require('path')

const app = express();
const port = process.env.port || 3000

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPath))
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

app.get('', (req, res)=>{
    res.render('login', {})
})

app.get('/home', (req, res)=>{
    res.render('index', {})
})

app.get('/about', (req, res)=>{
    res.render('about', {})
})

app.get('/details', (req, res)=>{
    res.render('details', {})
})

const { MongoClient } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'password-manager';

app.get('/addDetails', (req, res) => {
    if (!req.query.webName && !req.query.webPass) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    else {
        MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client)=>{
            if(error){
                return console.log('Unable to connect to the database')
            }
            const db = client.db(databaseName)
            var encryptedAES = CryptoJS.AES.encrypt(req.query.webPass, "My Secret Passphrase").toString();
            db.collection('passwords').insertOne({
                websiteName: req.query.webName,
                password: encryptedAES
            })
            return res.send({
                websiteName: req.query.webName,
                password: req.query.webPass
            })
        })
    }
})


app.get('/getDetails', (req, res) => {
    if (!req.query.webName) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    else {
        MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client)=>{
            if(error){
                return console.log('Unable to connect to the database')
            }
            const db = client.db(databaseName)
            db.collection('passwords').findOne({
                websiteName: req.query.webName
            },(error, detail)=>{
                var decryptedBytes = CryptoJS.AES.decrypt(detail.password, "My Secret Passphrase")
                detail.password = decryptedBytes.toString(CryptoJS.enc.Utf8)
                return res.send(detail)
            })
        })
    }
})


app.get('/fetch', (req, res)=>{
    res.render('fetch', {})
})

app.listen(port, ()=>{
    console.log(`Server is listening at ${port}`)
})