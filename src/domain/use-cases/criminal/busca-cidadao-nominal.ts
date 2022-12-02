import { ViewBuscarCidadao } from "@/view/cidadao";

export interface BuscaCidadaoNominalCriminalUseCase {
    execute: (params: any) => Promise<ViewBuscarCidadao[]>
}