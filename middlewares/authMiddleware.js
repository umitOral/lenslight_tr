
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

import Photo from '../models/photoModel.js';

const checkUser = (req, res, next) => {
    const token = req.cookies.jsonwebtoken

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                const user = await User.findById(decodedToken.userID)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }


}

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.cookies.jsonwebtoken

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, err => {
                if (err) {
                    console.log(err.message)
                    res.redirect("login")
                } else {
                    next()
                }
            })

        } else {
            res.redirect("/login")
        }


    } catch (error) {
        res.status(401).json({
            succes: false,
            message: "yetkisizlikten gelen hata"
        })
    }
}


// const checkOwner = async (req, res, next) => {

//     const userID = res.locals.user._id
//     const photo = await Photo.findById(req.params.id).populate("user")
//     console.log(photo)
//     const photoUserID = photo.user._id
//     try {
//         if (userID === photoUserID) {
//             next()
//         }
//     } catch (error) {
//         res.status(401).json({
//             success: false,
//             message: "yetkili değilsiniz."
//         })
//     }

// }



    export { authenticateToken, checkUser }

