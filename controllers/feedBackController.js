import {
    getAllFeedBack as getAllFeedBackModel,
    getFeedBackById as getFeedBackByIdModel,
    createFeedback as createFeedbackModel,
    updateFeedBack as updateFeedBackModel,
    deleteFeedBack as deleteFeedBackModel
} from "../models/feedback.js"


// GET ALL
export const getAllFeedBack = async (req, res) => {
    try {
        const data = await getAllFeedBackModel()
        res.status(200).json({ success: true, data })
    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}


// GET BY ID
export const getFeedBackById = async (req, res) => {
    try {
        const { id } = req.params
        const data = await getFeedBackByIdModel(id)

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "feedback not found"
            })
        }

        res.status(200).json({ success: true, data })

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}


// CREATE
export const createFeedback = async (req, res) => {
    try {

        const { userId, details, rating } = req.body

        if (!userId || !details) {
            return res.status(400).json({
                success: false,
                message: "userId and details are required"
            })
        }

        const data = await createFeedbackModel({ userId, details, rating })

        res.status(201).json({
            success: true,
            data
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

// UPDATE
export const updateFeedBack = async (req, res) => {
    try {
        const { id } = req.params
        const { details, rating } = req.body

        const data = await updateFeedBackModel(id, { details, rating })

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "feedback not found"
            })
        }

        res.status(200).json({ success: true, data })

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}


// DELETE
export const deleteFeedBack = async (req, res) => {
    try {
        const { id } = req.params

        const data = await deleteFeedBackModel(id)

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "feedback not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "feedback deleted"
        })

    } catch (err) {
        res.status(500).json({ success: false, message: err.message })
    }
}