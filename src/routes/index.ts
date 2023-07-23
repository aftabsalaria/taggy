import express from "express";
import fileRoutes from "./file.js";

const router = express.Router();

// File routes
router.use("/generator", fileRoutes);

export default router;
