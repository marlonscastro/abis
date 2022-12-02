import { Repository } from "@/data/protocols/repository"
import { Cidadao } from "@/domain/models/cidadao"
import { mock, MockProxy } from "jest-mock-extended"
import { BuscaCidadaoNominal } from "./busca-cidadao-nominal"

describe('Use Case - Busca Cidadao Nominal (Civil)', () => {
  let repository: MockProxy<Repository>
  let sut: BuscaCidadaoNominal
  let resultRepo: Cidadao[] = [{ NUMEROAPRESENTACAO: 1648526, NUMEROPESSOA: 16422221, NOME: 'Nome', NASCIMENTOAPROXIMADO: '1992-07-06T03:00:00.000Z', RGATRIBUIDO: '1648526', IDENTIFICACAO_CPF: 11030869448, MAE: 'Nome Mãe', PAI: 'Nome Pai', NUMEROPEDIDO: 16487715 }] as unknown as Cidadao[]
  let resultExpected = [{ NumeroPessoa: '16422221', NumeroPedido: '16487715', Nome: 'Nome', Mae: 'Nome Mãe', Pai: 'Nome Pai', Total: 0 }]
  let error = new Error('Fale Database Error')

  beforeEach(() => {
    repository = mock()
    sut = new BuscaCidadaoNominal(repository)
  })

  it('Deve retornar um resultado válido passando um nome valido', async () => {
    repository.buscaCidadaoNominal.mockResolvedValue(resultRepo)

    const result = sut.execute({ v_sNome: 'any valid name'})

    await expect(result).resolves.toEqual(resultExpected)
  })

  it('Deve retornar array vazio quando passar um Nome invalido ou Não existente', async () => {
    repository.buscaCidadaoNominal.mockResolvedValue([])

    const result = sut.execute({ v_sNome: 'invalid ou inexistent name'})

    await expect(result).resolves.toEqual([])
  })

  it('Deve lançar uma exceção ao ocorrer erro no repositório', async () => {
    repository.buscaCidadaoNominal.mockRejectedValue(error)

    const result = sut.execute({ v_sNome: 'any name'})

    await expect(result).rejects.toThrowError()
  })
})