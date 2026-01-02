const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    discount:{type:Number,required:true},
    bestseller:{type:Boolean,default:false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);
