import { Cidadao } from "@/domain/models/cidadao";
import { BuscaCidadaoNominalCriminalParametrizadaUseCase } from "@/domain/use-cases/criminal/busca-cidadao-nominal-parametrizada";
import { ResultBuscaParametrizada } from "@/view/cidadao";
import { Repository } from "@/data/protocols/repository";
import { padronizaAtributos } from "@/data/utils";

export class BuscaCidadaoNominalCriminalParametrizada implements BuscaCidadaoNominalCriminalParametrizadaUseCase {
    constructor(private readonly repository: Repository) { }

    execute = async (params: any): Promise<ResultBuscaParametrizada> => {
        let result: ResultBuscaParametrizada = null
        const data: Cidadao[] = await this.repository.buscaCidadaoNominalCriminalParametrizada(params)
        if (data.length !== 0) {
            const res = padronizaAtributos(data)
            if (res.length !== 0) {
                result = {
                    total: res[0].Total,
                    registros: res.filter(i => delete i.Total)
                }
            }
        }
        
        return result
    }
}

