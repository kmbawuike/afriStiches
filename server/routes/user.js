const express = require("express");
const { requireSignIn, isAdmin, isAuth, isVendor } = require("../controllers/auth");
const {userById} = require('../controllers/user')
const router = express.Router();

router.get('/single/:userId', requireSignIn, isVendor, (req, res)=>{
    res.json({
        user: req.profile
    })
})
router.param('userId', userById)
module.exports = router;
