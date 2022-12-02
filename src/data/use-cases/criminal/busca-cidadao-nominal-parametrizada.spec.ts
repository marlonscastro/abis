import { Repository } from "@/data/protocols/repository"
import { Cidadao } from "@/domain/models/cidadao"
import { mock, MockProxy } from "jest-mock-extended"
import { BuscaCidadaoNominalCriminalParametrizada } from "./busca-cidadao-nominal-parametrizada"

describe('Use Case - Busca Cidadao Nominal (Criminal) Parametrizada', () => {
  let repository: MockProxy<Repository>
  let sut: BuscaCidadaoNominalCriminalParametrizada
  let resultRepo: Cidadao[] = [{ NUMEROAPRESENTACAO: 1648526, NUMEROPESSOA: 16422221, NOME: 'Nome', NASCIMENTOAPROXIMADO: '1992-07-06T03:00:00.000Z', RGATRIBUIDO: '1648526', IDENTIFICACAO_CPF: 11030869448, MAE: 'Nome Mãe', PAI: 'Nome Pai', NUMEROPEDIDO: 16487715 }] as unknown as Cidadao[]
  let resultExpected = { total: 0, registros: [{ NumeroPessoa: '16422221', NumeroPedido: '16487715', Nome: 'Nome', Mae: 'Nome Mãe', Pai: 'Nome Pai' }]}
  let error = new Error('Fale Database Error')

  beforeEach(() => {
    repository = mock()
    sut = new BuscaCidadaoNominalCriminalParametrizada(repository)
  })

  it('Deve retornar um resultado válido passando um nome valido', async () => {
    repository.buscaCidadaoNominalCriminalParametrizada.mockResolvedValue(resultRepo)

    const result = sut.execute({ v_sNome: 'any valid name'})

    await expect(result).resolves.toEqual(resultExpected)
  })

  it('Deve retornar array vazio quando passar um Nome invalido ou Não existente', async () => {
    repository.buscaCidadaoNominalCriminalParametrizada.mockResolvedValue([])

    const result = sut.execute({ v_sNome: 'invalid ou inexistent name'})

    await expect(result).resolves.toBeNull()
  })

  it('Deve lançar uma exceção ao ocorrer erro no repositório', async () => {
    repository.buscaCidadaoNominalCriminalParametrizada.mockRejectedValue(error)

    const result = sut.execute({ v_sNome: 'any name'})

    await expect(result).rejects.toThrowError()
  })
})