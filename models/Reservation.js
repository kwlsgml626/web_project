var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var schema = new Schema({
     room: {type: Schema.Types.ObjectId, index: true, required: true},
     user: {type: Schema.Types.ObjectId, index: true, required: true},
    //무슨 방에 대한 예약인지(Room.id)
    //누가 예약 했는지()
    admit: {type: Boolean, default: false},
    checkIn: {type: String},
    checkOut: {type: String},
    num: {type: Number}
},{
    toJSON: { virtuals: true},
    toObject: {virtuals: true}
});

var Reservation = mongoose.model('Reservation', schema);

module.exports = Reservation;
