import jwt from "jsonwebtoken";
export const verifyToken=(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Access denied. No token provided."
        })
    }
    try {
        const bearerToken=token.split(" ")[1];
        const decoded = jwt.verify(bearerToken, process.env.JWT_TOKEN_SECRET);
        console.log(decoded)
        req.user = decoded;

        next();
        
    } catch (error) {
        console.error(`[Token Verification Error]: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
    }
}