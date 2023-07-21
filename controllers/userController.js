import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Photo from '../models/photoModel.js';


const myPlaintextPassword = "umito"
const saltRounds = 10;

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json({ user: user._id })

    } catch (error) {

        let errors2 = {}
        if (error.code === 11000) {
            errors2.email = "email already exist"
        }
        if (error.name === "ValidationError") {

            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message
            })
        }

        res.status(400).json(
            errors2
        )
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

const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id })
    const user = await User.findById({ _id: res.locals.user._id }).populate(["followers","followings"])
    // .populate(["followings", "followers"])
    console.log(user.followings)
    res.render("dashboard", {
        user,
        photos,
        link: "dashboard"
    })
}
const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({ _id: { $ne: res.locals.user._id } })
        res.render("users", {
            users,
            link: "users"
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            message: error
        })
    }

}

const getSingleUser = async (req, res) => {
    try {
        
        const user = await User.findById({ _id: req.params.id })
        const infollower= user.followers.some((follower)=>{
            return follower.equals(res.locals.user._id)
        })
        const photos = await Photo.find({ user: user._id })

        res.status(201).render("userDetails", {
            photos,
            user,
            infollower,
            link: ""
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mesage: error
        })
    }
}


const getLogOut = (req, res) => {
    res.cookie("jsonwebtoken", "", {
        maxAge: 1
    })
    res.redirect("/")
}
const follow = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate({ _id: res.locals.user._id },
            {
                $push: { followings: req.params.id }
            },
            {
                new: true
            })
        user = await User.findByIdAndUpdate({ _id: req.params.id },
            {
                $push: { followers: res.locals.user._id }
            },
            {
                new: true
            })
        res.redirect(`/users/${req.params.id}`)
        // şu şekilde de kullanılabilir
        // res.status(200).redirect("back")

    } catch (error) {
        res.status(500).json({
            success: false,
            mesage: error
        })
    }
}
const unfollow = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate({ _id: res.locals.user._id },
            {
                $pull: { followings: req.params.id }
            },
            {
                new: true
            })
        user = await User.findByIdAndUpdate({ _id: req.params.id },
            {
                $pull: { followers: res.locals.user._id }
            },
            {
                new: true
            })
            res.status(200).redirect("back")

    } catch (error) {
        res.status(500).json({
            success: false,
            mesage: error
        })
    }
}



export { createUser, loginUser, getDashboardPage, getLogOut, getSingleUser, getAllUsers, follow, unfollow }