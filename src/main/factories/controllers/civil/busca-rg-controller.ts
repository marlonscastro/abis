import { BuscaRGController, Controller } from "@/data/controllers/civil";
import { BuscaRG } from "@/data/use-cases/civil";
import { makeRepository } from "@/main/factories/repositories/oracle-repository";

export const makeBuscaRGController = (): Controller => new BuscaRGController(new BuscaRG(makeRepository()))