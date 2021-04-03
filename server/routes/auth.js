const express = require("express");
const { signUp, signIn, signOut, requireSignIn } = require("../controllers/auth");
const router = express.Router();
const { userSignUpValidator } = require("../helpers/validator");
router.post("/signup", userSignUpValidator, signUp);

router.post("/signin", signIn);
router.get("/signout", signOut);


module.exports = router;
