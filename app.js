var express = require('express');
var path = require('path');
var app = express();
const mongoose = require('mongoose');
const parser = require('body-parser');
const logRoute = require('./routes/log.route');


mongoose.connect('mongodb://dailylogger:dailylogger@ds119436.mlab.com:19436/daily-logger');


app.use(express.static(path.join(__dirname, 'static')))
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
    res.send('hello world')
});

app.use('/api/logs', logRoute);
app.listen(3000, () => console.log('Example app listening on port 3000!'))