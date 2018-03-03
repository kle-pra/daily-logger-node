const express = require('express');
const router = express.Router();
const Log = require('../models/log.model');

// middleware that is specific to this router
router.use(function log(req, res, next) {
    console.log("request " + req);
    next();
})

router.get('/:id', function (req, res) {
    Log.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ error: error });
        }

        return res.json(data);

    });
})

router.get('/', function (req, res) {
    Log.find({}, function (err, data) {
        if (err) {
            console.log(err);
            return res.json({ error: error });
        }

        return res.json(data);

    });
})

router.post('/', function (req, res) {

    let text = req.body.text;
    let date = req.body.date;
    let newLog = new Log({
        text: text,
        date: date
    });
    newLog.save((err) => {
        if (err) {
            console.log(err);
            return res.json({ error: error });
        }
        return res.json(newLog);

    })
});

router.put('/:id', function (req, res) {

    let text = req.body.text;
    let date = req.body.date;
    let updateLogData = {
        text: text,
        date: date
    };

    Log.findByIdAndUpdate(req.params.id, updateLogData, { new: true }, (err, log) => {
        if (err) {
            console.log(err);
            return res.json({ error: err });
        }
        console.log(log);
        return res.json(log);

    });
});

router.delete('/:id', function (req, res) {

    Log.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err);
            return res.json({ error: error });
        }
        res.sendStatus(204);
    });
});




module.exports = router;