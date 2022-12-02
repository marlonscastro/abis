import { MockProxy, mock } from 'jest-mock-extended'

import { BuscaRGController } from "@/data/controllers/civil"
import { BuscaRG } from "@/data/use-cases/civil"
import { Cidadao } from '@/domain/models/cidadao'
import { ServerError } from '@/data/errors'


describe("Controller BuscaRG", () => {
  let sut: BuscaRGController
  let buscaRG: MockProxy<BuscaRG>
  let error = new Error("Fake Error")

  beforeEach(() => {
    buscaRG = mock()
    sut = new BuscaRGController(buscaRG)
  })

  it("Deve retornar 404 ao não encontrar nenhum dado", async () => {
    buscaRG.execute.mockResolvedValue([])

    const result = await sut.perform({ v_iRG: 'invalid RG' })

    expect(buscaRG.execute).toHaveBeenCalledTimes(1)
    expect(buscaRG.execute).toHaveBeenCalledWith('invalid RG')
    expect(result.statusCode).toBe(404)
  })

  it("Deve retornar 200 quando a requisição for um sucesso", async () => {
    const mockResolvedValue: Cidadao[] = [{ NUMEROPESSOA: '610406', NOME: 'Jonas Gabriel Neves da Silva', PAI: 'João Maria da Silva', MAE: 'Roseangela Maria das Neves Silva', CPF: '11030869448', NASCIMENTOAPROXIMADO: '06/07/1992', RGATRIBUIDO: '7620643', NUMEROPEDIDO: '5948131' }] as Cidadao[]
    buscaRG.execute.mockResolvedValue(mockResolvedValue)

    const result = await sut.perform({ v_iRG: 'valid RG' })

    expect(buscaRG.execute).toHaveBeenCalledTimes(1)
    expect(buscaRG.execute).toHaveBeenCalledWith('valid RG')
    expect(result.statusCode).toBe(200)

  })

  it("Deve retornar 500 ao retornar erro desconhecido", async () => {
    buscaRG.execute.mockRejectedValue(error)

    const result = await sut.perform({ v_iRG: 'any RG' })

    expect(buscaRG.execute).toHaveBeenCalledTimes(1)
    expect(buscaRG.execute).toHaveBeenCalledWith('any RG')
    expect(result.data).toBeInstanceOf(ServerError)
  })
})

