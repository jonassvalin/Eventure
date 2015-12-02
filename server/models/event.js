// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Event = new Schema({
  eventName: String,
  date: Date
});

module.exports = mongoose.model('events', Event);
