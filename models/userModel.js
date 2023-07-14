import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: [true,"username area required"],
        lowercase:true,
        validate:[validator.isAlphanumeric,"Lütfen sadece harf kullanın"]
    },
    email: {
        type: String,
        required: [true,"email area required"],
        unique: true,
        validate:[validator.isEmail,"Lütfen geçerli bir mail adresi giriniz"]
    },
    password: {
        type: String,
        required: [true,"password area required"],
        minLength: [4,"en az 4 karakterli şifre giriniz."]
    }
},
    {
        timestamps: true
    }
)

userSchema.pre("save", function (next) {
    const user = this

    bcrypt.hash(user.password, 10, (err, hash) => {

        user.password = hash
        next()
    })


})

const User = mongoose.model("User", userSchema)
export default User