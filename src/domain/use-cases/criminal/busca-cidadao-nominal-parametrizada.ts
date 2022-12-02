import { ResultBuscaParametrizada } from "@/view/cidadao";

export interface BuscaCidadaoNominalCriminalParametrizadaUseCase {
    execute: (params: any) => Promise<ResultBuscaParametrizada>
}