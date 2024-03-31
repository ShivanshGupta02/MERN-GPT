import { NextFunction, Request,Response } from "express";
import User from "../models/models.js"
import {hash,compare, genSalt} from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";


export const userSignup = async (req:Request,res:Response,next :NextFunction)=>{
    // user signup
    try {
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).send("User already registered");
        }
        const salt = await genSalt(10);
        const hashedPassword = await hash(password,salt);
        const user = new User({name,email,password:hashedPassword});
        await user.save();
        
        // create token and store cookie
        // clearCookie fn is used to remove any existing cookie before setting a new authentication token cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly : true,
            domain : "localhost",
            path:"/"
        });
        
        // create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7)
        res.cookie("auth_token",token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
        });
        return res.status(201).json({message:"OK", name : user.name, email : user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause : error.message});
    }
}

export const userLogin = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).send("User not registered");
        }    
        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect Password");
        }
        // create token and store cookie
        // clearCookie fn is used to remove any existing cookie before setting a new authentication toke cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly : true,
            domain : "localhost",
            path:"/"
        });
        
        
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7)
        res.cookie("auth_token",token,{
            path:"/",
            domain:"localhost",
            expires,
            httpOnly:true,
        });
        return res.status(200).json({message:'ok', name : user.name, email : user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause : error.message});
    }
}


export const verifyUser = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            res.status(401).send("User not registered or Token malfunctioned");
        }
        // console.log(user._id.toString(), res.locals.jwtData.id);

        return res.status(200).json({message:'ok', name : user.name, email : user.email});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause : error.message});
    }
}

export const userLogout = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).send("User not registered OR Token malfunctioned");
        }
        
        res.clearCookie(COOKIE_NAME,{
            httpOnly:true,
            domain: "localhost",
            path:"/",
        });
        return res.status(200).json({message:"OK", name:user.name, email:user.email});
    }
    catch(err){
        return res.status(200).json({message:"ERROR", cause:err.message});
    }
};

// export const getAllUsers = async (req:Request,res:Response,next :NextFunction)=>{
//     // get all user from database
//     try {
//         const users = await User.find();
//         return res.status(200).json({message:"OK",users});
//     } catch (error) {
//         console.log(error);
//         return res.status(200).json({message:"ERROR", cause : error.message});
//     }
// }


