import rateLimit from "express-rate-limit"

export const loginLimiter=rateLimit({
    windoMs:1 * 60 * 1000, // 1 minutes
    max:5,  // max 5 attempts
    message:{
        error:"Too many login attempts. Try again after 1 minutes"
    },
    standardHeaders:true,
    legacyHeader:false
})