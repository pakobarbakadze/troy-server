import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { User } from "../entities/User";
import { dataSource } from "../config/db/data-source";

import logger from "../utils/winston";
import {
  loginValidation,
  registerValidation,
} from "../validations/auth.validation";

const userRepository = dataSource.getRepository(User);

const login = async (req: Request, res: Response) => {
  logger.debug("Logging user in");

  const { email, password } = req.body;

  try {
    const message = loginValidation(req.body);
    if (message) throw message;

    const user = await userRepository.findOne({ where: { email } });
    if (!user) throw "User doesnt exist";

    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) throw "Invalid password";

    const token = user.generateToken();

    logger.debug("Logged user in");
    res.status(201).json({ user, token });
  } catch (err) {
    logger.error("Error has occured while logging user in : " + err);
    res.status(400).json({ message: err });
  }
};

const register = async (req: Request, res: Response) => {
  logger.debug("Registering user");

  const user: User = req.body;

  try {
    const message = registerValidation(user);
    if (message) throw new Error(message);

    await userRepository.save(userRepository.create(user));

    logger.debug("Registered user");
    res.status(201).send();
  } catch (err) {
    logger.error("Error has occured while registering user : " + err);
    res
      .status(400)
      .json({ message: "Error has occured while registering user" });
  }
};

export default { login, register };
