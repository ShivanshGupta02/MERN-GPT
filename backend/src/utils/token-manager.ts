import jwt from "jsonwebtoken";
import { Request,Response, NextFunction } from "express";
export const createToken = (id:string, email:string, expiresIn)=>{
    const payload = {id,email};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        // expirty time is added in payload by jwt
        expiresIn:"7d", 
    });
    return token;
};

export const verifyToken = async (req : Request, res:Response, next : NextFunction) =>{
    const token = req.cookies['auth_token']
    if(!token || token.trim()===""){
        return res.status(401).json({message:"Token not received"});
    }
    return new Promise<void>((resolve,reject)=>{
        return jwt.verify(token,process.env.JWT_SECRET,(err,success)=>{
            if(err){
                reject(err.message);
                return res.status(401).json({message:"Token Expired"});
            }
            else{
                console.log("Token verification successful");
                resolve();
                res.locals.jwtData = success;
                return next();
            }
        });
    });

};