import express from "express";
import dotenv from 'dotenv';
import conn from './db.js';  //çok önemli .js şeklinde alınması gerekir.
import pageRoute from './routes/pageRoute.js';
import photoRoute from './routes/photoRoute.js';

dotenv.config();


const app = express()

//db connection
conn()

//ejs template engine
app.set("view engine","ejs")

//static files 
app.use(express.static('public'))

//req.body reading
app.use(express.json())

//Route
app.use("/",pageRoute)
app.use("/photos",photoRoute)


app.listen(process.env.PORT, () => {
    console.log(`application ruun on http://localhost:${process.env.PORT}/`)
})