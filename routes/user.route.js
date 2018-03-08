const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

//get all users
router.get('/', function (req, res) {
    User.find({}, function (err, data) {
        if (error) {
            return res.json({ error: error });
        }
        return res.json(data);
    });
});

//save user
router.post('/', function (req, res) {
    console.log(req.body.password);
    let email = req.body.email;
    let password = req.body.password;
    //bcrypt password before saving to db in real app!
    let newUser = new User({
        _id: null,
        email: email,
        password: bcrypt.hashSync(password, 8)
    });
    newUser.save((error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ success: false, msg: 'Wrong username/password.' });
        }
        return res.json({ success: true, msg: 'You are registered as ' + email });

    })
});

//delete user by id
router.delete('/:id', function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            return res.json({ error: error });
        }
        res.sendStatus(204);
    });
});

module.exports = router;