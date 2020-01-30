require('dotenv').config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models").Users;
const saltRounds = 10;

handleLogin = (email, password, res) => {
  let result = {};
  let status = 200;
  console.log("we are here");
  User.findOne({ where: { email: email } }).then(function(user, err) {
    if (!err && user) {
      // We could compare passwords in our model instead of below
      bcrypt
        .compare(password, user.password)
        .then(match => {
          if (match) {
            // Create a token
            const payload = { user: user.name, id: user.id };
            const options = {
              expiresIn: "3h",
              issuer: "http://mutoromike.dev"
            };
            const secret = process.env.JWT_SECRET
            console.log("env are", process.env.JWT_SECRET);
            const token = jwt.sign(payload, secret, options);

            result.token = token;
            result.status = status;
            result.result = user;
          } else {
            status = 401;
            result.status = status;
            result.error = "Authentication error";
          }
          res.status(status).send(result);
        })
        .catch(err => {
          status = 500;
          result.status = status;
          result.error = err;
          res.status(status).send(result);
        });
    } else {
      status = 404;
      result.status = status;
      result.error = "User not found";
      res.status(status).send(result);
    }
  });
};

module.exports = {
  login(req, res) {
    return handleLogin(req.body.email, req.body.password, res);
  }
};
