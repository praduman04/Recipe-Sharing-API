import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"],
    },
    username:{
        type:String,
        required:[true,"Please enter username"],
        unique:[true,"Username already exists"],
        
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
    mobile:{
        type:Number,
        required:[true,"Please eneter mobile number"]
    },
    saved:{
        type:[String],
    },
    followers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    friends:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"User"
    },
    deviceTokens:{
        type:[String]
    },
    recipe:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Recipe"
    }
},{timestamps:true})
export const UserModel=mongoose.model("User",UserSchema);