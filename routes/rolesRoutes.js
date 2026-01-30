import express from "express"
import {roles} from "../controllers/rolesController.js"

const router=express.Router()

router.post("/roles",roles)

export default router