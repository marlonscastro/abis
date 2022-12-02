import { ServerError } from "@/data/errors"
import { BuscaCidadaoRG } from "@/data/use-cases/civil"
import { ViewBuscarCidadao } from "@/view/cidadao"
import { mock, MockProxy } from "jest-mock-extended"
import { BuscaCidadaoRGController } from "./busca-cidadao-rg"

describe("Controller BuscaCidadaoRG", () => {
  let sut: BuscaCidadaoRGController
  let buscaCidadaoRG: MockProxy<BuscaCidadaoRG>
  let error = new Error("Fake Error")

  beforeEach(() => {
    buscaCidadaoRG = mock()
    sut = new BuscaCidadaoRGController(buscaCidadaoRG)
  })

  it("Deve retornar 404 ao não encontrar nenhum dado", async () => {
    buscaCidadaoRG.execute.mockResolvedValue([])

    const result = await sut.perform({ v_iRG: 'invalid RG' })

    expect(buscaCidadaoRG.execute).toHaveBeenCalledTimes(1)
    expect(buscaCidadaoRG.execute).toHaveBeenCalledWith('invalid RG')
    expect(result.statusCode).toBe(404)
  })

  it("Deve retornar 200 quando a requisição for um sucesso", async () => {
    const mockResolvedValue: ViewBuscarCidadao[] = [{ NumeroPessoa: '610406', NumeroPedido: '5380965', Nome: 'Jonas Gabriel Neves da Silva', Mae: 'Roseangela Maria das Neves Silva', Pai: 'João Maria da Silva', Total: 0 }] as ViewBuscarCidadao[]
    buscaCidadaoRG.execute.mockResolvedValue(mockResolvedValue)

    const result = await sut.perform({ v_iRG: 'valid RG' })

    expect(buscaCidadaoRG.execute).toHaveBeenCalledTimes(1)
    expect(buscaCidadaoRG.execute).toHaveBeenCalledWith('valid RG')
    expect(result.statusCode).toBe(200)

  })

  it("Deve retornar 500 ao retornar erro desconhecido", async () => {
    buscaCidadaoRG.execute.mockRejectedValue(error)

    const result = await sut.perform({ v_iRG: 'any RG' })

    expect(buscaCidadaoRG.execute).toHaveBeenCalledTimes(1)
    expect(buscaCidadaoRG.execute).toHaveBeenCalledWith('any RG')
    expect(result.data).toBeInstanceOf(ServerError)
  })
})
