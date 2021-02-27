const express = require('express');
const crypto = require('crypto');
const app = express();
const fs = require('fs');
const port = 3500;
//github gist for quotes https://gist.github.com/awran5/355643af99164a61ae0f95c84206d151
let quotesRaw = fs.readFileSync('quotes.json');
let quotes = JSON.parse(quotesRaw);

app.use(function (req, res, next) {
    console.log('Time:', Date.now())
    console.log('crypto:', crypto.createHash("sha256")
    .update(Date.now().toString()).digest("hex"))
    next()
  })

app.use('/', function (req, res, next) {
    console.log('Request Type:', req.method)
    next()
  })

app.get('/', (req,res) => {
    res.send("hello world")
})


app.get('/wisdomOfTheDay', (req,res) => {
let rand = Math.floor(Math.random() * (quotes.length - 0) + 0)
    res.send(quotes[rand].quote +", "+quotes[rand].author)
})


app.listen(port, () => {
console.log("listening at port:"+port)
})