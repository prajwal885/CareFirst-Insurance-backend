import multer from "multer"
import { pool } from "../config/db.js"

// storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname
    cb(null, uniqueName)
  }
})

export const upload = multer({ storage })

// controller
export const uploadFile = async (req, res) => {
  try {
    console.log("FILE:", req.file) // 🔍 debug

    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded"
      })
    }

    const file = req.file

    const result = await pool.query(
      `INSERT INTO files(filename, filepath) 
       VALUES($1,$2) RETURNING *`,
      [file.filename, file.path]
    )

    res.json({
      message: "File uploaded successfully",
      data: result.rows[0]
    })

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}