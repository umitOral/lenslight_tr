import express from 'express';
import {getIndexPage,getAboutPage, getRegisterPage, getloginPage } from "../controllers/pageController.js";
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router()

router.route("/").get(authenticateToken,getIndexPage)
router.route("/about").get(getAboutPage)
router.route("/register").get(getRegisterPage)
router.route("/login").get(getloginPage)

export default router;