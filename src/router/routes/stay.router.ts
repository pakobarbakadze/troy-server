import express from "express";

import controller from "../../controllers/stay.controller";

const router = express.Router();
router.get("/", controller.getStays);
router.post("/", controller.saveStay);

export default router;
