var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

var PAGE_LIMIT = 3;

/*Pagination*/
function Pagination(pages, pageNum){
  this.pages = pages;
  this.numPosts = pages[pageNum].posts.length;
  this.firstPage = pages[0];
  if(pageNum === 0){                 // 처음페이지
    this.prevPage = pages[0];
  }
  else {
    this.prevPage = pages[pageNum-1];
  }
  if(pages.length-1 === pageNum){          // 마지막페이지
    this.nextPage = pages[pages.length-1];
  }
  else {
    this.nextPage = pages[pageNum+1];
  }
  this.lastPage = pages[pages.length-1];
}

function Page(pageNum){
  this.posts = [];
  this.url = '/posts/page/' + pageNum;
  this.cls = pageNum;
  this.text = pageNum;
}

/* GET posts listing. */
// '/'가 들어오면 page/1을 그림.
router.get('/', function(req, res, next) {
  res.redirect('/posts/page/1');
});

router.get('/page/:pageNum', function(req, res, next) {
  // pageNum이 들어오면, {}검색 조건이 없기 때문에 모든 posts를 가져옴
  Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    }
    var pages = [];
    for(var i=0; i<=posts.length/PAGE_LIMIT; i++) {
      console.log('for pageNum : ' + (i+1));
      // page를 만듬
      var page = new Page(i+1);
      for(var j=0; j<PAGE_LIMIT; j++) {
        if((PAGE_LIMIT*i) + j === posts.length) {
          break;
        }
        console.log('push');
        page.posts.push(posts[(PAGE_LIMIT*i) + j]);
      }
      console.log('push page');
      pages.push(page);
    }
    // pagination을 만듬
    var pagination = new Pagination(pages, req.params.pageNum-1);
    res.render('posts/index', {posts: pagination.pages[req.params.pageNum-1].posts, pagination: pagination});
  });
});

/* GET home page. */
/*router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts) {    //검색조건이 {}없기에 모든 post를 가져온다.
    if(err) {
      return next(err);
    }
    res.render('posts/index', {posts : posts});
  });
});
*/

/*게시판을 눌렀을떄, 띄우는 화면 */
/*router.get('/', function(req, res, next) {
  res.render('posts/index', {posts:{} });
});
*/

/*게시*/
router.post('/', function(req, res, next) {
  // 글작성 완료시 처리 DB에서 확인.
  console.log('---------');
  console.log(req); // request에 결과가 잘 왔는지 확인한다.
  console.log('---------');

  var posts = new Post({  // posts를 만들어서 request값을 대입한다.
    email : req.body.email,
    password : req.body.password,
    title : req.body.title,
    content : req.body.content,
    read : req.body.read
  });
  posts.save(function(err){ // db에 저장.
    if(err){                            // 에러가 나면 err에 변수값을 저장.
      return next(err);                 // 에러가 발생하면 next로 처리함.
    }
    res.redirect('/posts/' + posts._id);             // 에러가 발생하지 않으면 localhost:3000/posts로 이동.(List창)
  });
});


// 글쓰기 작성
/*글쓰기 버튼 눌렀을 떄,
localhost:3000/posts/new로 접근시 view/posts/edite.jsde를 그린다.*/
router.get('/new', function(req, res, next) {
  res.render('posts/edit', {post:{} });
});

/*id 경로*/
// /:뒤의 값을 id라는 변수값으로 본다.
router.get('/:id', function(req, res, next) {
  // get전송이므로 req.params.id로 접근.
  //request로 넘어온 id값으로 db검색
  Post.findById({_id: req.params.id}, function(err, posts){
    if(err){
      return next(err);
    }
    posts.read++; // 조회수 처리
    posts.save(function(err) {
      if(err) {
        return next(err);
      }
      res.render('posts/show', {post : posts});  // title->post를 보여줌.
    });
  });
});

/*수정이동*/
router.get('/:id/edit', function(req, res, next) {
  Post.findById(req.params.id, function(err, posts){
    if(err){
      return next(err);
    }
    res.render('posts/edit',{post : posts});
  });
});

/*수정완료*/
router.put('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, posts){
    if(err) {
      return next(err);
    }
    //posts.email = req.body.email,
    //posts.password = req.body.password,
    posts.title = req.body.title;
    posts.content = req.body.content;
    //posts.read = req.body.read,
    posts.save(function(err){
      if(err) {
        return next(err);
      }
      res.render('posts/show', {post : posts});
    });
  });
});

/*삭제 */
router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err){
    if(err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});


module.exports = router;
