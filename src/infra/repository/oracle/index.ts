import { Repository } from "@/data/protocols/repository";
import { Cidadao } from "@/domain/models/cidadao";

import { OracleDriver, OracleResult } from "./driver";
import { HelperClass } from "./helper";

export enum TipoConsulta {
  civil = 0,
  criminal = 1
}

export default class OracleRepository implements Repository {
  constructor(private readonly oracleDriver: OracleDriver, private readonly helper: HelperClass) { }
  public buscaRg = async (rg: string): Promise<Cidadao[]> => {
    const consulta = `
        select 
            cidadao.nr_unico_pessoa as NUMEROPESSOA,
            cidadao.nm_ident as NOME,
            cidadao.nm_pai_ident as PAI,
            cidadao.nm_mae_ident as MAE,
            cidadao.nr_cpf as CPF,
            cidadao.dt_nasc_aprox as NASCIMENTOAPROXIMADO, 
            cidadao.nr_rg_atrib as RGATRIBUIDO,
            cidadao.nr_pedido as NUMEROPEDIDO
        from Idt.v_idt_info_cdadao cidadao 
        where 
            cidadao.nr_rg_atrib = '${parseInt(rg)}'
        `
    const result: any = await this.oracleDriver.execute(consulta) 

    if (result.rows.length !== 0) {
      const resultados: Cidadao[] = this.helper.padronizaDataECpf(result.rows)
      return resultados
    }
    return []
  }

  public buscaCidadaoRg = async (rg: string): Promise<Cidadao[]> => {
    const consulta = `
        select
            cidadao.nr_rg_atrib as NumeroApresentacao,
            cidadao.nr_unico_pessoa as NumeroPessoa,
            cidadao.nm_ident as Nome,
            cidadao.dt_nasc_aprox as NascimentoAproximado,
            cidadao.tx_rg_atrib as RGAtribuido,
            cidadao.nr_cpf as Identificacao_CPF,
            cidadao.nm_mae_ident as Mae,
            cidadao.nm_pai_ident as Pai,
            cidadao.nr_pedido as NumeroPedido
        from Idt.v_idt_info_cdadao cidadao 
        where 
            cidadao.nr_rg_atrib = '${parseInt(rg)}'  
        `
    const result: any = await this.oracleDriver.execute(consulta)
    if (result.rows.length !== 0) {
      return result.rows
    }
    return []

  }

  public buscaCidadaoNominal = async (params: any): Promise<Cidadao[]> => {
    const paramsFonetizados = await this.helper.geraNomesFonetizados(params)

    const queryFonetizada = this.helper.geraQueryNominal(paramsFonetizados, {
      v_sNome: 'I.NM_IDENT_FONET',
      v_sNomeMae: 'I.NM_MAE_IDENT_FONET',
      v_sNomePai: 'I.NM_PAI_IDENT_FONET'
    }, TipoConsulta.civil, 0, 10)

    const result: any = await this.oracleDriver.execute(queryFonetizada)
    if (result.rows.length === 0) {
      return []
    }
    return result.rows
  }

  public buscaCidadaoNominalCriminal = async (params: any): Promise<Cidadao[]> => {
    const paramsFonetizados = await this.helper.geraNomesFonetizados(params)

    const queryFonetizada = this.helper.geraQueryNominal(paramsFonetizados, {
      v_sNome: 'I.NM_IDENT_FONET',
      v_sNomeMae: 'I.NM_MAE_IDENT_FONET',
      v_sNomePai: 'I.NM_PAI_IDENT_FONET'
    }, TipoConsulta.criminal, 0, 10)

    const result: any = await this.oracleDriver.execute(queryFonetizada)
    if (result.rows.length === 0) {
      return []
    }
    return result.rows
  }

  public buscaCidadaoNominalParametrizada = async (params: any): Promise<Cidadao[]> => {
    const parametrizados = await this.helper.geraNomesFonetizadosParametrizados(params)
    const queryFonetizada = this.helper.geraQueryNominalParametrizada(parametrizados, TipoConsulta.civil, params.page || 0, 10)

    const result: any = await this.oracleDriver.execute(queryFonetizada)
    if (result.rows.length === 0) {
      return []
    }
    return result.rows
  }

  public buscaCidadaoNominalCriminalParametrizada = async (params: any): Promise<Cidadao[]> => {
    const parametrizados = await this.helper.geraNomesFonetizadosParametrizados(params)

    const queryFonetizada = this.helper.geraQueryNominalParametrizada(parametrizados, TipoConsulta.criminal, params.page || 0, 10)
    const result: any = await this.oracleDriver.execute(queryFonetizada)
    if (result.rows.length === 0) {
      return []
    }
    return result.rows
  }

}