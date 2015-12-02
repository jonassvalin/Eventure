var express = require('express'),
    router = express.Router(),
    Event = require('../models/event.js');


router.post('/add', function(req, res) {
  var event = new Event({ eventName: req.body.eventName, eventDate: req.body.eventDate });
  event.save(function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    return res.status(200).json({status: 'Event addition successful!'})
  });
});

router.get('/get', function(req, res) {
  Event.find({}, function(err, events) {
    /*
    if (err) {
      return res.status(500).json({err: err})
    }
    return res.status(200).json({status: 'Events retrieved successfully!'})*/
    //res.body = events;
    res.status(200).send(events);
  })
});


module.exports = router;
