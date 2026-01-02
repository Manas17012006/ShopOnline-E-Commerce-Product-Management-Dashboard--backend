const express=require('express');
const router=express.Router();
const {userauth}=require('../middleware/auth.mw')
const { register, login, logout,sendVerifyOtp,verifyEmail,isAuthenticated,sendResetOtp,resetPassword}=require("../controllers/auth.controller");
router.post("/register",register); 
router.post("/login",login);
router.post("/logout",userauth,logout);
router.post("/send-verify-otp",userauth,sendVerifyOtp);
router.post("/verify-account",userauth,verifyEmail);
router.post("/isAuth",userauth,isAuthenticated)

router.post("/send-reset-otp",sendResetOtp);
router.post("/resetpassword",resetPassword)
module.exports=router