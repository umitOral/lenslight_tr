import express from "express";
import dotenv from 'dotenv';
import conn from './db.js';  //çok önemli .js şeklinde alınması gerekir. 
import pageRoute from './routes/pageRoute.js';
import photoRoute from './routes/photoRoute.js';
import userRoute from './routes/userRoute.js';
import cookieParser from "cookie-parser";
import {checkUser} from './middlewares/authMiddleware.js';
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import methodOverride from 'method-override';

dotenv.config();  //.env dosyasındaki verilere ulaşmak için kullanılır
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

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
//RESİM Yükleme işlemleri
app.use(fileUpload({useTempFiles:true}))
//put methodunu kullanmak için gerekli
app.use(methodOverride('_method',{
    methods:["POST","GET"]
}))

//Routes
app.use("*",checkUser)
app.use("/",pageRoute)
app.use("/photos",photoRoute)
app.use("/users",userRoute)


app.listen(process.env.PORT, () => {
    console.log(`application ruun on http://localhost:${process.env.PORT}/`)
})