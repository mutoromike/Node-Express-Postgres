const usersController = require('../controllers').users;
const loginController = require('../controllers').login;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Bright Events API!',
  }));

  app.post('/api/users', usersController.create);
  app.post('/api/login', loginController.login)
};