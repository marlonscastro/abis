import { Cidadao } from "@/domain/models/cidadao";

export interface BuscaRGUseCase {
    execute: (rg: string) => Promise<Cidadao[]>
}