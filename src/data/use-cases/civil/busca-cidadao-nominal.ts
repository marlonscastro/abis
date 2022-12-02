import { Cidadao } from "@/domain/models/cidadao";
import { BuscaCidadaoNominalUseCase } from "@/domain/use-cases/civil/busca-cidadao-nominal";
import { ViewBuscarCidadao } from "@/view/cidadao";
import { Repository } from "@/data/protocols/repository";
import { padronizaAtributos } from '@/data/utils'

export class BuscaCidadaoNominal implements BuscaCidadaoNominalUseCase {
    constructor(private readonly repository: Repository) { }

    execute = async (params: any): Promise<ViewBuscarCidadao[]> => {
        const data: Cidadao[] = await this.repository.buscaCidadaoNominal(params)
        return padronizaAtributos(data)
    }
}

