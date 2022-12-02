import { BuscaCidadaoNominalCriminalParametrizadaController, Controller } from "@/data/controllers/criminal";
import { makeRepository } from "@/main/factories/repositories/oracle-repository";
import { BuscaCidadaoNominalCriminalParametrizada } from "@/data/use-cases/criminal";

export const makeBuscaCidadaoNominalCriminalParametrizadaController = (): Controller => new BuscaCidadaoNominalCriminalParametrizadaController(new BuscaCidadaoNominalCriminalParametrizada(makeRepository()))