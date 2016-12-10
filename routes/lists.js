var express = require('express');
var router = express.Router();
var Room = require('../models/Room');
var Reservation = require('../models/Reservation');


router.get('/', function(req, res, next) {
  Reservation.find({admit: true}, function(err, reservations){
    if(err){
        return next(err);
    }
    return res.render('rooms/list', {reservations: reservations});
  });
});

//router.get('/lists', function(req, res, next) {
//    Room.find({}, function(err, rooms){
//        if(err){
//            return next(err);
//        }
//        res.render('rooms/list', {rooms: rooms});
//    });
//});



//router.get('/lists', function(req, res, next) {
//        res.render('rooms/list', {reserves: reserves});
//});





module.exports = router;
