import mongoose from "mongoose";


const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    //   unique: true,
    },
    code: {
      type: String,
      require: true,
    },
    expireIn: {
      type: Number,
      require: true,
    },
  },
  {
    timeStamps: true,
  }
);


const Otp = mongoose.model("otp", otpSchema);

export default Otp;