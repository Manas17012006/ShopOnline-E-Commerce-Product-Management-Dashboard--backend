const orderModel=require("../models/orderSchema.model")
//set the order
async function setOrder(req,res)
{
    try{

        const {name,email,orderData,price}=req.body;
        if(!name || !email || !orderData || !price)
        {
            return res.send({success:false,message:"All field required"});
        }
        const newObj={name,orderData,email,price:Number(price)};
        await orderModel.create(newObj);
        res.send({success:true,message:"Order placed successfully"});
    }catch(err)
    {
        res.send({success:false,message:err.message});
    }
}
// change the status of the order
async function changeOrderStatus(req, res) {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.send({ success: false, message: "All fields required" });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.send({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.send({ success: true, message: "Order status updated" });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}
// get all the orders data
async function getAllOrders(req, res) {
  try {
    const orders = await orderModel.find({})

    res.send({
      success: true,
      info: orders,
    });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
}
module.exports = {
  setOrder,
  changeOrderStatus,
  getAllOrders,
};

