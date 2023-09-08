import { DataSource } from "typeorm";
import { Stay } from "../../entities/Stay";

import logger from "../../utils/winston";
import { User } from "../../entities/User";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

export const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Stay, User],
  subscribers: [],
  migrations: [],
});

const db = async () => {
  try {
    await dataSource.initialize();
    logger.info("Connection to database has been initialized");
  } catch (err) {
    logger.error("Error while connecting to database : " + err);
  }
};

export default db;
