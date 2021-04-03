const express = require("express");
// Controllers
const {
  requireSignIn,
  isAdmin,
  isAuth,
  isVendor,
} = require("../controllers/auth");
const {userById} = require('../controllers/user')
const { create, productById, read, remove, update } = require("../controllers/product");
const router = express.Router();

// Routes
router.post("/product/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.get("/product/:productId", requireSignIn, read);
router.delete("/product/:productId/:userId", requireSignIn, isAuth, isAdmin, remove);
router.put("/product/:productId/:userId", requireSignIn, isAuth, isAdmin, update);
router.param('userId', userById)
router.param('productId', productById)

module.exports = router;