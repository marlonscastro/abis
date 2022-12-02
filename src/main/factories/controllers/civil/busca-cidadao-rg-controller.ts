import { BuscaCidadaoRGController, Controller } from "@/data/controllers/civil";
import { BuscaCidadaoRG } from "@/data/use-cases/civil";
import { makeRepository } from "@/main/factories/repositories/oracle-repository";

export const makeBuscaCidadaoRGController = (): Controller => new BuscaCidadaoRGController(new BuscaCidadaoRG(makeRepository()))