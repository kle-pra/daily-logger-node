const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

//send credentials to this endpoint, verify user in db and generate token
router.post('/login', function (req, res) {
  //find user
  User.findOne({ email: req.body.email }, function (error, user) {
    if (error) throw error;
    if (!user || !req.body.password) {
      res.status(401).json({ success: false, msg: 'Wrong username/password.' });
    }
    // check password (bcrypt when prod!) and return succes json with token if ok
    else if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign({ data: user }, 's3cr3t', {
        expiresIn: 604800 // 1 week
      });
      res.json({
        success: true,
        token: 'JWT ' + token,
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email
        }
      })
    } else {
      res.status(401).json({ success: false, msg: 'Wrong email/password.' });
    }
  });
});

module.exports = router;
