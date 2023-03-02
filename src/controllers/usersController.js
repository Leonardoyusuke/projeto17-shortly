import db from "../db.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

export async function signup(req,res) {
    const {name,email,password} = req.body

    const criptPassword = bcrypt.hashSync(password,10)

    try {
        const checkExist = await db.query(`
        SELECT email FROM users where email = $1`,[email])
        if (checkExist.rowCount>0){
            return res.sendStatus(409)
        }
        await db.query(`INSERT INTO users (
            "name",
            "email",
            "password"
            )
            values($1,$2,$3)
            `,[name,email,criptPassword])
        res.sendStatus(201)
        


    } catch (error) {
        console.log(error)
        res.status(500).send(error.message);
    }
}


export async function signin (req,res){
    const userId = res.locals.userId
    const tokenOn = res.locals.tokenOn
    console.log(tokenOn)
    const token = uuid()
    try {
        if(tokenOn){
            await db.query(`
            UPDATE sessions set token=$1
            WHERE "userId" = $2`,[token,userId])
            return res.status(200).send({token:token})
        }
        else{
            await db.query(`
            INSERT INTO sessions ("userId",token)
            VALUES ($1,$2)`,[userId,token])
            return res.status(200).send({token:token})
        }
    } catch (error) {
        res.status(500).send(error.message);

    }
}