import { Cidadao } from "@/domain/models/cidadao"
import { ViewBuscarCidadao } from "@/view/cidadao"

export const padronizaAtributos = (arrCidadao: Cidadao[]): ViewBuscarCidadao[] => {
  let arrView: ViewBuscarCidadao[] = []
  arrCidadao.forEach(item => {
    let newItem: ViewBuscarCidadao = {
      NumeroPessoa: String(item.NUMEROPESSOA),
      NumeroPedido: String(item.NUMEROPEDIDO),
      Nome: item.NOME,
      Mae: item.MAE,
      Pai: item.PAI,
      Total: item.TOTAL || 0
    }
    // if (item.NUMEROPESSOA) newItem.NumeroPessoa = String(item.NUMEROPESSOA)
    // if (item.NUMEROPEDIDO) newItem.NumeroPedido = String(item.NUMEROPEDIDO)
    // if (item.NOME) newItem.Nome = item.NOME
    // if (item.MAE) newItem.Mae = item.MAE
    // if (item.PAI) newItem.Pai = item.PAI
    // if (item.TOTAL) newItem.Total = item.TOTAL; else newItem.Total = 0
    arrView.push(newItem)
  })
  return arrView
}