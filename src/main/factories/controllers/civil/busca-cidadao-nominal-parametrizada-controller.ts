import { BuscaCidadaoNominalParametrizadaController, Controller } from "@/data/controllers/civil";
import { makeRepository } from "@/main/factories/repositories/oracle-repository";
import { BuscaCidadaoNominalParametrizada } from "@/data/use-cases/civil";

export const makeBuscaCidadaoNominalParametrizadaController = (): Controller => new BuscaCidadaoNominalParametrizadaController(new BuscaCidadaoNominalParametrizada(makeRepository()))