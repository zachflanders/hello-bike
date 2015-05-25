var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RideSchema = new Schema({
  username: String,
  name: String,
  route: Array,
});

//return the model
module.exports = mongoose.model('Ride', RideSchema);
