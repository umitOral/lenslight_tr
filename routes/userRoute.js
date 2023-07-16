import express from 'express';
import {createUser,loginUser,getDashboardPage,getLogOut,getAllUsers,getSingleUser} from '../controllers/userController.js';

import * as authMiddleware from "../middlewares/authMiddleware.js"


const router=express.Router()

router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/dashboard").get(authMiddleware.authenticateToken ,getDashboardPage)
router.route("/logout").get(getLogOut)
router.route("/").get(authMiddleware.authenticateToken,getAllUsers)
router.route("/:id").get(authMiddleware.authenticateToken,getSingleUser)


export default router