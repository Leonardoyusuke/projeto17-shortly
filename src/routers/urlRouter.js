import { Router } from "express";
import { authorization } from "../midlewares/authMidlewares.js";
import { validationUrl } from "../midlewares/urlMidlewares.js";
import {urlReduction} from "../controllers/urlController.js";


const urlRouter = Router()

//urlRouter.post("/urls/shorten",validationUrl,authorization,urlReduction)


export default urlRouter