import express from 'express';
import {createUser,loginUser,getDashboardPage,getLogOut,getAllUsers,getSingleUser,follow,unfollow} from '../controllers/userController.js';

import * as authMiddleware from "../middlewares/authMiddleware.js"


const router=express.Router()

router.route("/register").post(createUser)
router.route("/login").post(loginUser)
router.route("/dashboard").get(getDashboardPage)
router.route("/logout").get(getLogOut)
router.route("/").get(authMiddleware.authenticateToken,getAllUsers)
router.route("/:id").get(authMiddleware.authenticateToken,getSingleUser)
router.route("/:id/follow").put(authMiddleware.authenticateToken,follow)
router.route("/:id/unfollow").put(authMiddleware.authenticateToken,unfollow)



export default router
router.route("/:id/follow",authMiddleware.authenticateToken,follow)