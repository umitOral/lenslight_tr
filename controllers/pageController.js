import nodemailer from 'nodemailer';
import Photo from '../models/photoModel.js';
import User from '../models/userModel.js';

const getIndexPage =async (req, res) => {
    try {
        const photos = await Photo.find().sort({ uploadedDate:-1 }).limit(3)
        const users= await User.countDocuments({})
        res.render("index", {
            photos,
            users,
            link: "index"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
    
}
const getAboutPage = (req, res) => {
    res.render("about", {
        link: "about"
    })
}
const getRegisterPage = (req, res) => {
    res.render("register", {
        link: "register"
    })
}

const getloginPage = (req, res) => {
    res.render("login", {
        link: "login"
    })
}
const getUsersPage = async (req, res) => {
    res.render("users", {
        link: "users"
    })
}
const getContactPage = async (req, res) => {
    res.render("contact", {
        link: "contact"
    })
}
const sendEmail = async (req, res) => {
    const htmlTemplate = `
    `

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {

            user: process.env.NODE_MAIL,
            pass: process.env.NODE_MAIL_PASS,

        },
        tls: { rejectUnauthorized: false }
    });
    try {

        await transporter.sendMail({
            from: req.body.email,
            to: "umit.oralmat10@gmail.com", // list of receivers
            subject: `mail from:${req.body.email}`, // Subject line
            text: "Hello world?", // plain text body
            html: `

                ${req.body.name}
                ${req.body.message}
            `
        });
        res.status(200).json({
            success: true,

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}


export { getIndexPage, getAboutPage, getRegisterPage, getloginPage, getUsersPage, getContactPage, sendEmail }