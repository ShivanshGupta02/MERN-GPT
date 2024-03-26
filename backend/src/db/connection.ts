import {connect, disconnect} from "mongoose";

export default async function connectToDatabase(){
    try{
        await connect(process.env.MONGODB_URL);
    }
    catch(error){
        console.log(error)
        throw new Error("can't connect to mongodb")
    }
}

async function disconnectFromDatabase(){
    try{
        await disconnect();
    }catch(error){
        console.log(error);
        throw new Error("Couldn't disconnect from mongodb")
    }
}

export {connectToDatabase, disconnectFromDatabase} 