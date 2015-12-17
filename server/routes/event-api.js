var express = require('express'),
    router = express.Router(),
    Event = require('../models/event.js');


router.post('/', function(req, res) {
  var event = new Event(req.body);
  event.save(function(err, account) {
    if (err) {
      return res.status(500).json({err: err})
    }
    return res.status(200).json({status: 'Event addition successful!'})
  });
});

router.delete('/:name', function(req, res) {
  Event.remove({ name: req.params.name }, function(err) {
    if (err) return res.status(500).json({err: err});
    res.status(200).json({status: 'Event removed successfully!'});
  })
});

router.get('/', function(req, res) {
  Event.find({}, function(err, events) {
    if (err) res.status(500).json({err: err});
    res.status(200).json(events);
  })
});

router.get('/:name', function(req, res) {
  Event.findOne({ name: req.params.name}, function(err, event) {
    if (err) res.status(500).json({err: err});
    res.status(200).json(event);
  })
});


module.exports = router;
