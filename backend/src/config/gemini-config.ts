import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = ()=>{

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({model:"gemini-pro"});
    return model;
}