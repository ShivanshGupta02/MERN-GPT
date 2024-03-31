import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator"

export const validate = (validations : ValidationChain[]) => {
    return async(req : Request, res : Response, next:NextFunction)=>{
        for(let validation of validations){
            const error = await validation.run(req);
            if(!error.isEmpty()) break;
        }
        const errors = validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        // status code 422 : data can't be processed further
        return res.status(422).json({errors: errors.array()});
    };
};


export const loginValidator =[
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
        .trim()
        .isLength({min:6})
        .withMessage("password should contain atleast 6 characters")
]; 
export const signupValidator =[
    body("name").notEmpty().withMessage("Name is Required"),
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password").trim().isLength({min:6}).withMessage("password should contain atleast 6 characters")
]; 

export const chatCompletionValidator =[
    body("message").notEmpty().withMessage("Message is Required"),
]; 