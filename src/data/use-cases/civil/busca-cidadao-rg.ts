import { Cidadao } from "@/domain/models/cidadao";
import { BuscaCidadaoRGUseCase } from "@/domain/use-cases/civil";
import { ViewBuscarCidadao } from "@/view/cidadao";
import { Repository } from "@/data/protocols/repository";
import { padronizaAtributos } from '@/data/utils'
export class BuscaCidadaoRG implements BuscaCidadaoRGUseCase {
    constructor (private readonly repository: Repository){}

    execute = async (rg: string): Promise<ViewBuscarCidadao[]> => {
        const data: Cidadao[] = await this.repository.buscaCidadaoRg(rg)
        return padronizaAtributos(data) 
        
    } 
}

