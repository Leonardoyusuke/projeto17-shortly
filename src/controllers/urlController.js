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
    res.status(500).send(error.message);
}
}


export async function urlById(req,res){
    const id = req.params.id

    try {
        const returnUrls = await db.query(`
        SELECT id, "shortUrl", url FROM link where id=$1`,[id])
        return res.status(200).send(returnUrls.rows[0])

    } catch (error) {
        res.status(500).send(error.message);

    }
}

export async function redirect(req,res){
    const shortUrl = req.params.shortUrl

    try {
        const redirect = await db.query(`
        SELECT url FROM link where "shortUrl" = $1`,[shortUrl])
        const link = redirect.rows[0].url
        if(redirect.rowCount==0){
            return res.sendStatus(404)
        }

        await db.query(`UPDATE link 
        SET "visitCount" = "visitCount" + 1
        WHERE "shortUrl" = $1`,[shortUrl])


        return res.redirect(link)

    } catch (error) {
        res.status(500).send(error.message);
    }
}

export async function deletUrl(req,res){
    const urlId = req.params.id

    try {
        await db.query(`
        DELETE FROM link WHERE id=$1`,[urlId])
        return res.sendStatus(204)
    } catch (error) {
        res.status(500).send(error.message);

    }
}

export async function getIdByToken(req,res,next){
    const userId = res.locals.getUserId.rows[0].userId
  
    try {
        const userName = await db.query(`
        SELECT name FROM users WHERE id = $1`,[userId])
        console.log(userName.rows[0].name)


        const totalvisit = await db.query(`
        SELECT SUM("visitCount") FROM link WHERE "userId" = $1 ;`,[userId])
        console.log(totalvisit.rows[0].sum)
    
        const shortenedUrls = await db.query(`
        SELECT id,"shortUrl",url,"visitCount" 
        FROM link WHERE "userId" = $1`,[userId])







    return res.status(200).send({"id":userId,"name":userName.rows[0].name,"visitCount":totalvisit.rows[0].sum,"shortenedUrls":shortenedUrls.rows})
    } catch (error) {
      
    }
  }