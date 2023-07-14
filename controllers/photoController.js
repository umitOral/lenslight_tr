import Photo from '../models/photoModel.js';

const createPhoto = async (req, res) => {
    try {

        const photo = await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id
        })

        res.status(201).redirect("/users/dashboard")
        console.log(photo)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
        console.log("BODY::")

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
const getSinglePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({ _id: req.params.id })
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