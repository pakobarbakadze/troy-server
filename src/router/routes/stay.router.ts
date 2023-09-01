import express from "express";
const router = express.Router();
import controller from "../../controllers/stay.controller";

router.get("/", controller.getStays);
router.post("/", controller.saveStay);

export default router;
