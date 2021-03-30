const express = require("express");
const { signUp, signIn, signOut, requireSignIn } = require("../controllers/user");
const router = express.Router();
const { userSignUpValidator } = require("../helpers/validator");
router.post("/signup", userSignUpValidator, signUp);

router.post("/signin", signIn);
router.get("/signout", signOut);

router.get('/hello', requireSignIn, (req, res)=>{res.json({message: "Hello"})})

module.exports = router;
