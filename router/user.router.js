const express=require('express');
const router=express.Router();
const {userauth}=require('../middleware/auth.mw')
const {getUserData,getnoAdmins,makeAdmin}=require("../controllers/user.controller")

router.get("/getUserData",userauth,getUserData);
router.get("/getnoAdmins",getnoAdmins);
router.post("/makeAdmin",makeAdmin);
module.exports=router;