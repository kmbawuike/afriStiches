const { errorHandler } = require("../helpers/dbErrorHandler");
const Category = require("../models/category");

// single category middleware
exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      res.status(400).json({
        error: errorHandler(err),
        message: "Category does not exist",
      });
    }
    req.category = category;
    next();
  });
};

// Category create
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.status(200).json({
      message: "Category created successfully",
      category,
    });
  });
};

// single category
exports.read = (req, res) => {
  return res.json(req.category);
};

// List all categories
exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        message: "No Category"
      });
    }
    res.json({
      data,
    });
  });
};

exports.update = (req, res) => {
  let category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      data,
    });
  });
};

exports.remove = (req, res) => {
    let category = req.category;
    category.remove((err, data) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({
        message: "Category removed successfully",
      });
    });
  };
