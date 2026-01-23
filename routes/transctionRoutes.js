import express from "express"

import  {
processPayment,
processRefund,
getAllTransactions,
getTransactionById,
updateTransaction,
deleteTransaction
}
from "../controllers/transctionController.js";
const router = express.Router();

router.post("/payment", processPayment);           // 21
router.post("/refund", processRefund);             // 22
router.get("/", getAllTransactions);               // 23
router.get("/:id", getTransactionById);            // 24
router.put("/:id", updateTransaction);             // 25
router.delete("/:id", deleteTransaction);          // 26

export default router;
