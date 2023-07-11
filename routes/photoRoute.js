import express from 'express';
import {createPhoto,getAllPhotos,getSinglePhoto} from '../controllers/photoController.js';


const router=express.Router()

router.route("/").post(createPhoto)
router.route("/").get(getAllPhotos)


router.route("/:id").get(getSinglePhoto)
export default router