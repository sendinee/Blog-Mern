'use strict';
module.exports = function(app) {
  let postController = require('../controllers/PostController');
  // todoList Routes
  app.route('/post')
    .get(postController.list_all_posts)
    .post(postController.create_a_post);

  app.route('/post/:postId')
    .get(postController.read_a_post)
    .put(postController.update_a_post)
    .delete(postController.delete_a_post);
};
