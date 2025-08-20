
const {SignUp,Login} = require("../../Controller/AUTH/auth")
const AuthRouter = require('express').Router();

AuthRouter.post("/login",Login);
AuthRouter.post("/signup",SignUp)

module.exports = AuthRouter;