const express = require("express");
const { requireSignIn, isAdmin, isAuth, isVendor } = require("../controllers/auth");
const {userById, show, update, index} = require('../controllers/user')
const router = express.Router();

router.get('/users/:userId', requireSignIn, isAuth, show)
router.get('/users/:userId/all', requireSignIn, isAdmin, index)
router.put('/users/:userId', requireSignIn, isAuth, update)
router.param('userId', userById)
module.exports = router;
