var mongodb = require('./db');
var ObjectID = require('mongodb').ObjectID;

function Post(userId, name, email, avatar, title, subtitle, post, background, _id) {
  this.userId = userId;
  this.name = name;
  this.email = email;
  this.avatar = avatar;
  this.title = title;
  this.subtitle = subtitle;
  this.post = post;
  this.background = background;
  this._id = _id;
}

module.exports = Post;

//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  }
  //要存入数据库的文档
  var post = {
      _id: this._id,
      userId: this.userId,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      time: time,
      title: this.title,
      subtitle: this.subtitle,
      post: this.post,
      background: this.background,
      comments: []      
  };
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //将文档插入 posts 集合
      collection.insert(post, {
        safe: true
      }, function (err, doc) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null, doc);//返回 err 为 null
      });
    });
  });
};



//读取文章及其相关信息
Post.getAll = function(email, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function(err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var query = {};
      if (email) {
        query.email = email;
      }
      //根据 query 对象查询文章
      collection.find(query).sort({
        time: -1
      }).toArray(function (err, docs) {
        mongodb.close();
        if (err) {
          return callback(err);//失败！返回 err
        }
        callback(null, docs);//成功！以数组形式返回查询的结果
      });
    });
  });
};


//获取一篇文章
Post.getOne = function(_id, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.findOne({
        "_id": new ObjectID(_id)
      }, function (err, doc) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null, doc);//返回查询的一篇文章
      });
    });
  });
};


//返回原始发表的内容（markdown 格式）
// Post.edit = function(_id, callback) {
//   //打开数据库
//   mongodb.open(function (err, db) {
//     if (err) {
//       return callback(err);
//     }
//     //读取 posts 集合
//     db.collection('posts', function (err, collection) {
//       if (err) {
//         mongodb.close();
//         return callback(err);
//       }
//       //根据用户名、发表日期及文章名进行查询
//       collection.findOne({
//         "_id": new ObjectID(_id)
//       }, function (err, doc) {
//         mongodb.close();
//         if (err) {
//           return callback(err);
//         }
//         callback(null, doc);//返回查询的一篇文章（markdown 格式）
//       });
//     });
//   });
// };

//更新一篇文章及其相关信息
Post.update = function(_id, title, subtitle, post, background, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //更新文章内容
      collection.update({
        "_id": new ObjectID(_id)
      }, {
        $set: {title:title,
          subtitle:subtitle,
          post: post,
          background: background}
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
};

// Post.updateBackground = function(_id, background, callback) {
//   //打开数据库
//   mongodb.open(function (err, db) {
//     if (err) {
//       return callback(err);
//     }
//     //读取 posts 集合
//     db.collection('posts', function (err, collection) {
//       if (err) {
//         mongodb.close();
//         return callback(err);
//       }
//       //更新文章内容
//       collection.update({
//         "_id": new ObjectID(_id)
//       }, {
//         $set: {
//           background: background}
//       }, function (err) {
//         mongodb.close();
//         if (err) {
//           return callback(err);
//         }
//         callback(null);
//       });
//     });
//   });
// };

//删除一篇文章
Post.remove = function(_id, callback) {
  //打开数据库
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    //读取 posts 集合
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //根据用户名、日期和标题查找并删除一篇文章
      collection.remove({
        "_id": new ObjectID(_id)
      }, {
        w: 1
      }, function (err) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        callback(null);
      });
    });
  });
};