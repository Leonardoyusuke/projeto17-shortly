import express,{  json } from "express";
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routers/authRouter.js";

const app = express();
app.use(express.json());
app.use(cors()); 
app.use(userRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`listen on ${PORT}`)
});

export default app;