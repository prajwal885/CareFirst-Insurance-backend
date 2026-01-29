import {pool} from "../config/db.js"

// create claim

export const fileClaim=async(req,res)=>{
    try{
        const {
            claimNumber,
            policyId,
            claimantName,
            claimantEmail,
            claimantPhone,
            incidentDescription,
            damageAssessment
        }= req.body


        const result =await pool.query(
            `INSERT INTO claims
            (claim_number, policy_id, claimant_name, claimant_email, claimant_phone, 
            incident_description, damage_assessment)
            VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING * `,
            [ claimNumber,
            policyId,
            claimantName,
            claimantEmail,
            claimantPhone,
            incidentDescription,
            damageAssessment]

        )

        res.status(201).json(result.rows[0])
    }catch(err){
        res.status(400).json({message:err.message})
    }

}


// get all the data 
export const getAllClaims=async(req,res)=>{
    try{
        const result= await pool.query(
           `ELECT * FROM claims ORDER BY craeted_at DESC`
        )
        res.json(result.rows)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


 // get claim by id

 export const getClaimById=async(req,res)=>{
    try{
        const result= await pool.query(
            `SELECT * FROM claims WHERE id=$1`,
            [id]
        )
        if(result.rows.length===0){
            return res.status(404).json({message:"claims not found"})

            res.json(result.rows[0])
        }
    }catch(err){
        res.status(400).json({message:err.message})
    }
 }

 // update claim

 export const updateById=async(req,res)=>{
    try{
    const {id}=req.body
    const {status, damageAssessment}=req.body

    const result = await pool.query(
        `UPDATE claims 
        SET=status=$1, damage_assessment=$2 updated_at=NOW()
        WHERE id=$3
        RETURNING * `,
        [status, damageAssessment,id]
    )
    if(result.rows.length===0){
        return res.status(404).json({message:"claims not found"})

        res.json(result.rows[0])
    }
    }catch(err){
        res.status(400).json({message:err.message})
    }
 }

 // dfelete claim 

 export const deleteClaim=async(req,res)=>{
    try{
        const {id}=req.body

        const result = await pool.query(
            `DELETE FROM claims WHERE id=$1 RETURNING *`,
            [id]
        )
        if(result.rows.length===0){
            return res.status(404).json({message:"deleted claims"})

            res.json({message:"claims deleted successfully"})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
 }


// payload={
//     "flagId":2,
//     "rolname":"sjehdsefh",
//     "roledescrption":"jshjsdh",
//     "requestUserName":"loginaname"
// }

// import express from "express"
// import roles from "../../"

// const router = express.Router()

// router.post("/view", auetniticate, upload.array("file"), roles)

// export default router



// export const roles = async (req, res) => {

//         const {flagId, requestusername, ...data} = req.body

//     try {
//         let result
//         if (parseInt(flagId) === 1) {
//             if(!flagId){
//                 await errormessage("asefesfsegsegsegse")
//             }
//             result = await fecthrole()
//         }
//         else if (parseInt(flagId) === 2) {
//             result = await insertROle(data)
//             return res.status(200).status({success:true, message:"inserted successfully"})
//         } else if (parseInt(flagId) === 3) {
//             result = await updaterole()
//         }
//         else {
//             return res.status(404).json({ messagse: "no found" })
//         }
//         return res.status(200).status({success:true, result})

//     } catch (error) {
//         return res.status(500).json({ messagse: "internla server error" })

//     }
// }

// import {pool} from  "../../"

// export const fecthrole =async()=>{
//     try {
//         const result = await pool.query(`
//                 select * from public."roles" orderby "rolename";
            
//             `)
//             return result.rows
//     } catch (error) {
//         throw new error
//     }
// }



// export const insertROle =async(data)=>{

//     const {rolename,rolcode,roledescription}=data
//     try {
//         const result = await pool.query(`
//                 insert into public."roles"("rolename", "rolcode", "roledescription") 
//                 values(?,?,?)
            
//             `,[rolename,rolcode,roledescription])
//             return result.rows
//     } catch (error) {
//         throw new error
//     }
// }


// export const errormessage=async(req, res, mesaage)=>{
//     try {
//         return res.status(400).json({message:`${mesaage}`})
//     } catch (error) {
        
//     }
// }
