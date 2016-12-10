var express = require('express');
var router = express.Router();
var Room = require('../models/Room');
var Reservation = require('../models/Reservation');

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

function validateForm(form, options) {
  var name = form.name || "";
  var email = form.email || "";
  name = name.trim();
  email = email.trim();

  if (!name) {
    return '이름을 입력해주세요.';
  }

  if (!email) {
    return '이메일을 입력해주세요.';
  }

  if (!form.password && options.needPassword) {
    return '비밀번호를 입력해주세요.';
  }

  if (form.password !== form.password_confirmation) {
    return '비밀번호가 일치하지 않습니다.';
  }

  if (form.password.length < 6) {
    return '비밀번호는 6글자 이상이어야 합니다.';
  }

  return null;
}


/* GET home page. */
router.get('/', needAuth, function(req, res, next) {
    Room.find({user: req.user.id}, function(err, rooms){
        if(err){
            return next(err);
        }
        res.render('rooms/myRoom', {rooms: rooms});
    });

});

router.get('/:id', function(req, res, next) {
    Room.findById(req.params.id, function(err, room){
       if(err){
           return next(err);
       }
       Reservation.find({room: req.params.id, admit: false}, function(err, reservations){
         if(err){
           return next(err);
         }

         res.render('rooms/myShow', {room : room, reservations: reservations});
       });
    });

  //예약을 누르면 여기나옴
  //Reservation 하나를 새로 만들고
  //이방의 아이디 , req.user.id 하면 요청한 사람의 아이디
});

router.post('/admit/:id', function(req, res, next){
  Reservation.findById(req.params.id, function(err, reservation){
    if(err){
      return next(err);
    }
    reservation.admit = true;
    reservation.save(function(err, resultReservation){
      if(err){
        return next(err);
      }
      res.redirect('/lists');
    });
  });
});


router.delete('/admit/:id', function(req, res, next){
  Reservation.findOneAndRemove({_id : req.params.id}, function(err){
    if(err){
      return next(err);
    }
    // res.render('rooms/myShow', {reservation: resultReservation});
    return res.redirect('/myRooms/:id');
  });
});


//router.get('/myRooms', function(req, res, next) {
//  res.render('rooms/myRoom');
//});


module.exports = router;
