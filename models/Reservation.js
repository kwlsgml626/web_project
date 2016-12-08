var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var schema = new Schema({
    checkin: {type: String},
    checkout: {type: String},
    num: {type: String}
},{
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

var Reservation = mongoose.model('Reservation', schema);

module.exports = Reservation;