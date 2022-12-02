import { HttpResponse, notFound, ok, serverError, unauthorized } from "@/data/helpers/http";
import { Cidadao } from "@/domain/models/cidadao";
import { BuscaRGUseCase } from "@/domain/use-cases/civil/busca-rg";
import { Controller } from "@/data/controllers/controller";

type HttpRequest = { v_iRG: string }
type Model = Error | Cidadao[]

export class BuscaRGController extends Controller {
  constructor(
    private readonly buscaRG: BuscaRGUseCase) {
    super()
  }

  async perform({ v_iRG }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      const cidadao = await this.buscaRG.execute(v_iRG)
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