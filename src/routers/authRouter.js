import { Router } from "express";
import { signin, signup } from "../controllers/usersController.js";
import { validationSignUp,validationSignIn, checkUser, authPassword } from "../midlewares/userMidlewares.js";
import { checkUserDelet, validationUrl,ranking } from "../midlewares/urlMidlewares.js";
import { authorization } from "../midlewares/authMidlewares.js";
import { deletUrl, getIdByToken, redirect, urlById, urlReduction } from "../controllers/urlController.js";

const authRouter = Router()

authRouter.post("/signup",validationSignUp, signup)
authRouter.post("/signin",validationSignIn, checkUser,authPassword,signin)
authRouter.post("/urls/shorten",validationUrl,authorization,urlReduction)
authRouter.get("/urls/:id",urlById)
authRouter.get("/urls/open/:shortUrl",redirect)
authRouter.delete("/urls/:id",authorization,checkUserDelet,deletUrl)
authRouter.get("/users/me",authorization,getIdByToken)
authRouter.get("/ranking",ranking)





export default authRouter  