const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    orderData:
    {
      type:[
        {
          productId:{type:String,required:true},
          qty:{type:Number,required:true}
        }
      ],default:[]
    },
    email:{type:String,required:true},
    price:{type:Number,required:true},
    status:{type:String,required:true,default:"Pending"}
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
