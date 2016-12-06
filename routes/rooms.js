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
  newRoom.rule = req.body.rule;
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


/*
router.get('/:id', function(req, res, next) {
  Room.findById({_id: req.params.id}, function(err, rooms){
    if(err){
      return next(err);
    }
    rooms.save(function(err) {
      if(err) {
        return next(err);
      }
      res.render('rooms/show', {room : rooms}); 
    });
  });
});



router.get('/:id/edit', function(req, res, next) {
  Room.findById(req.params.id, function(err, rooms){
    if(err){
      return next(err);
    }
    res.render('posts/edit',{room : rooms});
  });
});


router.put('/:id', function(req, res, next) {
  Room.findById(req.params.id, function(err, rooms){
    if(err) {
      return next(err);
    }
   // newRoom.user = req.body.user;
   // newRoom.title = req.body.title;
    newRoom.city = req.body.city;
    newRoom.address = req.body.address;
    newRoom.price = req.body.price;
    newRoom.facility = req.body.facility;
    newRoom.rule = req.body.rule;
    newRoom.content = req.body.content;
    newRoom.save(function(err, room){
      if(err) {
        return next(err);
      }
      res.render('posts/show', {room : rooms});
    });
  });
});


router.delete('/:id', function(req, res, next) {
  Room.findOneAndRemove({_id: req.params.id}, function(err){
    if(err) {
      return next(err);
    }
    res.redirect('/rooms');
  });
});

*/

module.exports = router;
