import { padronizaAtributos } from './padronizaAtributos'
import { Cidadao } from '@/domain/models/cidadao'

describe('Utils', () => {
  let param: Cidadao[] = [{ NUMEROPEDIDO: '226889483', NUMEROPESSOA: '3194233', NOME: 'Nome', PAI: 'Nome do Pai', MAE: 'Nome da Mae' }] as Cidadao[]
  let resPadronizados = [{ NumeroPessoa: '3194233', NumeroPedido: '226889483', Nome: 'Nome', Mae: 'Nome da Mae', Pai: 'Nome do Pai', Total: 0 }]

  it('Deve restornar atributos das consultas padronizados', () => {
    const result = padronizaAtributos(param)
    expect(result).toEqual(resPadronizados)
  })

  it('Deve retornar array vazio quando enviar array de cidadao vazio', () => {
    const result = padronizaAtributos([])
    expect(result).toEqual([])
  })
})