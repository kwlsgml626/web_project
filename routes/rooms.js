var express = require('express');
var router = express.Router();
var Room = require('../models/Room');

/* GET home page. */
router.get('/', function(req, res, next) {
    Room.find({user: res.locals.currentUser.id}, function(err, rooms){
        if(err){
            return next(err);
        }
        res.render('rooms/index', {rooms: rooms});
    });
    
});

// 로그인 후 hosting 게시판
router.post('/', function(req, res, next) {
  var newRoom = new Room();
  newRoom.user = req.body.user;
  newRoom.title = req.body.title;
  newRoom.city = req.body.city;
  newRoom.address = req.body.address;
  newRoom.price = req.body.price;
  newRoom.facility = req.body.facility;
  newRoom.content = req.body.content;
  newRoom.save(function(err, room){
      if(err){
          console.log("방생성에러");
          return next(err);
      }
      return res.redirect('/rooms');
  });
});


router.get('/new', function(req, res, next) {
  res.render('rooms/edit', {room: {}});
});


// myRoom카테고리 클릭
router.get('/myRooms', function(req, res, next) {
  res.render('rooms/myRoom');
});



// allRooms카테고리 클릭
router.get('/allRooms', function(req, res, next) {
  res.render('rooms/allRoom');
});


module.exports = router;
