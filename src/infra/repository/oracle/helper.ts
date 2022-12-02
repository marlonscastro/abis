import moment from "moment";
import { Cidadao } from "@/domain/models/cidadao";
import { OracleDriver } from "./driver";

export interface Colunas {
  v_sNome?: string
  v_sNomeMae?: string
  v_sNomePai?: string
}

export enum ParamsBusca {
  ComecaCom = 0,
  Contem = 1,
  TerminaCom = 2
}
export const colunas = {
  v_sNome: { fonetica: 'I.NM_IDENT_FONET', normal: 'I.NM_IDENT' },
  v_sNomeMae: { fonetica: 'I.NM_MAE_IDENT_FONET', normal: 'NM_MAE_IDENT' },
  v_sNomePai: { fonetica: 'I.NM_PAI_IDENT_FONET', normal: 'NM_PAI_IDENT' }
}

export interface HelperClass {
  padronizaDataECpf: (arrCidadao: Cidadao[]) => Cidadao[]
  geraQueryNominal: (params: any, colunas: Colunas, tipo: number, offset?: number, amount?: number) => string
  geraNomesFonetizados: (params: any) => Promise<any>
  geraNomesFonetizadosParametrizados: (params: any) => Promise<any>
  geraQueryNominalParametrizada: (params: any, tipo: number, offset?: number, amount?: number) => string
}

export default class Helper implements HelperClass {
  constructor(private readonly oracleDriver: OracleDriver) { }

  public padronizaDataECpf = (arrCidadao: Cidadao[]): Cidadao[] => {
    arrCidadao.map(item => {
      Object.keys(item).map(k => {
        // Efetua a conversão da Data de Nascimento para o formato padrão DD/MM/YYYY
        if (k !== 'NASCIMENTOAPROXIMADO')
          item[k] = item[k] ? String(item[k]) : null
        // Comentado para esperar Wallison aplicar as modificações
        else {
          // item[k] = new Date(item[k]).toISOString()                    
          item[k] = moment(item[k]).format("DD/MM/YYYY")
        }
        // Efetua a adição de um '0' à esquerda para cpfs que começam com '0', pois este atributo
        // está como Numérico na Base
        if (k === 'CPF') {
          if (item[k]) {
            if (item[k].length < 11) {
              item[k] = '0' + item[k]
            }
          }
        }
        if (k === 'IDENTIFICACAO_CPF') {
          if (item[k]) {
            if (item[k].length < 11) {
              item[k] = '0' + item[k]
            }
          }
        }
      })
    })
    return arrCidadao
  }
  public geraQueryNominal = (params: any, colunas: Colunas, tipo: number, offset?: number, amount?: number): string => {
    let query = `SELECT 
            I.nr_pedido as NUMEROPEDIDO,
            I.nr_unico_pessoa as NUMEROPESSOA,
            I.nm_ident as NOME,
            I.nm_pai_ident as PAI,
            I.nm_mae_ident as MAE    
        FROM IDT.MV_IDT_BUSCA I
        WHERE I.in_criminal = ${tipo} AND `
    let count = 0
    Object.keys(params).map(key => {
      if (count === 0)
        query += `${colunas[key]} LIKE '${params[key]}%' `
      else
        query += `AND ${colunas[key]} LIKE '${params[key]}%' `
      count++
    })
    query += `ORDER BY I.nr_pedido DESC OFFSET ${offset * amount} ROWS FETCH NEXT ${amount} ROWS ONLY`
    // console.log(query)
    return query
  }
  public geraNomesFonetizados = async (params): Promise<any> => {
    let query = `SELECT `
    Object.keys(params).map(key => {
      query += `IDT.FN_IDT_FONET('${params[key]}') AS ${key}, `
    })
    query = query.substring(0, query.length - 2)
    query += ` FROM DUAL`

    const result: any = await this.oracleDriver.execute(query)
    // Result Fake pra testes 
    // const result: any = { rows: [{ V_SNOME: ' MW¥ZYZ  MAR¢EZ ', V_SNOMEMAE: ' MARL¥ ', V_SNOMEPAI: ' JA¥ME ' }] }
    // console.log(result)
    if (result.rows.length === 0) {
      return false
    }

    let obj: any = {}
    // Hack: Necessário para conversão da coluna em maiúsculo vindo da consulta do Oracle 
    // para o formato de atributo padrão: ex, V_SNOME => v_sNome 
    Object.keys(result.rows[0]).forEach(item => {
      if (item === 'V_SNOME') {
        obj['v_sNome'] = result.rows[0].V_SNOME
      }
      if (item === 'V_SNOMEMAE') {
        obj['v_sNomeMae'] = result.rows[0].V_SNOMEMAE
      }
      if (item === 'V_SNOMEPAI') {
        obj['v_sNomePai'] = result.rows[0].V_SNOMEPAI
      }
    })
    return obj
  }

  public geraNomesFonetizadosParametrizados = async (params: any): Promise<any> => {
    let query = `SELECT `
    Object.keys(params).map(key => {
      if (key !== 'page') {
        if (!params[key].exata)
          query += `IDT.FN_IDT_FONET('${params[key]["value"]}') AS ${key}, `
        else
          query += `'${params[key]["value"]}' AS ${key}, `
      }
    })
    query = query.substring(0, query.length - 2)
    query += ` FROM DUAL`

    const result: any = await this.oracleDriver.execute(query)
    // Result Fake pra testes 
    // const result: any = { rows: [{ V_SNOME: ' MW¥ZYZ  MAR¢EZ ', V_SNOMEMAE: ' MARL¥ ', V_SNOMEPAI: ' JA¥ME ' }] }
    if (result.rows.length === 0) {
      return false
    }

    let obj: any = {}
    // Hack: Necessário para conversão da coluna em maiúsculo vindo da consulta do Oracle 
    // para o formato de atributo padrão: ex, V_SNOME => v_sNome 
    Object.keys(result.rows[0]).forEach(item => {
      if (item === 'V_SNOME') {
        obj = {
          ...obj,
          v_sNome: {
            ...params.v_sNome,
            value: !params.v_sNome.exata ? result.rows[0].V_SNOME : params.v_sNome.value
          }
        }
      }

      if (item === 'V_SNOMEMAE') {
        obj = {
          ...obj,
          v_sNomeMae: {
            ...params.v_sNomeMae,
            value: !params.v_sNomeMae.exata ? result.rows[0].V_SNOMEMAE : params.v_sNomeMae.value
          }
        }
      }

      if (item === 'V_SNOMEPAI') {
        obj = {
          ...obj,
          v_sNomePai: {
            ...params.v_sNomePai,
            value: !params.v_sNomePai.exata ? result.rows[0].V_SNOMEPAI : params.v_sNomePai.value
          }
        }
      }
    })

    // Adicionar os Caracteres % de acordo com o formato de busca desejado
    Object.keys(obj).forEach(key => {
      if (obj[key].formato === ParamsBusca.ComecaCom) obj[key].value += '%'
      if (obj[key].formato === ParamsBusca.Contem) obj[key].value = `%${obj[key].value}%`
      if (obj[key].formato === ParamsBusca.TerminaCom) obj[key].value = `%${obj[key].value}`
    })

    return obj
  }
  public geraQueryNominalParametrizada = (params: any, tipo: number, offset?: number, amount?: number): string => {
    let query = `
        SELECT 
            I.nr_pedido as NUMEROPEDIDO,
            I.nr_unico_pessoa as NUMEROPESSOA,
            I.nm_ident as NOME,
            I.nm_pai_ident as PAI,
            I.nm_mae_ident as MAE,
            COUNT(*) OVER () as TOTAL    
        FROM IDT.MV_IDT_BUSCA I
        WHERE I.in_criminal = ${tipo} AND `
    let count = 0
    Object.keys(params).forEach(key => {
      query += `${count === 0 ? '' : 'AND'} ${!params[key].exata ? colunas[key].fonetica : colunas[key].normal} LIKE '${params[key].value}' `
      count++
    })

    query += `ORDER BY I.nr_pedido DESC OFFSET ${offset * amount} ROWS FETCH NEXT ${amount} ROWS ONLY`
    return query
  }
}