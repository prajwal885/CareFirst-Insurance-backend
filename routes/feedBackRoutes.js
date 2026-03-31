import express from "express"

import {
    getAllFeedBack,
    getFeedBackById,
    createFeedback,
    updateFeedBack,
    deleteFeedBack
} from "../controllers/feedBackController.js"

const router=express.Router()

router.get("/feedback", getAllFeedBack)
router.get("/feedback/:id", getFeedBackById)
router.post("/feedback",createFeedback)
router.put("/feedbcak/:id",updateFeedBack)
router.delete("feedback/:id",deleteFeedBack)

export default router