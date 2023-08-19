import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import logger from "./utils/winston";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// app.use("/api");

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
