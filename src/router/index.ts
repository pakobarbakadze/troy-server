import express from "express";
const router = express.Router();

import stayRoutes from "./routes/stay.router";

router.use("/stay", stayRoutes);

export default router;
