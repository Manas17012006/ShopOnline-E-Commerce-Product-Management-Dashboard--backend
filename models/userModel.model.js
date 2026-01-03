const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExp: { type: Date, default: null },
    userType: {
      type: String,
      enum: ["ADMIN", "CUSTOMER"],
      default: "CUSTOMER",
    },
    resetOtp: { type: String, default: "" },
    resetOtpExp: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    cartData:
    {
      type:[
        {
          productId:{type:String,required:true},
          qty:{type:Number,required:true}
        }
      ],default:[]
    },
    token:{type:String,default:""}
  },
  { timestamps: true ,minimize:false}
);

module.exports = mongoose.model("user", userSchema);
