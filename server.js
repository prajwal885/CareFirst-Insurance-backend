import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import policyRoutes from "./routes/policyRoutes.js"
import agentsRoutes from "./routes/agentRoutes.js"
import transctionRoutes from "./routes/transctionRoutes.js"
import locationRoutes  from "./routes/locationRoutes.js"
import claimRoutes from "./routes/claimRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/policies",policyRoutes)
app.use("/api/agents",agentsRoutes)
app.use("/api/transactions", transctionRoutes);
app.use("/api/locations",locationRoutes)
app.use("api/claim",claimRoutes)

app.listen(5000, () => console.log("Server running on port 5000"));



