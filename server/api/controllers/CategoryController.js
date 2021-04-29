'use strict';
let Category = require("../models/Category");
let Post = require("../models/Post");

exports.list_all_categories = function(req, res) {
    Category.find({}, function(err, categories) {
        if (err)
          res.send(err);
        else
          res.json(categories);
    });
};

exports.read_a_category = function(req, res) {
    Category.findById(req.params.categoryId, async function(err, category) {
        if (err){
            res.send(err);
        }else{
            let posts= await Post.find({category:req.params.categoryId});
            let result= Object.assign({}, category);
            Object.assign(result, {posts:posts});
            res.json(result);
        }
    });
};

exports.create_a_category = function(req, res) {
    var new_category = new Category(req.body);
    new_category.save(function(err, category) {
      if (err)
        res.send(err);
      else{
        res.locals.io.emit("message",  {action: "created", type:"category", data: category});
        res.json(category);
      }
    });
};

exports.update_a_category = function(req, res) {
    Category.findOneAndUpdate({_id: req.params.categoryId}, req.body, {new: true}, function(err, category) {
      if (err)
        res.send(err);
      else{
        res.locals.io.emit("message",  {action: "updated", type:"category", data: category});
        res.json(category);
      }
    });
};

exports.delete_a_category = function(req, res) {
    Category.deleteOne({
      _id: req.params.categoryId
    }, function(err, category) {
      if (err)
        res.send(err);
      else
        res.json({ message: 'Category successfully deleted' });
    });
  };