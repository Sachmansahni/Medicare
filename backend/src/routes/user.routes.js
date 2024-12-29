import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { smartSearch } from "../controllers/smartsearch.controller.js";
import { searchOpenFda } from "../controllers/openFDAsearch.js";

const router=Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/smartsearch").get(smartSearch)
router.route("/openFDAsearch").get(searchOpenFda);

export default router