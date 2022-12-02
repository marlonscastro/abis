import { Cidadao } from "@/domain/models/cidadao";
import { BuscaCidadaoNominalCriminalUseCase } from "@/domain/use-cases/criminal/busca-cidadao-nominal";
import { ViewBuscarCidadao } from "@/view/cidadao";
import { Repository } from "@/data/protocols/repository";
import { padronizaAtributos } from "@/data/utils";
export class BuscaCidadaoNominalCriminal implements BuscaCidadaoNominalCriminalUseCase {
  constructor(private readonly repository: Repository) { }

  execute = async (params: any): Promise<ViewBuscarCidadao[]> => {
    const data: Cidadao[] = await this.repository.buscaCidadaoNominalCriminal(params)
    return padronizaAtributos(data)
  }
}

