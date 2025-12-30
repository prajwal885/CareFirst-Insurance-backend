import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
  getUserRole,
  updateUserRole,
  deleteUser
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, getProfile);
router.put("/updateProfile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

router.get("/role", protect, getUserRole);
router.put("/updateRole", protect, adminOnly, updateUserRole);

router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
