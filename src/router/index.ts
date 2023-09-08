import express from "express";

import stayRoutes from "./routes/stay.router";
import authRoutes from "./routes/auth.router";

const router = express.Router();
router.use("/auth", authRoutes);
router.use("/stay", stayRoutes);

export default router;
