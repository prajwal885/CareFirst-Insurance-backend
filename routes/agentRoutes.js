import express from "express"

import {
    addAgent,
    getAllAgents,
    getAgetById,
    updateAgent,
    deleteAgent
} from '../controllers/agentController.js'

const router= express.Router()

router.post("/",addAgent)
router.get('/',getAllAgents)
router.get("/:id",getAgetById)
router.put("/:id",updateAgent)
router.delete("/:id",deleteAgent)

export default router