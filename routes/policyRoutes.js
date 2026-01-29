import express from "express";
import {
  createPolicy,
  getAllPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy
} from "../controllers/policyController.js";

import cacheMiddleware from "../middleware/cache.middleware.js";

const router = express.Router();

router.get(
  "/",
  cacheMiddleware(() => "policies:all"),
  getAllPolicies
);

router.get(
  "/:id",
  cacheMiddleware((req) => `policies:${req.params.id}`),
  getPolicyById
);

router.post("/", createPolicy);
router.put("/:id", updatePolicy);
router.delete("/:id", deletePolicy);

export default router;
