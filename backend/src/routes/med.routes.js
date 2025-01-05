import { Router } from "express";
import { addMedicine,fetchAllMedicine,fetchByUserName,fetchMedByDetails } from "../controllers/Medicine.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const medRouter=Router()

medRouter.route("/addmed").post(verifyJWT,addMedicine)
medRouter.route("/allmeds").get(fetchAllMedicine)
medRouter.route("/medbydetail").get(fetchMedByDetails)

// secure routes 
medRouter.route("/fetchMedByUser").get(verifyJWT,fetchByUserName)

export default medRouter