import { Cidadao } from "@/domain/models/cidadao";
import { BuscaRGUseCase } from "@/domain/use-cases/civil/busca-rg";
import { Repository } from "@/data/protocols/repository";
export class BuscaRG implements BuscaRGUseCase {
    constructor (private readonly repository: Repository){}

    execute = async (rg: string): Promise<Cidadao[]> => {
        return await this.repository.buscaRg(rg)
    } 
}

