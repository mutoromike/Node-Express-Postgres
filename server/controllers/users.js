const User = require('../models').Users;

module.exports = {
  create(req, res) {
    return User
      .create({
        name: req.body.title,
        email: req.body.title,
        password: req.body.title,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
};