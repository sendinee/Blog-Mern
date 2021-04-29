'use strict';
module.exports = function(app) {
  let authController = require('../controllers/AuthController');
  // todoList Routes
  app.route('/login')
    .post(authController.login);
};
