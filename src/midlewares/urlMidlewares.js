import db from "../db.js";
import { urlSchema } from "../schema/urlSchema.js";


export async function validationUrl ( req,res, next) {
    const url = req.body
    console.log(url)
    console.log("teste")
    const {error} = urlSchema.validate(url)

    if (error) {
        const errors = error.details.map((detail) => detail.message)
              console.log("error aqui")

        return res.status(422).send({ errors })
      }
    next()
}

export async function checkUserDelet(req,res,next){
  const idUrl = req.params.id
  const userId = res.locals.getUserId.rows[0].userId
  
  try {
    const checkUrlExist = await db.query(`
    SELECT "shortUrl" FROM link WHERE id=$1`,[idUrl])
    if(checkUrlExist.rowCount==0){
      return res.sendStatus(404)
    }
    const check = await db.query(`
    SELECT id FROM link WHERE "id" = $1 AND "userId" = $2`,[idUrl,userId])
    if(check.rowCount==0){
      return res.sendStatus(401)
    }
    next()

  } catch (error) {
    res.status(500).send(error.message);
  }
}
