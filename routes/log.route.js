const express = require('express');
const router = express.Router();
const Log = require('../models/log.model');

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
    //find all logs for the day from date param else all
    if (req.query.date) {
        let date = new Date(req.query.date);
        let month = date.getMonth();
        let day = date.getDate() + 1;
        let year = date.getFullYear();
        let dateString = year + "-" + month + "-" + day;
        Log.find(
            // { '$where': 'this.date.toJSON().slice(0, 10) == "' + dateString + '"' }
            { date: { $gte: new Date(year, month, day - 1), $lt: new Date(year, month, day) } }
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