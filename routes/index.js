var crypto = require('crypto'),
    fs = require('fs'),
    User = require('../models/user.js'),
    Post = require('../models/post.js'),
    ObjectID = require('mongodb').ObjectID,
    Comment = require('../models/comment.js');

module.exports = function(app) {

  app.get('/', checkNotLogin);
  app.get('/', function (req, res) {
    res.render('index');
  });
  app.post('/', function (req, res) {
    var name = req.body.name,
    password = req.body.password;
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email,
        avatar: '/images/avatar.png',
        background: '/images/background/'+ new Number(parseInt(Math.random() * 19)) + '.jpg'
    });
    //检查邮箱是否已经存在 
    User.get(newUser.email, function (err, user) {
      if (user) {
        req.flash('error', 'Email has been signed up already!');
        return res.redirect('/signup');//返回注册页
      }
      //如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/signup');//注册失败返回主册页
        }
        res.redirect('/loginfirst');//注册成功后返回主页
      });
    });
  });
  
  app.get('/signup', checkNotLogin);
  app.get('/signup', function (req, res) {
    res.render('signup',{
      error: req.flash('error').toString()
    });
  });

  app.post('/signup', checkNotLogin);
  app.post('/signup', function (req, res) {
    var name = req.body.name,
    password = req.body.password;
    //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
        name: req.body.name,
        password: password,
        email: req.body.email,
        avatar: '/images/avatar.png',
        background: '/images/background/'+ new Number(parseInt(Math.random() * 19)) + '.jpg'
    });
    //检查邮箱是否已经存在 
    User.get(newUser.email, function (err, user) {
      if (user) {
        req.flash('error', 'Email has been signed up already!');
        return res.redirect('/signup');//返回注册页
      }
      //如果不存在则新增用户
      newUser.save(function (err, user) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/signup');//注册失败返回主册页
        }
        res.redirect('/loginfirst');//注册成功后返回主页
      });
    });
  });

  app.get('/login', checkNotLogin);
  app.get('/login', function (req, res) {
    res.render('login',{
      error: req.flash('error').toString()
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
        return res.redirect('/login');//用户不存在则跳转到登录页
      }
      //检查密码是否一致
      if (user.password != password) {
        req.flash('error', 'Wrong password!'); 
        return res.redirect('/login');//密码错误则跳转到登录页
      }
      //密码都匹配后，将用户信息存入 session
      req.session.user = user;
      res.redirect('/feed');//登陆成功后跳转到主页
    });
  });

  app.get('/loginfirst', checkNotLogin);
  app.get('/loginfirst', function (req, res) {
    res.render('login',{
      error: req.flash('error').toString()
    });
  });

  app.post('/loginfirst', checkNotLogin);
  app.post('/loginfirst', function (req, res) {
   //生成密码的 md5 值
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检查邮箱是否存在
    User.get(req.body.email, function (err, user) {
      if (!user) {
        req.flash('error', 'You should sign up first!'); 
        return res.redirect('/signup');//用户不存在则跳转到登录页
      }
      //检查密码是否一致
      if (user.password != password) {
        req.flash('error', 'Wrong password!'); 
        return res.redirect('/loginfirst');//密码错误则跳转到登录页
      }
      //密码都匹配后，将用户信息存入 session
      req.session.user = user;
      res.redirect('/settings');//登陆成功后跳转到主页
    });
  });

  app.get('/settings', checkLogin);
  app.get('/settings', function (req, res) {
    res.render('settings',{
      user: req.session.user,
      error: req.flash('error').toString()
    });
  });

  app.post('/settings', checkLogin);
  app.post('/settings', function (req, res) {
    var avatar = '/images/avatar.png';

    if (req.files.avatar.size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(req.files.avatar.path);
      // 获得文件的临时路径
    } else {
      var tmp_path = req.files.avatar.path;
      // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = './public/images/avatar/' + req.session.user._id;
      // 移动文件
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           // res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
          
        });
      });
      avatar = '/images/avatar/'+req.session.user._id;
    }

    User.update(req.session.user._id, req.body.name, req.session.user.email, req.body.bio, avatar, function (err) {
      if (err) {
        console.log(err);
        req.flash('error', err); 
        return res.redirect(url+'/settings');//出错！返回文章页
      }
      req.session.user.name = req.body.name;
      req.session.user.bio = req.body.bio;
      req.session.user.avatar = avatar;
      res.redirect('/feed');//成功！返回文章页
    });
    
  });

  app.get('/usersetting', checkLogin);
  app.get('/usersetting', function (req, res) {
    res.render('usersetting',{
      user: req.session.user,
      error: req.flash('error').toString()
    });
  });

  app.post('/usersetting', checkLogin);
  app.post('/usersetting', function (req, res) {
    var avatar = '/images/avatar.png';

    if (req.files.avatar.size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(req.files.avatar.path);
      // 获得文件的临时路径
    } else {
      var tmp_path = req.files.avatar.path;
      // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = './public/images/avatar/' + req.session.user._id;
      // 移动文件
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           // res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
          
        });
      });
      avatar = '/images/avatar/'+req.session.user._id;
    }

    User.update(req.session.user._id, req.body.name, req.body.email, req.body.bio, avatar, function (err) {
      if (err) {
        console.log(err);
        req.flash('error', err); 
        return res.redirect(url+'/settings');//出错！返回文章页
      }
      req.session.user.name = req.body.name;
      req.session.user.bio = req.body.bio;
      req.session.user.avatar = avatar;
      req.session.user.email = req.body.email;
      res.redirect('/feed');//成功！返回文章页
    });
    
  });

  // app.post('/uploadavatar', checkLogin);
  // app.post('/uploadavatar', function (req, res) {
  //   if (req.file.size == 0){
  //     // 使用同步方式删除一个文件
  //     fs.unlinkSync(req.file.path);
  //     console.log('Successfully removed an empty file!');
  //   } else {
  //     var target_path = './public/images/' + req.session.user._id;
  //     // 使用同步方式重命名一个文件
  //     fs.renameSync(req.file, target_path);
  //     console.log('Successfully renamed a file!');
  //   }
  // });



  app.get('/signout', checkLogin);
  app.get('/signout', function (req, res) {
    req.session.user = null;
    res.redirect('/');//登出成功后跳转到主页
  });


  app.get('/feed', checkLogin);
  app.get('/feed', function (req, res) {
    Post.getAll(null, function (err, posts) {
      if (err) {
        posts=[];
      }
      res.render('feed',{
        pagetitle: 'Feed',
        user: req.session.user,
        posts: posts,
        error: req.flash('error').toString()
      });
    });
  });

  app.get('/newproject', checkLogin);
  app.get('/newproject', function (req, res) {


    fs.exists('./public/images/post-background/' + req.session.user._id, function(exists){
      if (exists) {
        fs.unlinkSync('./public/images/post-background/' + req.session.user._id);
      }
    });

    res.render('newproject',{
      pagetitle: 'New Project',
      user: req.session.user,
      tempbackground: '/images/background/'+ new Number(parseInt(Math.random() * 19)) + '.jpg'
    });
  });

  app.post('/newproject', checkLogin);
  app.post('/newproject', function (req, res) {

    var _id = new ObjectID(),
        currentUser = req.session.user;
    
    fs.exists('./public/images/post-background/' + req.session.user._id, function(exists){
      if (exists) {
        var tmp_path = './public/images/post-background/' + req.session.user._id;
        // 指定文件上传后的目录 - 示例为"images"目录。 
        var target_path = './public/images/post-background/' + _id;
        // 移动文件
        fs.rename(tmp_path, target_path, function(err) {
          if (err) throw err;
          // 删除临时文件夹文件, 
          fs.unlink(tmp_path, function() {
             if (err) throw err;
             // res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
          });
        });
        var  post = new Post(currentUser._id, currentUser.name, currentUser.email, currentUser.avatar, req.body.title, req.body.subtitle, req.body.post, '/images/post-background/' + _id, _id);

        post.save(function (err, post) {
          if (err) {
            req.flash('error', err); 
            return res.redirect('/u/'+req.session.user._id);
          }
          res.redirect('/u/'+req.session.user._id);//发表成功跳转到主页
        });
      } else{

        var  post = new Post(currentUser._id, currentUser.name, currentUser.email, currentUser.avatar, req.body.title, req.body.subtitle, req.body.post, req.body.tempbackground, _id);

        post.save(function (err, post) {
          if (err) {
            req.flash('error', err); 
            return res.redirect('/u/'+req.session.user._id);
          }
          res.redirect('/u/'+req.session.user._id);//发表成功跳转到主页
        });
      }
    });
    
  });

  // app.get('/changepostbackground/:_id', checkLogin);
  // app.get('/changepostbackground/:_id', function (req, res) {
     

  // });

  app.get('/u/:_id', checkLogin);
  app.get('/u/:_id', function (req, res) {
    //检查用户是否存在
    User.getById(req.params._id, function (err, user) {
      if (!user) {
        req.flash('error', '用户不存在!'); 
        return res.redirect('/feed');//用户不存在则跳转到主页
      }
      //查询并返回该用户的所有文章
      Post.getAll(user.email, function (err, posts) {
        if (err) {
          req.flash('error', err); 
          return res.redirect('/feed');
        } 
        res.render('user', {
          pagetitle: user.name,
          posts: posts,
          user : req.session.user,
          owner: user,
          error : req.flash('error').toString()
        });
      });
    }); 
  });

  app.get('/p/:_id', checkLogin);
  app.get('/p/:_id', function (req, res) {
    Post.getOne(req.params._id, function (err, post) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('/');
      }
      res.render('project', {
        pagetitle: post.title,
        post: post,
        user: req.session.user,
        error: req.flash('error').toString()
      });
    });
  });

  app.post('/p/:_id', checkLogin);
  app.post('/p/:_id', function (req, res) {
  // var date = new Date(),
  //     time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
  //            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  var comment = {
      userId: req.session.user._id,
      name: req.session.user.name,
      avatar: req.session.user.avatar,
      content: req.body.content
  };

  var newComment = new Comment(req.params._id, comment);
  newComment.save(function (err) {
    if (err) {
      req.flash('error', err); 
      return res.redirect('back');
    }
    console.log(newComment);
    res.redirect('back');
  });
});

  app.get('/p/:_id/edit', checkLogin);
  app.get('/p/:_id/edit', function (req, res) {

    fs.exists('./public/images/post-background/' + req.session.user._id, function(exists){
      if (exists) {
        fs.unlinkSync('./public/images/post-background/' + req.session.user._id);
      }
    });

    Post.getOne(req.params._id, function (err, post) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('back');
      }
      res.render('edit', {
        pagetitle: 'Edit Project',
        post: post,
        user: req.session.user,
        error: req.flash('error').toString()
      });
    });
  });

  app.post('/p/:_id/edit', checkLogin);
  app.post('/p/:_id/edit', function (req, res) {

    var editBackground;

    fs.exists('./public/images/post-background/' + req.session.user._id, function(exists){
      if (exists) {


        var tmp_path = './public/images/post-background/' + req.session.user._id;
        // 指定文件上传后的目录 - 示例为"images"目录。 
        var target_path = './public/images/post-background/' + req.params._id;

        // 移动文件
        editBackground = '/images/post-background/'+req.params._id;

        fs.rename(tmp_path, target_path, function(err) {
          if (err) throw err;
          // 删除临时文件夹文件, 
          fs.unlink(tmp_path, function() {
             if (err) throw err;
             // res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
          });
        });
        Post.update(req.params._id, req.body.title, req.body.subtitle, req.body.post, editBackground, function (err) {
          var url = '/p/' + req.params._id;
          if (err) {
            req.flash('error', err); 
            return res.redirect(url+'/edit');//出错！返回文章页
          }
          res.redirect(url);//成功！返回文章页
        });
      } else{
        editBackground = req.body.tempbackground;
        Post.update(req.params._id, req.body.title, req.body.subtitle, req.body.post, editBackground, function (err) {
          var url = '/p/' + req.params._id;
          if (err) {
            req.flash('error', err); 
            return res.redirect(url+'/edit');//出错！返回文章页
          }
          res.redirect(url);//成功！返回文章页
        });
      }
    });

    
  });

  app.get('/p/:_id/delete', checkLogin);
  app.get('/p/:_id/delete', function (req, res) {
    Post.remove(req.params._id, function (err) {
      if (err) {
        req.flash('error', err); 
        return res.redirect('back');
      }
      res.redirect('/u/'+req.session.user._id);
    });
  });



  

  app.post('/changeuserbackground', checkLogin);
  app.post('/changeuserbackground', function (req, res) {

    // console.log(req.files);

    var background = req.session.user.background;

    if (req.files.background.size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(req.files.background.path);
      // 获得文件的临时路径
    } else {
     // 获得文件的临时路径
      var tmp_path = req.files.background.path;
      // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = './public/images/user-background/' + req.session.user._id;
      // 移动文件
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           // res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
          
        });

      });
      User.updateBackground(req.session.user._id, '/images/user-background/'+req.session.user._id, function (err) {
        res.send(204);
      });
    }
    
  });


  app.post('/changepostbackground', checkLogin);
  app.post('/changepostbackground', function (req, res) {

    if (req.files.background.size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(req.files.background.path);
      // 获得文件的临时路径
    }
     else {
     // 获得文件的临时路径
      var tmp_path = req.files.background.path;
      // 指定文件上传后的目录 - 示例为"images"目录。 
      var target_path = './public/images/post-background/' + req.session.user._id;
      // 移动文件
      fs.rename(tmp_path, target_path, function(err) {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function() {
           if (err) throw err;
           // res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + ' bytes');
          
        });

      });
    }
    res.send(204);
  });

};

function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Log in first!'); 
    res.redirect('/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('error', 'You have already logged in!'); 
    res.redirect('/feed');//返回之前的页面
  }
  next();
}