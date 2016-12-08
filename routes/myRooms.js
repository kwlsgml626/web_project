var express = require('express');
var router = express.Router();
var Room = require('../models/Room');

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


//router.get('/myRooms', function(req, res, next) {
//  res.render('rooms/myRoom');
//});


module.exports = router;
