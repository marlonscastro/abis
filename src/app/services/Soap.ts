import { Request, Response } from 'express';
import axios from 'axios';
import { Parser } from 'xml2js';
import Constants from '../utils/Constants';
import ResponseSoap from "../interfaces/ResponseSoap";

class Soap {
    // Monta o XML para enviar nas requisições SOAP
    public createXML = (op: any, data: any, headers?: any): string => {
        // Criação do Body com base nos dados preenchidos pelo usuário 
        var bodySoap = `
                        <${op.functionName}  xmlns='http://tempuri.org/'>
                            ${Object.keys(data).map(v => {
            return (`<${v}>${data[v]}</${v}>`);
        })
            }
                        </${op.functionName}>    
                        `;

        // Criação dos Headers do Soap. os campos descritos são obrigatórios para todas as requisições
        var soapEnvelope =
            `<soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
                <soap:Header>
                    <AuthHeader xmlns='http://tempuri.org/'>
                    <Usuario>GTIWSUSER</Usuario>
                    <Senha>11TB#idnet%2020</Senha>
                    <Key>Pamela.intranet.sds.pe.gov.br</Key>
                    </AuthHeader>
                </soap:Header>
                <soap:Body>${bodySoap}</soap:Body>
            </soap:Envelope>`;

        return soapEnvelope;
    }

    private toJson = async (xml: string, op: any): Promise<any> => {
        const parser = new Parser();
        // Efetua a conversão dos dados de retorno de XML para JSON
        return new Promise((resolve, reject) => {
            try {
                parser.parseString(xml, function (error: any, data: any) {
                    if (error === null) {
                        let possuiResultado: any;
                        if (op.type === 'image') {
                            possuiResultado = data['soap:Envelope']['soap:Body'][0][op.functionName + 'Response'][0][op.functionName + 'Result'];
                            if (possuiResultado) {
                                resolve(possuiResultado[0])
                            }
                            else {
                                resolve({ status: 404, data: 'A busca não retornou Resultados' })
                            }
                        }
                        if (op.type === 'data') {
                            possuiResultado = data['soap:Envelope']['soap:Body'][0][op.functionName + 'Response'][0][op.functionName + 'Result'][0]['diffgr:diffgram'][0][op.responseBodyTag];
                            let json = [];

                            if (possuiResultado) {
                                json = possuiResultado[0].Table as [];

                                (json.length != 0) &&
                                    json.forEach((item: { [x: string]: any[]; $?: any; }) => {
                                        delete item.$;
                                        Object.keys(item).forEach(atrib => {
                                            item[atrib] = item[atrib][0];
                                        })
                                    });

                                json = [...new Set(json.map(item => JSON.stringify(item)))].map(item => JSON.parse(item as string));

                                resolve(json)
                            } else
                                resolve({ status: 404, data: 'A Busca não encontrou resultados' })
                        }
                        // both: Data and Image on return
                        if (op.type === 'both') {

                            possuiResultado = data['soap:Envelope']['soap:Body'][0][op.functionName + 'Response'][0][op.functionName + 'Result'];
                            if (possuiResultado) {

                                possuiResultado = possuiResultado[0]['diffgr:diffgram'][0][op.responseBodyTag];
                                let json = [];

                                if (possuiResultado) {
                                    json = possuiResultado[0].Table;

                                    (json.length != 0) &&
                                        json.forEach((item: { [x: string]: any[]; $?: any; }) => {
                                            delete item.$;
                                            Object.keys(item).forEach(atrib => {
                                                item[atrib] = item[atrib][0];
                                            })
                                        });

                                    json = [...new Set(json.map(item => JSON.stringify(item)))].map(item => JSON.parse(item as string));
                                    resolve(json)
                                } else
                                    resolve({ status: 404, data: 'A Busca não encontrou resultados' })
                            }
                            else {
                                resolve({ status: 404, data: 'A busca não retornou Resultados' })
                            }
                        }
                    }
                });
            } catch (error) {
                console.log(error)
                resolve({ status: 500, data: 'Falha ao decodificar os dados do servidor' })
            }
        })
    }

    // Faz a requisição ao server SOAP - ABIS
    public request = async (op: any, req: Request, isQuery?: boolean): Promise<ResponseSoap> => {
        let data = {};
        if (!isQuery) {
            if (op.functionName === 'ObterDocumentos' ||
                op.functionName === 'BuscarCidadaoNominal' ||
                op.functionName === 'ObterDigitais')
                data = req.body
            else data = req.params
        }
        else {
            data = req.query
        }

        // console.log(data)


        // Url de acesso ao endPoint Desejado
        var url = `${Constants.url}${req.path.split('/')[1]}.asmx?op=${op.functionName}`;
        let soapEnvelope = this.createXML(op, data, req.headers);
        // console.log('\n########################### XML ENVIADO ###########################\n')
        // console.log(soapEnvelope)

        // Efetua a consulta no endpoint com os dados passados   
        try {
            let result = await axios.post(url, soapEnvelope, { headers: { 'Content-Type': 'text/xml' } });
            // console.log(result);
            // return { status: result.status, data: result.data }

            if (result.status == 200) {
                if (op.functionName === 'Autenticar') {
                    return { status: 200, data: 'Usuário validado com sucesso!' }
                }

                // Converte o Retorno  em json
                // console.log(result.data);
                let jsonResult = await this.toJson(result.data, op);
                // console.log(jsonResult)


                if (jsonResult?.status == 404 || jsonResult?.status == 500) {
                    return { status: jsonResult.status, data: jsonResult.data }
                }
                return { status: result.status, data: jsonResult }
            }

        } catch (error) {
            // console.log('\n########################### RETORNO DA REQUISIÇÃO ###########################\n')
            // console.log(error.response.data)
            let retorno: ResponseSoap;
            if (error.response?.status == 500) {
                const parser = new Parser();
                parser.parseString(error.response.data, function (error: any, data: any) {
                    if (error === null) {
                        let msg: string = data['soap:Envelope']['soap:Body'][0]['soap:Fault'][0]['faultstring'][0];
                        if (msg.indexOf("Senha") < 0)
                            // Hackzinho pra identificar alguns situações onde não se encontra o dado e retorna um erro 
                            if (msg.indexOf("There is no row") < 0)
                                retorno = { status: op.status, data: msg }
                            else
                                retorno = { status: 404, data: 'A Busca não encontrou resultados!' }
                        else
                            retorno = { status: 401, data: msg }
                    }
                    else {
                        retorno = { status: 500, data: 'Houve algum erro no Servidor da Aplicação, ABIS!' }
                    }
                });
            }
            else if (error.response?.status == 503) {
                retorno = { status: 503, data: 'Serviço indisponivel!' };
                console.log(error.response)
            }
            else {
                retorno = { status: op.status, data: op.error };
            }
            return retorno
        }
    }
};

export default new Soap();