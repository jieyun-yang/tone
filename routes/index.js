var crypto = require('crypto'),
    fs = require('fs'),
    User = require('../models/user.js'),
    ObjectID = require('mongodb').ObjectID;


var onTwitterPage = true;

module.exports = function(app) {

  app.get('/', checkNotLogin);
  app.get('/', function (req, res) {
    res.render('welcome');
  });

  app.post('/signup', checkNotLogin);
  app.post('/signup', function (req, res) {
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        password: password,
        email: req.body.email
    });
    //检查邮箱是否已经存在 
    User.get(newUser.email, function (err, user) {
      if (user) {
        req.flash('error', 'Email has been signed up already!');
        return res.redirect('/');//返回注册页
      }
      //如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/');//注册失败返回主册页
        }
        req.session.user = user;
        res.redirect('/index');//注册成功后返回主页
      });
    });
  });

  app.post('/login', checkNotLogin);
  app.post('/login', function (req, res) {
   //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查邮箱是否存在
    User.get(req.body.email, function (err, user) {
      if (!user) {
        req.flash('error', 'You should sign up first!'); 
        return res.redirect('/');//用户不存在则跳转到登录页
      }
      //检查密码是否一致
      if (user.password != password) {
        req.flash('error', 'Wrong password!'); 
        return res.redirect('/');//密码错误则跳转到登录页
      }
      //密码都匹配后，将用户信息存入 session
      req.session.user = user;
      res.redirect('/index');//登陆成功后跳转到主页
    });
  });

  app.get('/index', checkLogin);
  app.get('/index', function (req, res) {
    onTwitterPage = true;
    res.render('index',{
      user: req.session.user,
      error: req.flash('error').toString()
    });
  });

  app.get('/my-tone', checkLogin);
  app.get('/my-tone', function (req, res) {
    onTwitterPage = false;
    res.render('me',{
      user: req.session.user,
      error: req.flash('error').toString()
    });
  });

  app.get('/getmood', function(req, res) {
    console.log('twitter',onTwitterPage);
    if (onTwitterPage) {
          var data = {
              mood: global.mood,
              onTwitterPage: onTwitterPage
          };
          res.send(data);        
      } else {
          var data = {
              onTwitterPage: onTwitterPage,
              red: global.red,
              green: global.green,
              blue: global.blue
          };
          res.send(data);
      }
  });
};

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Log in first!'); 
    res.redirect('/');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', 'You have already logged in!'); 
    res.redirect('/index');//返回之前的页面
  }
  next();
}