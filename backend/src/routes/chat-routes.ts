import {Router} from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator } from "../utils/validators.js";
import { deleteChats, generateChatCompletion } from "../controllers/chat-controllers.js";
import { validate } from "../utils/validators.js";
import { sendChatsToUser } from "../controllers/chat-controllers.js";
const chatRoutes = Router();

// protected api
chatRoutes.post("/new",
 validate(chatCompletionValidator), 
 verifyToken, 
 generateChatCompletion);

chatRoutes.get("/all-chats", 
 verifyToken, 
 sendChatsToUser);

chatRoutes.delete("/delete", 
 verifyToken, 
 deleteChats);

export default chatRoutes;