const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = mongoose.Schema({
    text: String,
    date: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;


