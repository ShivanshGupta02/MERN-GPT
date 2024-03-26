import app from "./app.js"
import {config} from "dotenv";
import {connectToDatabase} from "./db/connection.js";
config();

const PORT = process.env.PORT || 5000;

// connections and listeners
connectToDatabase().then(()=>{
    app.listen(PORT,()=> console.log("Server Open & connected to database"));
})
.catch((err)=>console.log(err));
