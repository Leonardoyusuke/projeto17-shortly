import db from "../db.js";

export async function authorization (req,res,next){
    const authToken = req.headers.authorization
    const token = authToken?.replace("Bearer ","")
    if(!authToken ){
        return res.sendStatus(401)
    }
    try { 
        const validate = await db.query(`
        SELECT token FROM SESSIONS WHERE "isValid" = true and token = $1 `,[token])
        if(validate.rowCount==0){
            return res.sendStatus(401)
        }
        const getUserId = await db.query(`
        SELECT "userId" FROM sessions WHERE token = $1`,[token])

        res.locals.getUserId = getUserId


        next()
    
    } catch (error) {
        res.sendStatus(422)
    }
    
}