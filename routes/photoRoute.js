import express from 'express';
import {createPhoto,getAllPhotos,getSinglePhoto,deletePhoto,updatePhoto} from '../controllers/photoController.js';


const router=express.Router()

router.route("/").post(createPhoto)
router.route("/").get(getAllPhotos)
router.route("/:id").get(getSinglePhoto)
router.route("/:id").delete(deletePhoto)
router.route("/:id").put( updatePhoto)

export default router