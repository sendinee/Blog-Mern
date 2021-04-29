'use strict';
let Post = require("../models/Post");

exports.list_all_posts = function(req, res) {
    Post.find({})
        .populate("category")
        .then(function(err, posts) {
            if (err)
              res.send(err);
            else
              res.json(posts);
        });
};

exports.read_a_post = function(req, res) {
    Post.findById(req.params.postId, function(err, post) {
        if (err)
          res.send(err);
        else
          res.json(post);
    });
};

exports.create_a_post = function(req, res) {
    let data = req.body;
    data.category= data.category==="null" ? null : data.category;
    var new_post = new Post(data);
    new_post.save(function(err, post) {
      if (err)
        res.send(err);
      else{
        res.locals.io.emit("message",  {action: "created", type:"post", data: post});
        res.json(post);
      }
    });
};

exports.update_a_post = function(req, res) {
    let data = req.body;
    data.category= data.category==="null" ? null : data.category;
    Post.findOneAndUpdate({_id: req.params.postId}, data, {new: true}, function(err, post) {
      if (err)
        res.send(err);
      else{
        res.locals.io.emit("message",  {action: "updated", type:"post", data: post});
        res.json(post);
      }
    });
};

exports.delete_a_post = function(req, res) {
    Post.deleteOne({
      _id: req.params.postId
    }, function(err, post) {
      if (err)
        res.send(err);
      else
        res.json({ message: 'Post successfully deleted' });
    });
  };