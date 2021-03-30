const jwt = require('jsonwebtoken') //for generating signed token
const expressJwt = require('express-jwt') //for authorization
const User = require("../schema/user");
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.signUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signIn = (req, res)=>{

  // find user based on email
  const {email, password} = req.body
  User.findOne({email}, (err, user)=>{
    if(err || !user){
      // user does not exist
      return res.status(400).json({error: "User does not exist. Sign Up"})
    }
    // User exists. Verify password
    if(!user.authenticate(password)){
      return res.status(401).json({
        error: "Email and Password do not match"
      })
    }

    // Generate token with user id
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    // persist token with cookie and set an expiry date
    res.cookie('t', token, {expire: new Date() + 9345})

    // return response with user token to frontend
    const {_id, name, email, role} = user
    return res.json({
      token,
      user: {_id, name, email, role}
    })
  })

}

exports.signOut = (req, res)=>{
  res.clearCookie('t')
  res.status(200).json({
    success: "Signed Out Successfully"
  })
}

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});