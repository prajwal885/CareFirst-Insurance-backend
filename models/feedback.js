import { pool } from "../config/db.js";

// Get all feedback
export const getAllFeedBack = async () => {
  const result = await pool.query(
    `SELECT id, user_id, details, rating, created_at
     FROM feedback
     ORDER BY created_at DESC`
  );

  return result.rows;
};

// Get feedback by ID
export const getFeedBackById = async (id) => {
  const result = await pool.query(
    `SELECT id, user_id, details, rating, created_at
     FROM feedback
     WHERE id=$1`,
    [id]
  );

  return result.rows[0];
};

// Create feedback
export const createFeedback = async ({ userId, details, rating }) => {
  const result = await pool.query(
    `INSERT INTO feedback(user_id, details, rating)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [userId, details, rating]
  );

  return result.rows[0];
};

// Update feedback
export const updateFeedBack = async (id, { details, rating }) => {
  const result = await pool.query(
    `UPDATE feedback
     SET details=$1,
         rating=$2
     WHERE id=$3
     RETURNING *`,
    [details, rating, id]
  );

  return result.rows[0];
};

// Delete feedback
export const deleteFeedBack = async (id) => {
  const result = await pool.query(
    `DELETE FROM feedback
     WHERE id=$1
     RETURNING *`,
    [id]
  );

  return result.rows[0];
};