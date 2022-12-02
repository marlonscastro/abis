import { HttpResponse, notFound, ok, serverError, unauthorized } from "@/data/helpers/http";
import { BuscaCidadaoRGUseCase } from "@/domain/use-cases/civil";
import { ViewBuscarCidadao } from "@/view/cidadao";
import { Controller } from "@/data/controllers/controller";

type HttpRequest = { v_iRG: string }
type Model = Error | ViewBuscarCidadao[]

export class BuscaCidadaoRGController extends Controller {
  constructor(
    private readonly buscaCidadaoRG: BuscaCidadaoRGUseCase) {
    super()
  }

  async perform({ v_iRG }: HttpRequest): Promise<HttpResponse<Model>> {
    try {

      const cidadao = await this.buscaCidadaoRG.execute(v_iRG)
      if (cidadao.length === 0) {
        return notFound()
      }
      return ok(cidadao)
    } catch (error) {
      // console.log(error.message)
      return serverError(`Erro no Servidor: ${error.message}`)
    }
  }
}