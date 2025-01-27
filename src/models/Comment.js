import mongoose from "mongoose";
const CommentSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        required:true
    },
    parentComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
},{timestamps:true})
export const CommentModel=mongoose.model("Comment",CommentSchema)