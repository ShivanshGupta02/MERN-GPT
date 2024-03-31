import cors from "cors";
import morgan from "morgan";
import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import appRouter from "./routes/routes.js";
import {connectToDatabase} from "./db/connection.js";
config();

const app = express();

// middlewares
app.use(cors({origin:"http://localhost:5173", credentials:true}));
app.use(express.json());
app.use(cookieParser());

// for logging request and response on console
app.use(morgan("dev"));

app.use("/api/v1",appRouter);



const PORT = process.env.PORT || 5000;

// connections and listeners
connectToDatabase().then(()=>{
    app.listen(PORT,()=> console.log("Server Open & connected to database"));
})
.catch((err)=>console.log(err));


export default app;