var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
  username: String,
  name: String,
  route: Array
});



//return the model
module.exports = mongoose.model('ActiVity', ActivitySchema);
