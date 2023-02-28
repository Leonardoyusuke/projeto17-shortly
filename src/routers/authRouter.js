import { Router } from "express";
import { signin, signup } from "../controllers/usersController.js";
import { validationSignUp,validationSignIn, checkUser, authPassword } from "../midlewares/userMidlewares.js";

const authRouter = Router()

authRouter.post("/signup",validationSignUp, signup)
authRouter.post("/signin",validationSignIn, checkUser,authPassword,signin)

export default authRouter   