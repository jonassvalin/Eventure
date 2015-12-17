// user model
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var Event = new Schema({
  name: String,
  date: Date,
  description: String
});

module.exports = mongoose.model('events', Event);
