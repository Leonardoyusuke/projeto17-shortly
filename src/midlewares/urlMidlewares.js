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