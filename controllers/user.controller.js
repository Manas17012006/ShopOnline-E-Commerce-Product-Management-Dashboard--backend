const userModel=require("../models/userModel.model")
async function getUserData(req,res)
{
    try{
        const userId=req.userId;
        console.log(userId);
        const user=await userModel.findById(userId);
        if(!user)
        {
            return res.json({success:false,message:"User not found"});
        }
        res.json({
            success:true,
            userData:{
                name:user.name,
                email:user.email,
                isVerified:user.isVerified,
                isAdmin:user.isAdmin
            }
        });

    }catch(err)
    {
        return res.json({success:false,message:"error"});
    }
}
async function getnoAdmins(req,res)
{
    try{

        const user=await userModel.find({isAdmin:false});
        if(!user)
        {
            return res.json({success:false,message:"Oops! There's nobody to recruit"});
        }
        return res.json({success:true,data:user});
    }catch(err){
        return res.json({success:false,message:"error"});
    }
}
async function makeAdmin(req,res)
{
    try{

        const userId=req.body.userId;
        const user=await userModel.findById(userId);
        if(!user)
        {
            return res.json({success:false,message:"User not found"});
        }
        user.isAdmin=true;
        await user.save();
        res.send({success:true,message:"Success!!"})
    }
    catch(err)
    {
        return res.json({success:false,message:"error"});
    }
}
module.exports={getUserData,getnoAdmins,makeAdmin};