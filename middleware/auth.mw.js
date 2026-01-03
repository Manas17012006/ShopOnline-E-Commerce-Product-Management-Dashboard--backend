require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require("../models/userModel.model");
async function userauth(req, res, next) {
  // const { token } = req.cookies;

  // if (!token) {
  //   return res.json({
  //     success: false,
  //     message: "Please Login to get started!",
  //   });
  // }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.userId = decoded.id; 
  //   next();
  // } catch (err) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "Invalid token",
  //   });
  // }
  try{
     const user = await userModel.findOne({
      token: { $ne: "", $exists: true }
    });
    if(!user)
    {
      return res.send({success:false,message:"Please Login to get started!"})
    }
    else
    {
      req.userId=user._id;
      res.send({success:true,message:"Please Login to get started!"});
      next();
    }
  }catch(err)
  {
    return res.send({success:false,message:err.message});
  }
}

module.exports = { userauth };
