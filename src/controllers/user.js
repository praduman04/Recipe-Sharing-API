import { UserModel } from "../models/User.js"
import bcrypt from "bcrypt"

export const createUser=async(req,res,next)=>{
    try {
        const{name,username,password,mobile,email}=req.body
        const hashedPassword= await bcrypt.hash(password,10)
    const data= await UserModel.create({name,username,password:hashedPassword,mobile,email})
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
        const {id}=req.user
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
        const data=await UserModel.findByIdAndDelete(req.user.id);
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
export const search=async(req,res,next)=>{
    try {
        const  {username,name,page=1,limit=10}=req.query;
        const searchCriteria={};
        if(username){
            searchCriteria.username={$regex:username,$options:"i"}
        }
        if(name){
            searchCriteria.name={$regex:name,$options:"i"};
        }
        const pageNumber=parseInt(page,10);
        const pageSize=parseInt(limit,10);
        const skip=(pageNumber-1)*pageSize
        const data= await UserModel.find(searchCriteria).skip(skip).limit(pageSize).exec();
        if(data.length===0){
            return res.status(404).json({
                success:false,
                message:"No User Found."
            })
        }
        const totalUsers=await UserModel.countDocuments(searchCriteria);
        return res.status(200).json({
            success:true,
            message: "Recipes fetched successfully.",
            data: {
                pagination: {
                    totalUsers,
                    currentPage: pageNumber,
                    totalPages: Math.ceil(totalUsers / pageSize),
                    pageSize,
                },
                data,
                
            },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching users. Please try again.",
        });
    }
}