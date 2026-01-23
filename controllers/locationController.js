import {pool} from "../config/db.js"

// add location

export const addLocation=async(req,res)=>{
    try{
const {country, state, city, zipcode,latitude, longitude}=req.body
const result = await pool.query(
    `INSERT INTO locations(
    country,state,city,zipcode,latitude,longitude)
    VALUES($1,$2,$3,$4,$5,$6)
    RETURNING *`,
    [country,state,city,zipcode,latitude,longitude]
)
res.status(201).json(result.rows[0])
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

// get all location

export const getAllLocation=async(req,res)=>{
    try{
        const result=await pool.query(
            `SELECT * FROM locations ORDER BY created_at DESC`
        )
        res.status(200).json(result.rows[0])
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

// get location by id

export const getLocationById=async(req,res)=>{
    try{
        const {id}=req.params
        const result = await pool.query(
            `SELECT * FROM locations WHERE id=$1`,
            [id]
        )
        if(result.rows.length==0){
            return res.status(404).json({message:"location not found"})
        }
        res.status(200).json(result.rows)

    }catch(err){
        res.status(404).json({message:err.message})
    }
}

 // update by id

 export const updateLocationById=async(req,res)=>{
    try{
        const {id}=req.params
        const {country, state, city, zipcode,latitude,longitude}=req.body
        const result = await pool.query(
            `UPDATE locations SET
            country=$1,
            state=$2,
            city=$3,
            zipcode=$4,
            latitude=$5,
            longitude=$6,
            updated_at = CURRENT_TIMESTAMP,
            WHERE id=$7
            RETURNING *`,
            [country, state, city, zipcode, latitude, longitude,id]
        )
        if(result.rows.length==0){
            return res.status(404).json({message:"location not found"})
        }
        res.status(200).json(result.rows[0])
    }catch(err){
        res.status(400).json({message:err.message})
    }
 }

 // delete location

 export const deleteLocation=async(req,res)=>{
    try{
        const {id}=req.params
        const result = await pool.query(
            `DELETE FROM locations WHERE id=$1 RETURNING *`,
            [id]
        )
        if(result.rows.length==0){
            return res.status(404).json({message:"location not found "})
        }
        res.status(200).json({message:"deleted successfully"})
    }catch(err){
        res.status(400).json({message:err.message})
    }
 }