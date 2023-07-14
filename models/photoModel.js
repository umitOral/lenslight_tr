import mongoose, { mongo } from 'mongoose';

const { Schema } = mongoose

const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    description:{
        type:String,
        required:true,
       
    },
    uploadedDate:{
        type:Date,
        default:Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

})

const Photo =mongoose.model("photo",photoSchema)

export default Photo