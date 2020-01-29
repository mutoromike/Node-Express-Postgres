const bcrypt = require("bcrypt");
const User = require("../models").Users;
const saltRounds = 10;

module.exports = {
  create(req, res) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hash = bcrypt.hashSync(req.body.password, salt);
    return User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash
    })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  }
};


// Work on login here or create another file.