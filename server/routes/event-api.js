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

router.delete('/remove/:eventName', function(req, res) {
  Event.remove({ eventName: req.params.eventName }, function(err) {
    if (err) return res.status(500).json({err: err});
    //res.body = events;
    res.status(200).json({status: 'Event removed successfully!'});
  })
});

router.get('/get', function(req, res) {
  Event.find({}, function(err, events) {
    if (err) res.status(500).json({err: err});
    res.status(200).json(events);
  })
});


module.exports = router;
