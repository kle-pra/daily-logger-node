var express = require('express');
var path = require('path');
var app = express();
const mongoose = require('mongoose');
const parser = require('body-parser');
const passport = require('passport');

mongoose.connect('mongodb://dailylogger:dailylogger@ds119436.mlab.com:19436/daily-logger');

app.use(express.static(path.join(__dirname, 'static')))
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use('/api/logs', passport.authenticate('jwt', { session: false }), require('./routes/log.route'));
app.use('/api/users', require('./routes/user.route'));
app.use('/api', require('./routes/auth.route'));

let server = app.listen(process.env.PORT || 3000, () => {
    console.log("App is running");
});