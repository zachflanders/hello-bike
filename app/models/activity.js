var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  username: String,
  name: String,
  route: Array,
  description: String,
  date: Date
});



//return the model
module.exports = mongoose.model('ActiVity', ActivitySchema);
