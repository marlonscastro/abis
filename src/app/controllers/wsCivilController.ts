import { Request, Response } from 'express';
import Soap from '../services/Soap';
import Constants from '../utils/Constants';
import moment from 'moment'

const Autenticar = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.Autenticar, req);
    res.status(result.status).json(result.data);
};

const BuscarPorRG = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.BuscarPorRG, req);
    if (result.status === 200) {
        const ref: any[] = result.data.map(item => {
            item.NOME = item.NOME.toUpperCase()
            if (item.MAE) item.MAE = item.MAE.toUpperCase()
            if (item.PAI) item.PAI = item.PAI.toUpperCase()
            if (item.CPF) {
                if (item.CPF.length < 11) {
                    item.CPF = "0" + item.CPF
                }
            }
            if (item.NASCIMENTOAPROXIMADO) {
                return {
                    ...item,
                    NASCIMENTOAPROXIMADO: moment(item.NASCIMENTOAPROXIMADO).format("DD/MM/YYYY")
                }
            }

            return item
        })

        res.status(result.status).json(ref);
    } else res.status(result.status).json(result.data)
};

const BuscarCidadaoPorRG = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.BuscarCidadaoPorRG, req);
    res.status(result.status).json(result.data);
};

const BuscarCidadaoPorCPF = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.BuscarCidadaoPorCPF, req);
    if (result.status === 200) {
        const ref = result.data.map(item => {
            //if(!item.NOME) return res.status(501).json('Houve Alterações nos atributos no ws do Abis!')
            item.Nome = item.Nome.toUpperCase()
            if (item.Mae) item.Mae = item.Mae.toUpperCase()
            if (item.Pai) item.Pai = item.Pai.toUpperCase()

            if (item.Identificacao_CPF) {
                if (item.Identificacao_CPF.length < 11) {
                    item.Identificacao_CPF = "0" + item.Identificacao_CPF
                }
            }
            if (item.NascimentoAproximado) {
                return {
                    ...item,
                    NascimentoAproximado: moment(item.NascimentoAproximado).format("DD/MM/YYYY")
                }
            }
            return item
        })
        res.status(result.status).json(ref);
    } else res.status(result.status).json(result.data)
};

const ObterDadosCidadaoCivil = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.ObterDadosCidadaoCivil, req);

    if (result.data[0].SiglaUFNascimento) {
        if (typeof result.data[0].SiglaUFNascimento !== 'string')
            result.data[0].SiglaUFNascimento = 'Não Informado'
    }

    if (result.status === 200) {
        if (result.data[0].CPF) {
            if (result.data[0].CPF.length < 11) {
                result.data[0].CPF = "0" + result.data[0].CPF
            }
        }
        res.status(result.status).json(result.data);
    } else res.status(result.status).json(result.data)

};

const ObterDocumentos = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.ObterDocumentos, req);
    res.status(result.status).json(result.data);
};

const BuscarCidadaoNominal = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.BuscarCidadaoNominal, req, true);
    if (result.status === 200) {
        const ref = result.data.map(item => {
            if (item.Identificacao_CPF) {
                if (item.Identificacao_CPF.length < 11) {
                    item.Identificacao_CPF = "0" + item.Identificacao_CPF
                }
            }
            return item
        })
        res.status(result.status).json(ref);
    } else res.status(result.status).json(result.data)
    // res.status(result.status).json(result.data)
};

const ObterAssinatura = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.ObterAssinatura, req);
    res.status(result.status).json(result.data);
};

const ObterDigitais = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.ObterDigitais, req);
    res.status(result.status).json(result.data);
};

const ObterFoto3x4 = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCivil.ObterFoto3x4, req);
    res.status(result.status).json(result.data);
};

export default {
    Autenticar,
    BuscarPorRG,
    BuscarCidadaoPorRG,
    BuscarCidadaoPorCPF,
    ObterDadosCidadaoCivil,
    ObterDocumentos,
    BuscarCidadaoNominal,
    ObterAssinatura,
    ObterDigitais,
    ObterFoto3x4
};
