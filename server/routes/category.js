const express = require("express");
const {
  requireSignIn,
  isAdmin,
  isAuth,
  isVendor,
} = require("../controllers/auth");
const {userById} = require('../controllers/user')
const { create, categoryById, read, list, update, remove } = require("../controllers/category");
const router = express.Router();

router.post("/category/create/:userId", requireSignIn, isAuth, isAdmin, create);
router.put("/category/:categoryId/:userId", requireSignIn, isAuth, isAdmin, update);
router.delete("/category/:categoryId/:userId", requireSignIn, isAuth, isAdmin, remove);
router.get('/category/:categoryId', read)
router.get('/categories', list)

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router;


