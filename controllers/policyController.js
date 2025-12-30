import { pool } from "../config/db.js";




// craeting policy
export const createPolicy=async(req,res)=>{
    try{
        const {policy_number, type, coverage, premium, start_date, end_date, status}=req.body
       
        const result= await pool.query(
        `INSERT INTO policies(policy_number, type, coverage, premium, start_date, end_date, status)
        VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [policy_number,type, coverage, premium, start_date, end_date, status]
        )
        res.status(201).json(result.rows[0])
    }catch(error){
        console.log(error.message)
        res.stauts(500).json({message:"error craeteing policy",error:error.message})
    }
}

// getting policies

export const getAllPolicies=async(req,res)=>{
    try{
        const result=await pool.query("SELECT * FROM policies ORDER BY id ASC")
        res.status(200).json(result.rows)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:"error fetching policies",error:error.message})
    }
}

// getting policy by id

export const getPolicyById=async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
        const result=await pool.query("SELECT * FROM policies WHERE id= $1",[id])

        if(result.rows.length=== 0 ) return res.status(404).json({message:"policy not founded"})
            res.status(200).json(result.rows[0])
    }catch(error){
        console.log(error.message)
        res.status(500).json({message:"error fetching policy", error: error.message})
    }
}

// update policy
export const updatePolicy=async(req,res)=>{
    try{
        const id=parseInt(req.params.id)
        const {policy_number, type, coverage, premium, start_date, end_date, status}=req.body

        const result=await pool.query(
            `UPDATE policies SET policy_number=$1, type=$2, coverage=$3, premium=$4, start_date=$5, end_date=$6, 
            status=$7 WHERE id=$8 RETURNING *`,
            [policy_number, type, coverage, premium, start_date,end_date, status, id]
        )

        if (result.rows.length ===0) return res.status(404).json({mesage:"policy not found"})

            res.status(200).json(result.rows[0])
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"policy updated succewssfully",err:err.message})
    }
}

// delete policy

export const deletePolicy=async(req,res)=>{
    try{
        const id=parseInt(req.params.id)

        const result=await pool.query('DELETE FROM policies WHERE id=$1 RETURNING *',[id])

        if (result.rows.length ===0) return res.status(404).json({message:"plicy not found"})

            res.status(200).json({message:"policy deleted successfully"})
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"error deleting message",err:err.message})
    }
}