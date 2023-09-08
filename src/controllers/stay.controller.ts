import { Request, Response } from "express";

import { Stay } from "../entities/Stay";
import { dataSource } from "../config/db/data-source";

import logger from "../utils/winston";

const stayRepository = dataSource.getRepository(Stay);

const getStays = async (req: Request, res: Response) => {
  logger.debug("Getting stays");

  try {
    const stays = await stayRepository.find({});

    logger.debug("Sent stays");
    res.status(200).json(stays);
  } catch (err) {
    logger.error("Error has occured while sending stays : " + err);
    res.status(400).json({ message: "Error has occured while sending stays" });
  }
};

const saveStay = async (req: Request, res: Response) => {
  logger.debug("Saving stay");

  const stay: Stay = req.body;

  try {
    await stayRepository.save(stay);

    logger.debug("Saved stay");
    res.status(201).send();
  } catch (err) {
    logger.error("Error has occured while saving stay : " + err);
    res.status(400).json({ message: "Error has occured while saving stay" });
  }
};

export default {
  getStays,
  saveStay,
};
