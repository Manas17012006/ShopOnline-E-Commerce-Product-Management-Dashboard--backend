const express=require('express');
const app=express();
const cookieparser=require('cookie-parser');
const cors=require('cors');
const userModel=require('./models/userModel.model')
const bcrypt=require("bcrypt")
const mongoose=require('mongoose');

const cloudinary = require("cloudinary").v2;

require('dotenv').config();
const allowedOrigins=['http://localhost:5173']
app.use(cookieparser());
app.use(
  cors({
    origin:allowedOrigins,
    credentials: true,
  })
);
cloudinary.config({
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.Cloud_Api,
    api_secret:process.env.Cloud_Secret
})
app.use(express.json());
const auth_route=require("./router/auth.route")
const user_route=require("./router/user.router")
const product_schema=require("./router/product.route")
const order_route=require("./router/order.route")



//connect with MongoDB
async function connectdb()
{
    try{

        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongodb successfully connected");
        
        //check if admin is already present
        const admin=await userModel.findOne({userType:"ADMIN"});
        //if no admin present make a admin
        if(!admin)
        {
            const cr=await userModel.create({
                name:"new_Admin",email:"mkawathalkar@gmail.com",password:bcrypt.hashSync(process.env.PASS,8),
                isVerified:false,userType:"ADMIN",isAdmin:true
            })
        }
    }catch(err){
        console.log("MongoDB error")
    }
}
connectdb();

//API endpoints
app.get('/', (req, res) => res.send('API working'));
app.use("/api/auth",auth_route);
app.use("/api/auth",user_route);
app.use("/api/product",product_schema)
app.use("/api/order",order_route);
//establish the server

// app.listen(process.env.PORT,()=>{
//     console.log(`Server started at port ${process.env.PORT}`);
// })
module.exports=app;