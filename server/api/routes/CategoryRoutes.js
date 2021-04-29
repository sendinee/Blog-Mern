'use strict';
module.exports = function(app) {
  let categoryController = require('../controllers/categoryController');
  // todoList Routes
  app.route('/category')
    .get(categoryController.list_all_categories)
    .post(categoryController.create_a_category);

  app.route('/category/:categoryId')
    .get(categoryController.read_a_category)
    .put(categoryController.update_a_category)
    .delete(categoryController.delete_a_category);
};
