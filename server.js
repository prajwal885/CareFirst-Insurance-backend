import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db.js"; 
import userRoutes from "./routes/userRoutes.js";
import policyRoutes from "./routes/policyRoutes.js"
import agentsRoutes from "./routes/agentRoutes.js"
import transctionRoutes from "./routes/transctionRoutes.js"
import locationRoutes  from "./routes/locationRoutes.js"
import claimRoutes from "./routes/claimRoutes.js"
import rolesRoutes from "./routes/rolesRoutes.js"
import feedBackRoutes from "./routes/feedBackRoutes.js"
import filesRoutes from "./routes/filesRoutes.js"
import  mailRoutes from "./routes/mailRoutes.js"


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/policies",policyRoutes)
app.use("/api/agents",agentsRoutes)
app.use("/api/transactions", transctionRoutes);
app.use("/api/locations",locationRoutes)
app.use("/api/claim",claimRoutes)
app.use("/api", rolesRoutes)
app.use("/api",feedBackRoutes)
app.use("/uploads", express.static("uploads"))
app.use("/api/files", filesRoutes)
app.use("/api",mailRoutes)


app.listen(5000, () => console.log("Server running on port 5000"));



