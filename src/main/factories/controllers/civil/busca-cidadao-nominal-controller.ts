import { BuscaCidadaoNominalController, Controller } from "@/data/controllers/civil";
import { makeRepository } from "@/main/factories/repositories/oracle-repository";
import { BuscaCidadaoNominal } from "@/data/use-cases/civil";

export const makeBuscaCidadaoNominalController = (): Controller => new BuscaCidadaoNominalController(new BuscaCidadaoNominal(makeRepository()))