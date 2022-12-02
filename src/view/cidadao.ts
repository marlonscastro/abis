/**
 * As Views Civil e Criminal podem ser representadas pelo mesmo tipo, pois a única diferença é o RC 
 */

export type ViewBuscarCidadao =   {
    TipoApresentacao?: string
    NumeroApresentacao?: string
    NumeroPessoa: string
    Nome: string
    NascimentoAproximado?: string
    RGAtribuido?: string
    RC?: string  
    Identificacao_CPF?: string
    Mae: string
    Pai: string
    NumeroPedido: string
    Total?: number
  }

export type ResultBuscaParametrizada  = {
  total: number,
  registros: ViewBuscarCidadao[]
}