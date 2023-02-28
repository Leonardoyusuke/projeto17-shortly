import { signUpSchema, signInSchema } from "../schema/loginSchema.js";
import db from "../db.js";
import { findSourceMap } from "module";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid";


export async function validationSignUp ( req,res, next) {
    const userSignUp = req.body
    
    const {error} = signUpSchema.validate(userSignUp)

    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send({ errors })
      }
    next()
}


export async function validationSignIn ( req, res, next){
    const userSignIn = req.body

    const {error} = signInSchema.validate(userSignIn)
    if (error) {
        const errors = error.details.map((detail) => detail.message)
        return res.status(422).send({ errors })
      }
    next()

}

export async function checkUser ( req,res,next) {
    const {email} = req.body

    try {
        const check = await db.query(`
        SELECT * FROM users Where email = $1`,[email])
        if(check.rowCount<1){
            res.sendStatus(401)
        }

        const userId = check.rows[0].id 
        console.log(userId,"id")

        res.locals.userId = userId
        next()

    } catch (error) {
        res.sendStatus(401)
    }
}

export async function authPassword(req,res,next){
    const userId = res.locals.userId
    const {password} = req.body

    try {
        const passwordInDB = await db.query(`
        SELECT * FROM users WHERE id=$1`,[userId])

        const passwordCripted = passwordInDB.rows[0].password 
        const compare = await bcrypt.compare(password,passwordCripted)
        if(!compare){
            return res.sendStatus(401)
        }
        res.locals.password = passwordCripted

        const tokenOn = await db.query(`
        SELECT token FROM sessions WHERE "userId" = $1`,[userId])
        if(tokenOn.rowCount<1){
            res.locals.tokenOn = tokenOn.rows[0]
        }
        console.log(tokenOn)



        next()
    }  catch (error) {
        res.sendStatus(401)
    }
}
