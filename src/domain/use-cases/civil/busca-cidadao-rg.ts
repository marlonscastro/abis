import { ViewBuscarCidadao } from "@/view/cidadao";

export interface BuscaCidadaoRGUseCase {
    execute: (rg: string) => Promise<ViewBuscarCidadao[]>
}