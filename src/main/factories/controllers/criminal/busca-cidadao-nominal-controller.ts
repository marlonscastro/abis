import { Controller, BuscaCidadaoNominalCriminalController } from "@/data/controllers/criminal";
import { makeRepository } from "@/main/factories/repositories/oracle-repository";
import { BuscaCidadaoNominalCriminal } from "@/data/use-cases/criminal";

export const makeBuscaCidadaoNominalCriminalController = (): Controller => new BuscaCidadaoNominalCriminalController(new BuscaCidadaoNominalCriminal(makeRepository()))