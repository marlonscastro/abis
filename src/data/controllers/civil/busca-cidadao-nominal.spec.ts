import { ServerError } from "@/data/errors"
import { BuscaCidadaoNominal } from "@/data/use-cases/civil"
import { mock, MockProxy } from "jest-mock-extended"
import { BuscaCidadaoNominalController } from "./busca-cidadao-nominal"

describe("Controller BuscaCidadaoNominal (Civil)", () => {
  let sut: BuscaCidadaoNominalController
  let buscaCidadaoNominal: MockProxy<BuscaCidadaoNominal>
  let error = new Error("Fake Error")

  beforeEach(() => {
    buscaCidadaoNominal = mock()
    sut = new BuscaCidadaoNominalController(buscaCidadaoNominal)
  })

  it("Deve retornar 404 ao não encontrar nenhum dado", async () => {
    buscaCidadaoNominal.execute.mockResolvedValue([])
    const params = { v_sNome: 'Nome' }

    const result = await sut.perform(params)

    expect(buscaCidadaoNominal.execute).toHaveBeenCalledTimes(1)
    expect(buscaCidadaoNominal.execute).toHaveBeenCalledWith(params)
    expect(result.statusCode).toBe(404)
  })

  it("Deve retornar 400 caso não envie nenhum parametro", async () => {
    buscaCidadaoNominal.execute.mockResolvedValue([])
    const params = {}
    const result = await sut.perform(params)

    expect(result.statusCode).toBe(400)
  })

  it("Deve retornar 400 caso algum parametro seja inválido", async () => {
    buscaCidadaoNominal.execute.mockResolvedValue([])
    const params = { invalid_Param: 'Nome' }
    const result = await sut.perform(params)

    expect(result.statusCode).toBe(400)
  })

  it("Deve retornar 200 para um retorno valido", async () => {
    buscaCidadaoNominal.execute.mockResolvedValue([{ NumeroPessoa: "321", NumeroPedido: "16485", Nome: "Nome", Mae: "Nome Mae", Pai: "Nome Pai", Total: 0 }])
    const params = { v_sNome: 'Nome' }

    const result = await sut.perform(params)

    expect(result.statusCode).toBe(200)
  })

  it("Deve retornar 500 ao retornar erro desconhecido", async () => {
    buscaCidadaoNominal.execute.mockRejectedValue(error)

    const params = { v_sNome: 'any Name' }
    const result = await sut.perform(params)

    expect(buscaCidadaoNominal.execute).toHaveBeenCalledTimes(1)
    expect(buscaCidadaoNominal.execute).toHaveBeenCalledWith(params)
    expect(result.data).toBeInstanceOf(ServerError)
  })
})

