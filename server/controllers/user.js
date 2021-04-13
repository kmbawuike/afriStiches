const { errorHandler } = require("../helpers/dbErrorHandler");
const User = require("../models/user");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User does not exists",
      });
    }
    req.profile = user;
    next();
  });
};

exports.index = (req, res) => {
  User.find()
    .select("-salt")
    .select("-hashed_password")
    .exec((err, users) => {
      if (err) {
        return res.status(400).json({
          error: "users not available",
        });
      }

      return res.json({
        message: "success",
        users,
      });
    });
};

exports.show = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      return res.json({
        message: "User Updated Successfully",
      });
    }
  );
};
