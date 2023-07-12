import express from "express";
import dotenv from 'dotenv';
import conn from './db.js';  //çok önemli .js şeklinde alınması gerekir. 
import pageRoute from './routes/pageRoute.js';
import photoRoute from './routes/photoRoute.js';
import userRoute from './routes/userRoute.js';
import cookieParser from "cookie-parser";
import {checkUser} from './middlewares/authMiddleware.js';

dotenv.config();  //.env dosyasındaki verilere ulaşmak için kullanılır


const app = express()



//db connection
conn()

//ejs template engine
app.set("view engine","ejs")

//static files 
app.use(express.static('public'))

//req.body reading çok önemli
app.use(express.json())
//url içindeki verilerin okunması için çok önemli
app.use(express.urlencoded({extended:true}))
//cookie işlemleri için gerekli
app.use(cookieParser())

//Routes
app.get("*",checkUser)
app.use("/",pageRoute)
app.use("/photos",photoRoute)
app.use("/users",userRoute)


app.listen(process.env.PORT, () => {
    console.log(`application ruun on http://localhost:${process.env.PORT}/`)
})