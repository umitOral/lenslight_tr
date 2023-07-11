import User from "../models/userModel.js"
import jwt from 'jsonwebtoken';

const authenticateToken = async (req, res, next) => {
    try {
        let token = ""
        if (req.headers["authorization"]) {
            const token = req.headers["authorization"].split(" ")[1]
            req.user = await User.findById(
                jwt.verify(token, process.env.JWT_SECRET).user_id
            )
        } else {
            return res.status(401).json({
                success: false,
                message: "token yok malesef"
            })
        }

        next()
    } catch (error) {
        res.status(401).json({
            succes: false,
            message: "yetkisizlikten gelen hata"
        })
    }
}

export default authenticateToken
