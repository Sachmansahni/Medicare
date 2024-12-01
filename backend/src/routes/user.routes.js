import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { smartSearch } from "../controllers/smartsearch.controller.js";

const router=Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/smartsearch").post(smartSearch)

export default router