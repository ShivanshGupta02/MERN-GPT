import { Request,Response, NextFunction } from "express"
import User from "../models/User.js";
import {config} from "../config/gemini-config.js"

export const generateChatCompletion = async(req : Request, res:Response, next : NextFunction)=>{

    const {message} = req.body;
    try{

        const user = await User.findById(res.locals.jwtData.id);
        if(!user){
            return res.status(401).json({message:"User not registerd or Token malfunctioned"})
        }

        // storing the new query message of the user
        user.chats.push({content:message, role:"user"});
        
        // send all chats with new one to Gemini API
        
        const model = await config();
        const result = await model.generateContent(message);

        // get latest response 
        const chatResponse = await result.response;

        // storing the response of the GEMINI API
        user.chats.push({content : chatResponse.text(), role:"assistant"});
        await user.save();
        return res.status(200).json({chats: user.chats});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"Something went wrong"});
    }  
};

export const sendChatsToUser = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        // console.log(user._id.toString(), res.locals.jwtData.id);
        if(user._id.toString() !==res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }

        return res.status(200).json({message:'ok', chats : user.chats});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause : error.message});
    }
}

export const deleteChats = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        // user token check
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        // console.log(user._id.toString(), res.locals.jwtData.id);
        if(user._id.toString() !==res.locals.jwtData.id){
            return res.status(401).send("Permissions didn't match");
        }
        //  @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({message:'ok'});
    } catch (error) {
        console.log(error);
        return res.status(200).json({message:"ERROR", cause : error.message});
    }
}