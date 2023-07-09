import Photo from '../models/photoModel.js';

const createPhoto = async (req, res) => {
    try {
        const photo = await Photo.create(req.body)
        res.status(201).json({
            success: true,
            data: photo
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mesage: error
        })
    }

}
const getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({})
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

export { createPhoto, getAllPhotos }