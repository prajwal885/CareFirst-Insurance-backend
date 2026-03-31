import express from "express"
import { upload, uploadFile } from "../controllers/filesController.js"

const router = express.Router()

// ✅ field name = "file"
router.post("/upload", upload.single("file"), uploadFile)

export default router