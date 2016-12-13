var express = require('express');
var router = express.Router();
var Room = require('../models/Room');
var Reservation = require('../models/Reservation');

/* GET home page. */
router.get('/', function(req, res, next) {
    Room.find({}, function(err, rooms){
        if(err){
            return next(err);
        }
        res.render('rooms/index', {rooms: rooms});
    });

});

router.post('/search', function(req, res, next) {
    Room.find({city : req.body.city}, function(err, rooms){
        if(err){
            return next(err);
        }
        res.render('rooms/index', {rooms: rooms});
    });

});

// 로그인 후 hosting 게시판
router.post('/', function(req, res, next) {
  var newRoom = new Room();
  newRoom.user = req.user.id;
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



router.get('/:id', function(req, res, next) {
  Room.findById(req.params.id, function(err, room){
    if(err){
      return next(err);
    }

    res.render('rooms/show', {room : room});
  });
});




// 호스팅 수정
router.get('/:id/edit', function(req, res, next) {
  Room.findById(req.params.id, function(err, rooms){
    if(err){
      return next(err);
    }
    res.render('rooms/edit',{room : rooms});
  });
});


router.put('/:id', function(req, res, next) {
  Room.findById(req.params.id, function(err, room){
    if(err) {
      return next(err);
    }
   // newRoom.user = req.body.user;
   // newRoom.title = req.body.title;
    room.city = req.body.city;
    room.address = req.body.address;
    room.price = req.body.price;
    room.facility = req.body.facility;
    room.rule = req.body.rule;
    room.content = req.body.content;
    room.save(function(err, resultRoom){
      if(err) {
        return next(err);
      }
      res.render('rooms/myShow', {room : resultRoom});
    });
  });
});


//예약
router.get('/reserves/:id', function(req, res, next){
  Room.findById(req.params.id, function(err, room){
    if(err){
      console.log("err");
      return next(err);
    }
    res.render('rooms/reservation', {room: room});
  });

});

//예약
router.put('/reserves/:id', function(req, res, next){
  console.log(req.params.id);
  console.log(req.body.num);
  Room.findById(req.params.id, function(err, room){
    if(err){
      console.log("err");
      return next(err);
    }

    var reserve = new Reservation();
    reserve.room = req.params.id;
    reserve.user = req.user.id;
    reserve.checkIn = req.body.checkIn;
    reserve.checkOut = req.body.checkOut;
    reserve.num = req.body.num;
    reserve.save(function(err, resultReserve){
      if(err) {
        return next(err);
      }
      res.render('rooms/show', {room: room});
    });
  });
});

// // myRoom-myShow 리스트
// router.post('/myRooms:id', function(req, res, next) {
//   reserve.room = req.params.id;
//   reserve.user = req.user.id;
//   reserve.checkIn = req.body.checkIn;
//   reserve.checkOut = req.body.checkOut;
//   reserve.num = req.body.num;
//   reserve.save(function(err, resultReserve){
//       if(err){
//           console.log("리스트추가에러");
//           return next(err);
//       }
//       return res.redirect('/rooms/myShow', {reserve: resultReserve});
//   });
// });



// 예약 신청
//router.put('/:id', function(req, res, next) {
//  Reservation.findById(req.params.id, function(err, rooms){
//    var reserve = new Reservation();
//    reserve.checkIn = req.body.checkIn;
//    reserve.checkOut = req.body.checkOut;
//    reserve.num = req.body.num;
//    reserve.save(function(err, resultReserve){
//      if(err) {
//        return next(err);
//      }
//      res.render('rooms/show', {room : resultReserve});
//    });
//  });
//});



// 삭제
router.delete('/:id', function(req, res, next) {
  Room.findOneAndRemove(req.params.id, function(err){
    if(err) {
      return next(err);
    }
    res.redirect('/myRooms');
  });
});



module.exports = router;
