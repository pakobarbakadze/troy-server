import { Stay } from "../entities/Stay";
import { dataSource } from "../config/db/data-source";
import { Request, Response } from "express";
import logger from "../utils/winston";

const stayRepository = dataSource.getRepository(Stay);

const getStays = async (req: Request, res: Response) => {
  logger.debug("Getting stays");

  try {
    const stays = await stayRepository.find({});

    logger.debug("Stays has been sent");
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
    logger.debug("Stay has been saved");
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
