const bcrypt = require("bcrypt");
const User = require("../models").Users;
const saltRounds = 10;

module.exports = {
  create(req, res) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashedPassword = bcrypt.hashSync(req.body.password, salt);
    let result = {}
    return User.findOrCreate({
      where: { email: req.body.email },
      defaults: { name: req.body.name, password: hashedPassword }
    })
      .then(function([user, created]) {
        if (created) {
          status = 201;
          result.status = 201;
          result.result = {
            message: "User cuccessfully created"
          };
        } else {
          status = 400;
          result.status = 400;
          result.error = "User already exists, please login";
        }
        res.status(status).send(result);
      })
    //   .then(user => res.status(status).send(result))
      .catch(error => res.status(500).send(error));
  }
};
