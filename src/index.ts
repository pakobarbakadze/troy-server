import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

import db from "./config/db/data-source";
import logger from "./utils/winston";

import router from "./router";

const app = express();
db();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
