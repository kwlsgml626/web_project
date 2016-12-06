var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var schema = new Schema({
  user: {type: Schema.Types.ObjectId, index: true, required: true},
  title: {type: String, required: true},
  city: {type: String, require: true},
  address: {type: String, require: true},
  price: {type: Number, require: true},
  facility: {type: String, require: true},
  rule: {type: String, require: true},
  content: {type: String, require: true}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});


var Room = mongoose.model('Room', schema);

module.exports = Room;
