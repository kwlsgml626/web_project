var express = require('express');
var router = express.Router();
var Room = require('../models/Room');


/* GET home page. */
router.get('/', function(req, res, next) {
    Room.find({user: res.locals.currentUser.id}, function(err, rooms){
        if(err){
            return next(err);
        }
        res.render('rooms/myRoom', {rooms: rooms});
    });
    
});


//router.get('/myRooms', function(req, res, next) {
//  res.render('rooms/myRoom');
//});


module.exports = router;
