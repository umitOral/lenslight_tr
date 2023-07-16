import Photo from '../models/photoModel.js';
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

const createPhoto = async (req, res) => {


    try {
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: "lenslight_tr"
            })



        const photo = await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url
        })
        fs.unlinkSync(req.files.image.tempFilePath)
        res.status(201).redirect("/users/dashboard")


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })


    }

}
const getAllPhotos = async (req, res) => {
    try {
      

        const photos= res.locals.user
        ? await Photo.find({ user: { $ne: res.locals.user._id } })
        : await Photo.find( {  })

        res.status(201).render("photos", {
            photos,
            link: "photos"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mesage: error
        })
    }
}
const getSinglePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({ _id: req.params.id }).populate("user")
        res.status(201).render("photo", {
            photo,
            link: "photos"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mesage: error
        })
    }
}


export { createPhoto, getAllPhotos, getSinglePhoto }