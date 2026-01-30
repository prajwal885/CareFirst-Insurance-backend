import {pool} from "../config/db.js"



// fetch all roles
export const fetchAllRoles=async()=>{
try{
    const result=await pool.query(
        `SELECT id, name ,permissions FROM roles ORDER BY name`
    )
    return result.rows
}catch (err) {
    console.error("updateRoleById error:", err);
    throw err; 
  }
}

// fetch role by id
export const fetchRoleById=async(id)=>{
    try{
        const result=await pool.query(
            `SELECT id, name, permissions FROM roles WHERE id=$1`,[id]
        )
        return result.rows[0]
    }catch (err) {
    console.error("updateRoleById error:", err);
    throw err; 
  }
}

// update role by id

export const updateRoleById=async(id,data)=>{
    try{
    const {name, permissions}=data
        const result= await pool.query(
`UPDATE roles
SET name=$1,
permissions=$2
WHERE id=$3
RETURNING *`,
[name,permissions,id]
        )
        return result.rows[0]
    }catch (err) {
    console.error("updateRoleById error:", err);
    throw err; 
  }

}