const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require("fs");
const formidable = require("formidable");
const lodash = require("lodash");
const Product = require("../models/product");
const exp = require("constants");

// Product By Id Middleware
exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((error, product) => {
    if (error || !product) {
      res.status(400).json({
        error: errorHandler(error),
        message: "Product does not exist",
      });
    }
    req.product = product;
    next();
  });
};

// Single Product
exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json({
    product: req.product,
  });
};

// Product delete
exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

// Product create
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image Could not be updated",
      });
    }
    // 1kb = 1000
    // 1mb = 1000000
    if (files.photo.size > 1000000) {
      return res.status(400).json({
        error: "Image should be less than 3MB",
      });
    }
    const { name, description, quantity, price, category } = fields;
    if (!name || !description || !quantity || !price || !category) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    let product = new Product(fields);
    if (files) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(200).json({
        result,
      });
    });
  });
};

// Product update
exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image Could not be updated",
      });
    }
    // 1kb = 1000
    // 1mb = 1000000
    if (files.photo.size > 1000000) {
      return res.status(400).json({
        error: "Image should be less than 3MB",
      });
    }
    const { name, description, quantity, price, category } = fields;
    if (!name || !description || !quantity || !price || !category) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }
    let product = req.product;
    product = lodash.extend(product, fields);
    if (files) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(200).json({
        result,
      });
    });
  });
};
