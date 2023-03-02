import db from "../db.js";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

export async function urlReduction(req,res){
    const {url} = req.body
    const shortUrl = nanoid(8)
    const getUserId = res.locals.getUserId
    const userId = getUserId.rows[0].userId
    
    try {
    const insertDb = await db.query(`
    INSERT INTO link 
    ("url","shortUrl","userId")
    VALUES($1,$2,$3)`,[url,shortUrl,userId])
    console.log(insertDb,"insertDB")
    
    const getUrlId = await db.query(`
    SELECT id FROM link WHERE "shortUrl" = $1 `,[shortUrl])
    console.log(getUrlId,"urlId")
    const urlId = getUrlId.rows[0].id

    console.log(urlId,"url")
    return res.status(201).send({"id":urlId,"shortUrl":shortUrl})

} catch (error) {
    res.send(error)
}
}


export async function urlById(req,res){
    const id = req.params.id

    try {
        const returnUrls = await db.query(`
        SELECT id, "shortUrl", url FROM link where id=$1`,[id])
        return res.status(200).send(returnUrls.rows[0])

    } catch (error) {
        
    }
}

