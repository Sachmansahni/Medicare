import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { smartSearch, smartSearch2 } from "../controllers/smartsearch.controller.js";
import { searchOpenFda } from "../controllers/openFDAsearch.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router=Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/smartsearch").get(smartSearch)
router.route("/smartsearch2").get(smartSearch2);
router.route("/openFDAsearch").get(searchOpenFda);

// secure routes
router.route("/logout").post(verifyJWT,logoutUser);

export default router