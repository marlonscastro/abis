import { ResultBuscaParametrizada } from "@/view/cidadao";

export interface BuscaCidadaoNominalParametrizadaUseCase {
    execute: (params: any) => Promise<ResultBuscaParametrizada>
}