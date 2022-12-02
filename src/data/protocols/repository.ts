import { Cidadao } from "@/domain/models/cidadao"

export interface Repository {
    buscaRg: (rg: string) => Promise<Cidadao[]>
    buscaCidadaoRg: (rg: string) => Promise<Cidadao[]>
    buscaCidadaoNominal: (param: any) => Promise<Cidadao[]>
    buscaCidadaoNominalParametrizada: (param: any) => Promise<Cidadao[]>
    buscaCidadaoNominalCriminal: (param: any) => Promise<Cidadao[]>
    buscaCidadaoNominalCriminalParametrizada: (param: any) => Promise<Cidadao[]>
}