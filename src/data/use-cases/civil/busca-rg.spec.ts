import { Repository } from "@/data/protocols/repository"
import { Cidadao } from "@/domain/models/cidadao"
import { mock, MockProxy } from "jest-mock-extended"
import { BuscaRG } from "./busca-rg"

describe('Use Case - Busca Por RG (Civil)', () => {
  let repository: MockProxy<Repository>
  let sut: BuscaRG
  let resultExpected: Cidadao[] = [{ NUMEROPESSOA: '16485', NOME: 'Nome', PAI: 'Nome Pai', MAE: 'Nome Mae', CPF: '01548515844', NASCIMENTOAPROXIMADO: '09/10/1994', RGATRIBUIDO: '123456', NUMEROPEDIDO: '3216548' }] as Cidadao[]
  let error = new Error('Fale Database Error')

  beforeEach(() => {
    repository = mock()
    sut = new BuscaRG(repository)
  })

  it('Deve retornar um resultado válido passando um rg valido', async () => {
    repository.buscaRg.mockResolvedValue(resultExpected)

    const result = sut.execute('123456')

    await expect(result).resolves.toEqual(resultExpected)
  })

  it('Deve retornar array vazio quando passar um RG invalido ou Não existente', async () => {
    repository.buscaRg.mockResolvedValue([])

    const result = sut.execute('invalid RG')

    await expect(result).resolves.toEqual([])
  })

  it('Deve lançar uma exceção ao ocorrer erro no repositório', async () => {
    repository.buscaRg.mockRejectedValue(error)

    const result = sut.execute('315485')

    await expect(result).rejects.toThrowError()
  })
})
