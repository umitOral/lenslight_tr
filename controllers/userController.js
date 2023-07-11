import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jws from 'jsonwebtoken';


const myPlaintextPassword = "umito"
const saltRounds = 10;

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            success: true,
            data: user
        })
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
            res.status(200).json({
                success: "başarıyla giriş yapıldı",
                data: user,
                token: createJwt(user._id)
            })
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

const createJwt = (userID) => {
    return jws.sign({ userID }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}



export { createUser, loginUser }