const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    text: String,
    date: Date
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;


