import OracleRepository from "@/infra/repository/oracle";
import { Repository } from "@/data/protocols/repository";
import Helper from "@/infra/repository/oracle/helper";
import Driver from "@/infra/repository/oracle/driver";

const driver = new Driver()

export const makeRepository = (): Repository => new OracleRepository(driver, new Helper(driver))