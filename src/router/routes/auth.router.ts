import express from "express";

import controller from "../../controllers/auth.controller";

const router = express.Router();
router.post("/login", controller.login);
router.post("/register", controller.register);

export default router;
