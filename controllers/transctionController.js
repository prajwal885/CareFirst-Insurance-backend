import { pool } from "../config/db.js";

// 21. Process Payment
export const processPayment = async (req, res) => {
  const { transactionNumber, policyId, amount } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO transactions 
       (transactionNumber, policyId, amount, type) 
       VALUES ($1, $2, $3, 'payment') 
       RETURNING *`,
      [transactionNumber, policyId, amount]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 22. Process Refund
export const processRefund = async (req, res) => {
  const { transactionNumber, policyId, amount } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO transactions 
       (transactionNumber, policyId, amount, type) 
       VALUES ($1, $2, $3, 'refund') 
       RETURNING *`,
      [transactionNumber, policyId, amount]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 23. Get All Transactions
export const  getAllTransactions = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions ORDER BY timestamp DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 24. Get Transaction by ID
export const  getTransactionById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE _id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 25. Update Transaction
export const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, type } = req.body;

  try {
    const result = await pool.query(
      `UPDATE transactions 
       SET amount = $1, type = $2 
       WHERE _id = $3 
       RETURNING *`,
      [amount, type, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 26. Delete Transaction
export const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM transactions WHERE _id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
