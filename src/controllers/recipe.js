import { RecipeModel } from "../models/Recipe.js"
import { UserModel } from "../models/User.js";

export const createRecipe=async(req,res)=>{
    try {
        const {recipeName,cook,ingredients,cookingInstructions,photo,cuisineType,dietaryPreference,tag}=req.body
        const data=await RecipeModel.create({recipeName,cook,ingredients,cookingInstructions,photo,cuisineType,dietaryPreference,tag});
        return res.status(201).json({
            success:true,
            message:"Recipe created successfully.",
            recipe:data
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Failed to created new recipe."
        })
        
    }
}
export const getRecipe=async(req,res)=>{
    try {
        const {id}=req.params
        const data=await RecipeModel.findById(id).populate("cook");
        if(!data){
            return res.status(404).json({
                success:false,
                message:"Recipe not found."
            })
        }
        return res.status(200).json({
            success:true,
            message:"Recipe found successfully.",
            recipe:data
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"Internal server error."
        })
    }
}
export const serachRecipe=async(req,res)=>{
    try {
        const {recipeName,cuisineType,dietaryPreference,page=1,limit=10}=req.query;
        const searchCriteria={};
        if(recipeName){
            searchCriteria.recipeName={$regex:recipeName,$options:"i"}
        }
        if(cuisineType){
            searchCriteria.cuisineType={$regex:cuisineType,$options:"i"}

        }
        if(dietaryPreference){
            searchCriteria.dietaryPreference={$regex:dietaryPreference,$options:"i"}

        }
        const pageNumber=parseInt(page,10);
        const pageSize=parseInt(limit,10);
        const skip=(pageNumber-1)*pageSize;
        const data=await RecipeModel.find(searchCriteria).skip(skip).limit(pageSize).exec();
        if(data.length===0){
            return res.status(404).json({
                success:false,
                message:"No Recipe Found."
            })
        }
        console.log(data)
        const totalRecipe=await RecipeModel.countDocuments(searchCriteria)
        return res.status(200).json({
            success:true,
            message:"Recipe fetched successfully.",
            data:{
                pagination:{
                    totalRecipe:totalRecipe,
                    currentPage:pageNumber,
                    totalPage:Math.ceil(totalRecipe/pageSize),
                    pageSize
                },
                data
            }

        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching recipe. Please try again.",
        });
    }
}
export const rateRecipe=async(req,res)=>{
try {
   
    
    const{id}=req.params
    const {rating}=req.body;
    const recipe=await RecipeModel.findById(id);
    if(!recipe){
        return res.status(404).json({
            success:false,
            message:"Recipe not found."
        })
    }
    const total=recipe.totalRating+1;
    const newRating=((recipe.rating*recipe.totalRating)+rating)/total
    const data= await RecipeModel.findByIdAndUpdate(id, {rating:newRating,totalRating:total},{new:true}).populate("cook")
    return res.status(200).json({
        success:true,
        message:"Recipe rating Upated successfully.",
        data:data
    })

    
} catch (error) {
    console.log(error)
        return res.status(400).json({
            success:false,
            message:"Failed to update recipe rating."
        })
}
}
export const saveRecipe=async(req,res)=>{
    try {
        const recipId=req.params.id;
        const user= await UserModel.findById(req.user.id);
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        } 

        if(user.saved.length>0 && user.saved.includes(recipId)){
            return res.status(400).json({
                success:false,
                message:"Recipe already saved."
            })
        }
        user.saved.push(recipId)
        const updatedUser=await user.save(); 
        const populatedUser = await UserModel.findById(updatedUser._id).populate('saved');
        return res.status(200).json({
            success:true,
            message:"Recipe saved successfully.",
            data:populatedUser

        })
        

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while saving recipe. Please try again.",
        });
    }
}
