import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const myPlaintextPassword = "umito"
const saltRounds = 10;

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.redirect("/login")
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        let same = false
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            same = await bcrypt.compare(req.body.password, user.password)
        } else {
            return res.status(401).json({
                message: "kullanıcı bulunamadı"
            })
        }

        if (same) {
            const token = createtoken(user._id)
            res.cookie("jsonwebtoken", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24
            })

            res.redirect("dashboard")
        } else {
            res.status(401).json({
                success: false,
                message: "şifreler uyuşmuyor"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

const createtoken = (userID) => {
    return jwt.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

const getDashboardPage=(req,res)=>{
    res.render("dashboard",{
        link:"dashboard"
    })
}
const getLogOut=(req,res)=>{
    res.cookie("jsonwebtoken","",{
        maxAge:1
    }) 
    res.redirect("/")
}



export { createUser, loginUser,getDashboardPage,getLogOut }