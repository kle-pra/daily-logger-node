const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    logs: [{ type: Schema.Types.ObjectId, ref: 'Log' }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;