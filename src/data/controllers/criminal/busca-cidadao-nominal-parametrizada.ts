import { badRequest, HttpResponse, notFound, ok, unauthorized } from "@/data/helpers/http";
import { BuscaCidadaoNominalCriminalParametrizadaUseCase } from "@/domain/use-cases/criminal";
import { ResultBuscaParametrizada, ViewBuscarCidadao } from "@/view/cidadao";
import { Controller } from "@/data/controllers/controller";

type HttpRequest = any
type Model = Error | ViewBuscarCidadao[] | ResultBuscaParametrizada

export class BuscaCidadaoNominalCriminalParametrizadaController extends Controller {
    constructor(
        private readonly buscaCidadaoNominalParametrizada: BuscaCidadaoNominalCriminalParametrizadaUseCase) {
        super()
    }

    validate = (params: any): boolean => {
        const parametrosPermitidos: string[] = ['v_sNome', 'v_sNomeMae', 'v_sNomePai', 'page']
        let valid = true
        Object.keys(params).map(i => {
            if (!parametrosPermitidos.find(item => item === i)) {
                valid = false
            }
        })
        return valid
    }

    async perform(params: HttpRequest): Promise<HttpResponse<Model>> {
        const p = Object.keys(params)

        if (p.length === 0 || (p.length === 1 && p.indexOf('page') === 0)) {
            return badRequest({
                name: 'badRequest',
                message: 'Você tem que enviar ao menos um desses atributos: v_sNome, v_sNomeMae ou v_sNomePai e page (opcional) para escolher a página desejada!'
            })
        }

        if (!this.validate(params)) {
            return badRequest({
                name: 'ParametroInválido',
                message: 'Existem parâmetros inválidos na requisição. Você tem que enviar ao menos um desses atributos: v_sNome, v_sNomeMae ou v_sNomePai e page (opcional) para escolher a página desejada!'
            })
        }

        try {
            const cidadao = await this.buscaCidadaoNominalParametrizada.execute(params)
            if (!cidadao) {
                return notFound()
            }
            return ok(cidadao)
        } catch (error) {
            console.log(error.message)
            return unauthorized()
        }
    }
}