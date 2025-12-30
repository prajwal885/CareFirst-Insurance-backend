import {pool} from "../config/db.js"

// add agent
export const addAgent=async(req,res)=>{
    try{
        const {agent_number, name, contact_phone, contact_email, 
            territory} = req.body
            
            const result=await pool.query(
                `INSERT INTO agents(agent_number, name, contact_phone, contact_email, 
            territory) 
            VALUES($1,$2,$3,$4,$5) RETURNING *`,
            [agent_number, name, contact_phone, contact_email, 
           territory]
            )

            res.status(201).json(result.rows[0])
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

// get all agents

export const getAllAgents=async(req,res)=>{
    try{
        const result=await pool.query(
            `SELECT * FROM agents ORDER BY created_at DESC` 
        )
        res.json(result.rows)
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

// get agent by id

export const getAgetById=async(req,res)=>{
    try{
        const result=await pool.query(
            `SELECT * FROM agents WHERE id=$1`,
            [req.params.id]
        )
        if(result.rows.length===0){
            return res.status(404).json({message:"Agent not found"})
        }
        res.json(result.rows[0])
    }catch(err){
        res.staus(500).json({meaage:err.message})
    }
}

// update agent

export const updateAgent=async(req,res)=>{
    try{
        const{name, contact_email, contact_phone,territory}=req.body

        const result= await pool.query(
            `UPDATE agents
            SET name=$1,
            contact_email=$2,
            contact_phone=$3,
           territory=$4
          WHERE id=$5
            RETURNING *`,
            [ name, contact_phone, contact_email, 
           territory, req.params.id]
        )
        res.json(result.rows[0])
    }catch(err){
    res.status(500).json({message:err.message})
    }
}


// delete agent

export const deleteAgent=async(req,res)=>{
    try{
        await pool.query(
            `DELETE FROM agents WHERE id=$1`,
            [req.params.id]
        )
        res.json({message:"Agent deleted successfully"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}