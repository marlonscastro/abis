import { ViewBuscarCidadao } from "@/view/cidadao";

export interface BuscaCidadaoNominalUseCase {
    execute: (params: any) => Promise<ViewBuscarCidadao[]>
}