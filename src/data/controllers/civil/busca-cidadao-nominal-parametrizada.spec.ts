import { ServerError } from "@/data/errors"
import { BuscaCidadaoNominalParametrizada } from "@/data/use-cases/civil"
import { mock, MockProxy } from "jest-mock-extended"
import { BuscaCidadaoNominalParametrizadaController } from "./busca-cidadao-nominal-parametrizada"

describe("Controller BuscaCidadaoNominal Parametrizada (Civil)", () => {
  let sut: BuscaCidadaoNominalParametrizadaController
  let buscaCidadaoNominalParametrizada: MockProxy<BuscaCidadaoNominalParametrizada>
  let error = new Error("Fake Error")

  beforeEach(() => {
    buscaCidadaoNominalParametrizada = mock()
    sut = new BuscaCidadaoNominalParametrizadaController(buscaCidadaoNominalParametrizada)
  })

  it("Deve retornar 404 ao não encontrar nenhum dado", async () => {
    buscaCidadaoNominalParametrizada.execute.mockResolvedValue(null)
    const params = { page: 0, v_sNome: { value: "any name", exata: false, formato: 0 }}

    const result = await sut.perform(params)

    expect(buscaCidadaoNominalParametrizada.execute).toHaveBeenCalledTimes(1)
    expect(buscaCidadaoNominalParametrizada.execute).toHaveBeenCalledWith(params)
    expect(result.statusCode).toBe(404)
  })

  it("Deve retornar 400 caso não envie nenhum parametro", async () => {
    const params = {}
    const result = await sut.perform(params)

    expect(result.statusCode).toBe(400)
  })

  it("Deve retornar 400 caso algum parametro seja inválido", async () => {

    const params = { invalid_Param: 'Nome' }
    const result = await sut.perform(params)

    expect(result.statusCode).toBe(400)
  })

  it("Deve retornar 200 para um retorno valido", async () => {
    buscaCidadaoNominalParametrizada.execute.mockResolvedValue({ total: 1, registros: [{ NumeroPessoa: "321654", NumeroPedido: "164885", Nome: "Nome", Mae: "Mae", Pai: "Pai" }]})
    const params = { v_sNome: 'Nome' }

    const result = await sut.perform(params)

    expect(result.statusCode).toBe(200)
  })

  it("Deve retornar 500 ao retornar erro desconhecido", async () => {
    buscaCidadaoNominalParametrizada.execute.mockRejectedValue(error)

    const params = { v_sNome: 'any Name' }
    const result = await sut.perform(params)

    expect(buscaCidadaoNominalParametrizada.execute).toHaveBeenCalledTimes(1)
    expect(buscaCidadaoNominalParametrizada.execute).toHaveBeenCalledWith(params)
    expect(result.data).toBeInstanceOf(ServerError)
  })
})
