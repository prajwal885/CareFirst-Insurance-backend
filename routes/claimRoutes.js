import express from "express"

import {
fileClaim,
getAllClaims,
getClaimById,
updateById,
deleteClaim
} from "../controllers/claimController.js"

const router = express.Router()

router.post("/",fileClaim)
router.get("/",getAllClaims)
router.get("/:id",getClaimById)
router.put("/:id",updateById)
router.delete("/:id",deleteClaim)

export default router