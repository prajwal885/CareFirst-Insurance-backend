import express from "express"
import {
    addLocation,
    getAllLocation,
    getLocationById,
    updateLocationById,
    deleteLocation
} from "../controllers/locationController.js"

const router=express.Router()

router.post("/",addLocation)
router.get("/",getAllLocation)
    
router.get("/:id",getLocationById)
router.put("/:id",updateLocationById)
router.delete("/:id",deleteLocation)

export default router