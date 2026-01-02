//function for adding a product (admin ke liye)
const cloudinary=require("../config/cloudinary")
const productModel=require("../models/productSchema");
const userModel = require("../models/userModel.model");
async function addProduct(req,res)
{
    try{

        const {name,description,price,category,discount,bestseller}=req.body;

        const image1=req.files.image1 && req.files.image1[0];
        const image2=req.files.image2 && req.files.image2[0];
        const image3=req.files.image3 && req.files.image3[0];
        const image4=req.files.image4 && req.files.image4[0]; //agar ho to

        const images=[image1,image2,image3,image4].filter((item)=>item!==undefined);
        //for multiple async we use promise all
        let imagesUrl=await Promise.all(
            images.map(async (item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});

                return result.secure_url;
            })
        )
        const productObj={
            name,description,price:Number(price),category,discount:Number(discount),
            bestseller:bestseller==="true" ? true: false,
            image:imagesUrl
        }
        const new_product=await productModel.create(productObj);
        console.log(imagesUrl);
        res.json({success:true,message:"Ok"})
    }catch(err)
    {
        res.json({success:false,message:err.message});
    }
}

//list all products
async function listProduct(req,res)
{
    try{

        const products=await productModel.find({});
        res.send({success:true,message:products});
    }catch(err)
    {
        res.send({success:false,message:err.message});
    }
}

//removing a product
async function removeProduct(req,res)
{
    try{
        await productModel.findByIdAndDelete(req.body.id);
        res.send({success:true,message:"Delete successful"});

    }catch(err)
    {
        res.send({success:false,message:err.message});
    }
}

//function for a single info
async function singleProduct(req,res)
{
    try{
        const productId=req.body.id;
        const product=await productModel.findById(productId);
        res.send({success:true,product});

    }catch(err)
    {
        res.send({success:false,message:err.message});
    }
}

//add to cart
async function addtocart(req,res)
{
    try{

        const userId=req.userId;
        const {productId,qty}=req.body;
        const user=await userModel.findById(userId);
        if(!user)
        {
            return res.send({success:false,message:"Unexpected Error Occured"});
        }
        else
        {
            const newObj={productId,qty:Number(qty)};
            user.cartData.push(newObj);
            await user.save();
            return res.send({success:true,message:"Added to Cart"});
        }

    }catch(err)
    {
        return res.send({success:false,message:err.message})
    }
}
//cart data nikalo
async function getcartdata(req,res)
{
    try{

        const userId=req.userId;
        const user=await userModel.findById(userId);
        if(!user)
        {
            return res.send({success:false,message:"Unexpected Error Occured"});
        }
        else
        {

            return res.send({success:true,info:user.cartData});
        }

    }catch(err)
    {
        return res.send({success:false,message:err.message})
    }
}

///for changing qty in the cart
async function changeQty(req, res) {
  try {
    const userId = req.userId;
    const productId = req.body.productId;
    const qty = Number(req.body.qty); 

    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ success: false, message: "Unexpected Error Occurred" });
    }

    let found = false;
    for (let i = 0; i < user.cartData.length; i++) {
      if (user.cartData[i].productId === productId) {
        user.cartData[i].qty = qty;
        found = true;
        break; 
      }
    }

    if (!found) {
      return res.send({ success: false, message: "Item not found in cart" });
    }

    await user.save();
    return res.send({ success: true, message: "Quantity updated" });
  } catch (err) {
    return res.send({ success: false, message: err.message });
  }
}

///for deleting item in the cart
async function delItem(req, res) {
  try {
    const userId = req.userId;
    const productId = req.body.productId;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.send({ success: false, message: "Unexpected Error Occurred" });
    }

    user.cartData = user.cartData.filter((item) => item.productId !== productId);

    await user.save();
    return res.send({ success: true, message: "Item Deleted" });
  } catch (err) {
    return res.send({ success: false, message: err.message });
  }
}

module.exports={addProduct,listProduct,removeProduct,singleProduct,addtocart,getcartdata,delItem,changeQty};

