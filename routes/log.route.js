const express = require('express');
const router = express.Router();
const Log = require('../models/log.model');

router.get('/', function (req, res) {
    //find all logs for the day from date param else all
    if (req.query.date) {
        let date = new Date(req.query.date);
        let month = date.getMonth();
        let day = date.getDate() + 1;
        let year = date.getFullYear();
        Log.find(
            {
                date: {
                    $gte: new Date(year, month, day - 1),
                    $lt: new Date(year, month, day)
                },
                user: req.user._id
            }
            , function (err, data) {
                if (err) {
                    console.log(err);
                    return res.json({ error: error });
                }
                return res.json(data);

            });
    } else {
        Log.find({}, function (err, data) {
            if (err) {
                console.log(err);
                return res.json({ error: error });
            }
            return res.json(data);
        });
    }
})

router.post('/', function (req, res) {
    let newLog = new Log({
        text: req.body.text,
        date: req.body.date,
        user: req.user._id
    });
    newLog.save((err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        return res.json(newLog);

    })
});

router.put('/:id', function (req, res) {

    let updateLogData = {
        text: req.body.text,
        date: req.body.date
    };

    Log.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user.id
        }, updateLogData, { new: true }, (err, log) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err });
            }
            return res.json(log);

        });
});

router.delete('/:id', function (req, res) {

    Log.findOneAndRemove(
        {
            _id: req.params.id,
            user: req.user.id
        }
        , function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: err });
            }
            res.sendStatus(204);
        });
});

router.get('/:id', function (req, res) {
    Log.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
        return res.json(data);
    });
});

module.exports = router;