import { UserModel } from "../models/User.js"

export const createUser=async(req,res,next)=>{
    try {
        const{name,username,password,mobile}=req.body
    const data= await UserModel.create({name,username,password,mobile})
    return res.status(201).json({
        success:true,
        message:"USER CREATED SUCCESSFULLY.",
        user:data
    })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Failed to created new user"
        })
        
    }
    
}
export const updateUser=async(req,res,next)=>{
    try {
         const updatedFields=req.body
        const {id}=req.params
        const data=await UserModel.findByIdAndUpdate(id, {$set:updatedFields},{new:true});
        if(!data){
            return res.status(404).json({
                success:true,
                message:"USER NOT FOUND"
            })
        }
        return res.status(200).json({
            success:true,
            message:"USER UPDATED SUCCESSFULLY.",
            user:data
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"An error occurred while updating the user"
        })
        
    }
}
export const viewUser=async(req,res,next)=>{
    try {
        const{id}=req.params;
        const data=await UserModel.findById(id);
        if(!data){
            return res.status(404).json({
                success:false,
                message:"USER NOT FOUND"
            })
        }
        return res.status(200).json({
            success:true,
            message:"USER FOUND SUCCESSFULLY.",
            user:data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"An error occurred while finding the user."
        })
    }
}
export const deleteUser=async(req,res,next)=>{
    try {
        const data=await UserModel.findByIdAndDelete(req.params.id);
        if(!data){
            return res.status(404).json({
                success:false,
                message:"USER NOT FOUND."
            })
        }
        return res.status(200).json({
            success:true,
            message:"USER DELETED SUCCESSFULLY.",
            deletedUser:data
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"An error occurred while deleting the user."
        })
    }
}