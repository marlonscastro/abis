import { Request, Response } from 'express';
import Soap from '../services/Soap';
import Constants from '../utils/Constants';

const Autenticar = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.Autenticar, req);
    res.status(result.status).json(result.data);
};

const BuscarCidadaoNominal = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.BuscarCidadaoNominal, req, true);
    res.status(result.status).json(result.data);
};

const BuscarCidadaoPorAlcunhas = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.BuscarCidadaoPorAlcunhas, req);
    res.status(result.status).json(result.data);
};

const BuscarCidadaoPorCPF = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.BuscarCidadaoPorCPF, req);
    res.status(result.status).json(result.data);
};

const ObterDadosCidadao = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterDadosCidadao, req);
    res.status(result.status).json(result.data);
};

const BuscarCidadaoPorRC = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.BuscarCidadaoPorRC, req);
    res.status(result.status).json(result.data);
};

const ObterDadosCriminais = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterDadosCriminais, req);
    res.status(result.status).json(result.data);
};

const ObterAssinatura = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterAssinatura, req);
    res.status(result.status).json(result.data);
};

const ObterFotoFrente = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterFotoFrente, req);
    res.status(result.status).json(result.data);
};

const ObterFotoPerfilDireito = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterFotoPerfilDireito, req);
    res.status(result.status).json(result.data);
};

const ObterFotoPerfilEsquerdo = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterFotoPerfilEsquerdo, req);
    res.status(result.status).json(result.data);
};

const ObterFotoSinais = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterFotoSinais, req);
    res.status(result.status).json(result.data);
};

const ObterDadosProcesso = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterDadosProcesso, req);
    res.status(result.status).json(result.data);
};

const ObterDadosOcorrencia = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterDadosOcorrencia, req);
    res.status(result.status).json(result.data);
};

const ObterDadosInquerito = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterDadosInquerito, req);
    res.status(result.status).json(result.data);
};

const ObterDadosInfracao = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterDadosInfracao, req);
    res.status(result.status).json(result.data);
};

const ObterDadosMandadoPrisao = async (req: Request, res: Response) => {
    var result = await Soap.request(Constants.wsCriminal.ObterDadosMandadoPrisao, req);
    res.status(result.status).json(result.data);
};

export default {
    Autenticar,
    BuscarCidadaoPorRC,
    BuscarCidadaoPorCPF,
    BuscarCidadaoNominal,
    BuscarCidadaoPorAlcunhas,
    ObterDadosCidadao,
    ObterDadosCriminais,
    ObterAssinatura,
    ObterFotoFrente,
    ObterFotoPerfilDireito,
    ObterFotoPerfilEsquerdo,
    ObterFotoSinais,
    ObterDadosProcesso,
    ObterDadosOcorrencia,
    ObterDadosInquerito,
    ObterDadosInfracao,
    ObterDadosMandadoPrisao
};
