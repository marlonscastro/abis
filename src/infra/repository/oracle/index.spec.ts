import OracleRepository, { TipoConsulta } from "."
import { OracleDriver } from "./driver"
import Helper, { HelperClass } from "./helper"
import { MockProxy, mock } from 'jest-mock-extended'

const resultQueryNominal = `SELECT I.nr_pedido as NUMEROPEDIDO, I.nr_unico_pessoa as NUMEROPESSOA, I.nm_ident as NOME, I.nm_pai_ident as PAI, I.nm_mae_ident as MAE FROM IDT.MV_IDT_BUSCA I        WHERE I.in_criminal = 0 AND I.NM_IDENT_FONET LIKE ' MW¥ZYZ  MAR¢EZ %' AND I.NM_MAE_IDENT_FONET LIKE ' MARL¥ %' AND I.NM_PAI_IDENT_FONET LIKE ' JA¥ME %' ORDER BY I.nr_pedido DESC OFFSET 0 ROWS FETCH NEXT 30 ROWS ONLY`.replace(/\s/g, '')
const resultQueryNominalParametrizada = `SELECT I.nr_pedido as NUMEROPEDIDO, I.nr_unico_pessoa as NUMEROPESSOA, I.nm_ident as NOME, I.nm_pai_ident as PAI, I.nm_mae_ident as MAE, COUNT(*) OVER () as TOTAL     FROM IDT.MV_IDT_BUSCA I WHERE I.in_criminal = 0 AND I.NM_IDENT_FONET LIKE ' MARLÖM %' AND I.NM_MAE_IDENT_FONET LIKE ' EL¥ZABET %' AND I.NM_PAI_IDENT_FONET LIKE ' MARKÖMDEZ %' ORDER BY I.nr_pedido DESC OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY`.replace(/\s/g, '')
const resultQueryNominalParametrizadaSimples = `SELECT I.nr_pedido as NUMEROPEDIDO, I.nr_unico_pessoa as NUMEROPESSOA, I.nm_ident as NOME, I.nm_pai_ident as PAI, I.nm_mae_ident as MAE, COUNT(*) OVER () as TOTAL     FROM IDT.MV_IDT_BUSCA I WHERE I.in_criminal = 0 AND I.NM_IDENT LIKE '% MARLON %' AND I.NM_MAE_IDENT_FONET LIKE '% EL¥ZABET' ORDER BY I.nr_pedido DESC OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY`.replace(/\s/g, '')

describe("Helper Class", () => {
  let driver: MockProxy<OracleDriver>
  let sut: HelperClass

  beforeEach(() => {
    driver = mock()
    sut = new Helper(driver)
  })

  it("Deve padronizar o cpf sem zero à esquerda e data de nascimento de um cidadao retornado", async () => {
    const result = sut.padronizaDataECpf([
      {
        NUMEROAPRESENTACAO: '1234',
        NUMEROPESSOA: '1234',
        NOME: 'NOME',
        PAI: 'NOME PAI',
        MAE: 'NOME MAE',
        CPF: '4858468599',
        NASCIMENTOAPROXIMADO: '1988-04-04T00:00:00-03:00', // Data no formato ISO 8601
        RGATRIBUIDO: '164522',
        IDENTIFICACAO_CPF: '1854856988', // CPF sem o "0" inicial, pois é Numérico no Banco de dados
        NUMEROPEDIDO: '521544',
        RC: '123',
        TOTAL: 0
      }
    ])
   
    expect(result).toEqual([
      {
        NUMEROAPRESENTACAO: '1234',
        NUMEROPESSOA: '1234',
        NOME: 'NOME',
        PAI: 'NOME PAI',
        MAE: 'NOME MAE',
        CPF: '04858468599',
        NASCIMENTOAPROXIMADO: '04/04/1988',
        RGATRIBUIDO: '164522',
        IDENTIFICACAO_CPF: '01854856988',
        NUMEROPEDIDO: '521544',
        RC: '123',
        TOTAL: null
      }
    ])
  })
  it("Deve gerar nomes fonetizados na busca nominal", async () => {
    const queryASerExecutada = "SELECT IDT.FN_IDT_FONET('Moisés Marques') AS v_sNome, IDT.FN_IDT_FONET('Marly') AS vs_NomeMae, IDT.FN_IDT_FONET('Jaime') AS vs_NomePai FROM DUAL"
    const params = { v_sNome: 'Moisés Marques', vs_NomeMae: 'Marly', vs_NomePai: 'Jaime' }

    driver.execute.mockResolvedValue({ metadata: [], rows: [{ V_SNOME: ' MW¥ZYZ  MAR¢EZ ', V_SNOMEMAE: ' MARL¥ ', V_SNOMEPAI: ' JA¥ME ' }] })

    const result = sut.geraNomesFonetizados(params)

    expect(driver.execute).toHaveBeenCalledTimes(1)
    expect(driver.execute).toHaveBeenCalledWith(queryASerExecutada)
    await expect(result).resolves.toEqual({
      v_sNome: ' MW¥ZYZ  MAR¢EZ ',
      v_sNomeMae: ' MARL¥ ',
      v_sNomePai: ' JA¥ME '
    })
  })

  it("Deve retornar false quando não conseguir gerar nomes fonetizados", async () => {
    const queryASerExecutada = "SELECT IDT.FN_IDT_FONET('Moisés Marques') AS v_sNome, IDT.FN_IDT_FONET('Marly') AS vs_NomeMae, IDT.FN_IDT_FONET('Jaime') AS vs_NomePai FROM DUAL"
    const params = { v_sNome: 'Moisés Marques', vs_NomeMae: 'Marly', vs_NomePai: 'Jaime' }

    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const result = sut.geraNomesFonetizados(params)

    expect(driver.execute).toHaveBeenCalledTimes(1)
    expect(driver.execute).toHaveBeenCalledWith(queryASerExecutada)
    await expect(result).resolves.toBe(false)
  })

  it("Deve gerar query para busca civil nominal fonetizada", () => {
    const queryFonetizada = sut.geraQueryNominal({ v_sNome: ' MW¥ZYZ  MAR¢EZ ', v_sNomeMae: ' MARL¥ ', v_sNomePai: ' JA¥ME ' }, {
      v_sNome: 'I.NM_IDENT_FONET', v_sNomeMae: 'I.NM_MAE_IDENT_FONET', v_sNomePai: 'I.NM_PAI_IDENT_FONET'
    }, TipoConsulta.civil, 0, 30)

    expect(driver.execute).toHaveBeenCalledTimes(0)
    expect(queryFonetizada.replace(/\s/g, '')).toEqual(resultQueryNominal)
  })

  it("Deve gerar nomes fonetizados e objetos com parâmetros para busca nominal (NÃO EXATA)", async () => {

    const queryASerExecutada = "SELECT IDT.FN_IDT_FONET('Marlon') AS v_sNome, IDT.FN_IDT_FONET('Elizabeth') AS v_sNomeMae, IDT.FN_IDT_FONET('Marcondes') AS v_sNomePai FROM DUAL"

    driver.execute.mockResolvedValue({ metadata: [], rows: [{ V_SNOME: ' MARLÖM ', V_SNOMEMAE: ' EL¥ZABET ', V_SNOMEPAI: ' MARKÖMDEZ ' }] })

    const result = sut.geraNomesFonetizadosParametrizados({
      page: 0,
      v_sNome: { value: 'Marlon', exata: false, formato: 0 },
      v_sNomeMae: { value: 'Elizabeth', exata: false, formato: 0 },
      v_sNomePai: { value: 'Marcondes', exata: false, formato: 0 }
    })

    expect(driver.execute).toHaveBeenCalledTimes(1)
    expect(driver.execute).toHaveBeenCalledWith(queryASerExecutada)
    await expect(result).resolves.toEqual({
      v_sNome: { value: ' MARLÖM %', exata: false, formato: 0 },
      v_sNomeMae: { value: ' EL¥ZABET %', exata: false, formato: 0 },
      v_sNomePai: { value: ' MARKÖMDEZ %', exata: false, formato: 0 }
    })
  })

  it("Deve gerar nomes fonetizados e objetos com parâmetros para busca nominal (EXATA)", async () => {

    const queryASerExecutada = "SELECT 'Marlon' AS v_sNome, 'Elizabeth' AS v_sNomeMae, 'Marcondes' AS v_sNomePai FROM DUAL"

    driver.execute.mockResolvedValue({ metadata: [], rows: [{ V_SNOME: ' MARLÖM ', V_SNOMEMAE: ' EL¥ZABET ', V_SNOMEPAI: ' MARKÖMDEZ ' }] })

    const result = sut.geraNomesFonetizadosParametrizados({
      page: 0,
      v_sNome: { value: 'Marlon', exata: true, formato: 0 },
      v_sNomeMae: { value: 'Elizabeth', exata: true, formato: 0 },
      v_sNomePai: { value: 'Marcondes', exata: true, formato: 0 }
    })

    expect(driver.execute).toHaveBeenCalledTimes(1)
    expect(driver.execute).toHaveBeenCalledWith(queryASerExecutada)
    await expect(result).resolves.toEqual({
      v_sNome: { value: 'Marlon%', exata: true, formato: 0 },
      v_sNomeMae: { value: 'Elizabeth%', exata: true, formato: 0 },
      v_sNomePai: { value: 'Marcondes%', exata: true, formato: 0 }
    })
  })

  it("Deve gerar nomes fonetizados e objetos com parâmetros para busca nominal e formato variável (EXATA)", async () => {

    const queryASerExecutada = "SELECT 'Marlon' AS v_sNome, 'Elizabeth' AS v_sNomeMae, 'Marcondes' AS v_sNomePai FROM DUAL"

    driver.execute.mockResolvedValue({ metadata: [], rows: [{ V_SNOME: ' MARLÖM ', V_SNOMEMAE: ' EL¥ZABET ', V_SNOMEPAI: ' MARKÖMDEZ ' }] })

    const result = sut.geraNomesFonetizadosParametrizados({
      page: 0,
      v_sNome: { value: 'Marlon', exata: true, formato: 1 },
      v_sNomeMae: { value: 'Elizabeth', exata: true, formato: 1 },
      v_sNomePai: { value: 'Marcondes', exata: true, formato: 2 }
    })

    expect(driver.execute).toHaveBeenCalledTimes(1)
    expect(driver.execute).toHaveBeenCalledWith(queryASerExecutada)
    await expect(result).resolves.toEqual({
      v_sNome: { value: '%Marlon%', exata: true, formato: 1 },
      v_sNomeMae: { value: '%Elizabeth%', exata: true, formato: 1 },
      v_sNomePai: { value: '%Marcondes', exata: true, formato: 2 }
    })
  })

  it("Deve retornar false ao não retornar nomes fonéticos / não encontrado", async () => {

    const queryASerExecutada = "SELECT 'Marlon' AS v_sNome, 'Elizabeth' AS v_sNomeMae, 'Marcondes' AS v_sNomePai FROM DUAL"

    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const result = sut.geraNomesFonetizadosParametrizados({
      page: 0,
      v_sNome: { value: 'Marlon', exata: true, formato: 0 },
      v_sNomeMae: { value: 'Elizabeth', exata: true, formato: 0 },
      v_sNomePai: { value: 'Marcondes', exata: true, formato: 0 }
    })

    expect(driver.execute).toHaveBeenCalledTimes(1)
    expect(driver.execute).toHaveBeenCalledWith(queryASerExecutada)
    await expect(result).resolves.toEqual(false)
  })

  it("Deve gerar query para busca civil nominal fonetizada parametrizada", () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const queryFonetizada = sut.geraQueryNominalParametrizada({
      v_sNome: { value: ' MARLÖM %', exata: false, formato: 0 },
      v_sNomeMae: { value: ' EL¥ZABET %', exata: false, formato: 0 },
      v_sNomePai: { value: ' MARKÖMDEZ %', exata: false, formato: 0 }
    }, TipoConsulta.civil, 0, 10)

    expect(driver.execute).toHaveBeenCalledTimes(0)
    expect(queryFonetizada.replace(/\s/g, '')).toEqual(resultQueryNominalParametrizada)
  })

  it("Deve gerar query para busca civil nominal fonetizada parametrizada", () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const queryFonetizada = sut.geraQueryNominalParametrizada({
      v_sNome: { value: '% MARLON %', exata: true, formato: 1 },
      v_sNomeMae: { value: '% EL¥ZABET ', exata: false, formato: 2 }
    }, TipoConsulta.civil, 0, 10)

    expect(driver.execute).toHaveBeenCalledTimes(0)
    expect(queryFonetizada.replace(/\s/g, '')).toEqual(resultQueryNominalParametrizadaSimples)
  })
})

describe("Buscar por RG", () => {
  let driver: MockProxy<OracleDriver>
  let driverHelper: MockProxy<OracleDriver>
  let helper: HelperClass
  let sut: OracleRepository
  const error = new Error("Fake Oracle Error")

  beforeAll(() => {
    driver = mock()
    driverHelper = mock()
    helper = new Helper(driverHelper)
  })

  beforeEach(() => {
    sut = new OracleRepository(driver, helper)
  })

  it("Deve retornar um erro ao buscar um rg", async () => {
    driver.execute.mockRejectedValue(error)

    const result = sut.buscaRg("123456")

    expect(driver.execute).toHaveBeenCalledTimes(1)
    // expect(driver.execute).toHaveBeenCalledWith({})
    await expect(result).rejects.toThrow(error)
  })

  it("Deve retornar um cidadão válido ao buscar por um rg", async () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [{ NUMEROPESSOA: '1234', NOME: 'NOME', PAI: 'NOME PAI', MAE: 'NOME MAE', CPF: '04858468599', NASCIMENTOAPROXIMADO: '1988-04-04T00:00:00-03:00', RGATRIBUIDO: '164522', NUMEROPEDIDO: '521544' }] })

    const result = sut.buscaRg("123456")

    await expect(result).resolves.toEqual([{ NUMEROPESSOA: '1234', NOME: 'NOME', PAI: 'NOME PAI', MAE: 'NOME MAE', CPF: '04858468599', NASCIMENTOAPROXIMADO: '04/04/1988', RGATRIBUIDO: '164522', NUMEROPEDIDO: '521544' }])
  })

  it("Deve retornar array vazio ao buscar por um rg inexistente / não encontrado", async () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [] })
    const result = sut.buscaRg("123456")

    await expect(result).resolves.toEqual([])
  })
})

describe("Buscar Cidadão por RG", () => {
  let driver: MockProxy<OracleDriver>
  let driverHelper: MockProxy<OracleDriver>
  let helper: HelperClass
  let sut: OracleRepository
  const error = new Error("Fake Oracle Error")

  beforeAll(() => {
    driver = mock()
    driverHelper = mock()
    helper = new Helper(driverHelper)
  })

  beforeEach(() => {
    sut = new OracleRepository(driver, helper)
  })
  it("Deve retornar um erro ao buscar cidadão por rg", async () => {
    driver.execute.mockRejectedValue(error)
    const result = sut.buscaCidadaoRg("123456")
    await expect(result).rejects.toThrow(error)
  })

  it("Deve retornar um cidadão válido ao buscar cidadão por um rg", async () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [{ NUMEROAPRESENTACAO: '1234', NUMEROPESSOA: '1234', NOME: 'NOME', PAI: 'NOME PAI', MAE: 'NOME MAE', CPF: '04858468599', NASCIMENTOAPROXIMADO: '1988-04-04T00:00:00-03:00', RGATRIBUIDO: '164522', IDENTIFICACAO_CPF: '01854856988', NUMEROPEDIDO: '521544' }] })

    const result = sut.buscaCidadaoRg("123456")
    await expect(result).resolves.toEqual([
      {
        NUMEROAPRESENTACAO: '1234',
        NUMEROPESSOA: '1234',
        NOME: 'NOME',
        PAI: 'NOME PAI',
        MAE: 'NOME MAE',
        CPF: '04858468599',
        NASCIMENTOAPROXIMADO: '1988-04-04T00:00:00-03:00',
        RGATRIBUIDO: '164522',
        IDENTIFICACAO_CPF: '01854856988',
        NUMEROPEDIDO: '521544'
      }
    ])
  })

  it("Deve retornar array vazio ao buscar cidadão por um rg inexistente", async () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const result = sut.buscaCidadaoRg("123456")

    await expect(result).resolves.toEqual([])
  })
})

describe("Buscar Cidadão por nominal => Depreciada", () => {
  let driver: MockProxy<OracleDriver>
  let driverHelper: MockProxy<OracleDriver>
  let helper: MockProxy<HelperClass>
  let sut: OracleRepository
  const error = new Error("Fake Oracle Error")

  beforeAll(() => {
    driver = mock()
    driverHelper = mock()
    helper = mock()
  })

  beforeEach(() => {
    sut = new OracleRepository(driver, helper)
  })

  it("Deve retornar um erro ao buscar cidadão por nome", async () => {
    helper.geraNomesFonetizados.mockRejectedValueOnce(error)

    const result = sut.buscaCidadaoNominal({})
    await expect(result).rejects.toThrow(error)
  })

  it("Deve retornar array vazio ao buscar cidadão por um nome inexistente", async () => {

    helper.geraNomesFonetizados.mockResolvedValue({ v_sNome: 'any fonetic name' })
    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const result = sut.buscaCidadaoNominal({ v_sNome: 'any_value' })

    await expect(result).resolves.toEqual([])
  })

  it("Deve retornar um cidadão válido ao buscar cidadão por um nome válido", async () => {

    helper.geraNomesFonetizados.mockResolvedValue({ v_sNome: 'any citizens' })
    driver.execute.mockResolvedValue({ metadata: [], rows: [{ NUMEROPEDIDO: 184551, NUMEROPESSOA: 115524, NOME: 'Nome', PAI: 'Pai', MAE: 'Mae' }] })

    const result = sut.buscaCidadaoNominal({ v_sNome: 'Nome' })

    await expect(result).resolves.toEqual([{ NUMEROPEDIDO: 184551, NUMEROPESSOA: 115524, NOME: 'Nome', PAI: 'Pai', MAE: 'Mae'}])})
})

describe("Buscar Cidadão por nome (Parametrizada)", () => {
  let driver: MockProxy<OracleDriver>
  let driverHelper: MockProxy<OracleDriver>
  let helper: MockProxy<HelperClass>
  let sut: OracleRepository
  const error = new Error("Fake Oracle Error")

  beforeAll(() => {
    driver = mock()
    driverHelper = mock()
    helper = mock()
  })

  beforeEach(() => {
    sut = new OracleRepository(driver, helper)
  })

  it("Deve retornar um erro ao buscar cidadão por nome", async () => {
    helper.geraNomesFonetizados.mockRejectedValueOnce(error)
    driver.execute.mockRejectedValue(error)

    const result = sut.buscaCidadaoNominalParametrizada({})
    await expect(result).rejects.toThrow(error)
  })

  it("Deve retornar array vazio ao buscar cidadão por um nome inexistente (Parametrizada)", async () => {

    helper.geraNomesFonetizadosParametrizados.mockResolvedValue({ v_sNome: 'any citizens' })
    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const result = sut.buscaCidadaoNominalParametrizada({})
    await expect(result).resolves.toEqual([])
  })

  it("Deve retornar um cidadão válido ao buscar por um nome válido (Parametrizada)", async () => {
    driver.execute.mockResolvedValue({
      metadata: [],
      rows: [
        {
          NUMEROPEDIDO: 321456,
          NUMEROPESSOA: 164856,
          NOME: 'Nome',
          PAI: 'Pai',
          MAE: 'Mae',
          TOTAL: 3
        }
      ]
    })

    const result = sut.buscaCidadaoNominalParametrizada({ page: 0, v_sNome: { value: 'Marlon', exata: false, formato: 0 }, v_sNomeMae: { value: 'Elizabeth', exata: false, formato: 0 }, v_sNomePai: { value: 'Marcondes', exata: false, formato: 0 } })
    await expect(result).resolves.toEqual([{
      NUMEROPEDIDO: 321456,
      NUMEROPESSOA: 164856,
      NOME: 'Nome',
      PAI: 'Pai',
      MAE: 'Mae',
      TOTAL: 3
    }])
  })
})

describe("Buscar Cidadão na criminal por nome => Depreciada", () => {
  let driver: MockProxy<OracleDriver>
  let driverHelper: MockProxy<OracleDriver>
  let helper: MockProxy<HelperClass>

  let sut: OracleRepository
  const error = new Error("Fake Oracle Error")

  beforeAll(() => {
    driver = mock()
    helper = mock()
    driverHelper = mock()
  })

  beforeEach(() => {
    sut = new OracleRepository(driver, helper)
  })

  it("Deve retornar um erro ao buscar cidadão por nome", async () => {
    helper.geraNomesFonetizados.mockRejectedValue(error)

    const result = sut.buscaCidadaoNominalCriminal({})

    await expect(result).rejects.toThrow(error)
  })

  it("Deve retornar array vazio ao buscar cidadão na criminal por um nome inexistente", async () => {
    helper.geraNomesFonetizados.mockResolvedValue({})
    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const result = sut.buscaCidadaoNominalCriminal({})
    await expect(result).resolves.toEqual([])
  })

  it("Deve retornar um cidadão válido ao buscar cidadão na criminal por um nome válido", async () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [{ NUMEROPEDIDO: 184551, NUMEROPESSOA: 115524, NOME: 'Nome', PAI: 'Pai', MAE: 'Mae' }] })
    driverHelper.execute.mockResolvedValue({ metadata: [], rows: [{ V_SNOME: ' MARLÖM ', V_SNOMEMAE: ' EL¥ZABET ', V_SNOMEPAI: ' MARKÖMDEZ ' }] })

    sut = new OracleRepository(driver, new Helper(driverHelper))

    const result = sut.buscaCidadaoNominalCriminal({ v_sNome: 'Nome' })
    await expect(result).resolves.toEqual([{ NUMEROPEDIDO: 184551, NUMEROPESSOA: 115524, NOME: 'Nome', PAI: 'Pai', MAE: 'Mae' }])
  })
})

describe("Buscar Cidadão na criminal por nome (Parametrizada)", () => {

  let driver: MockProxy<OracleDriver>
  let driverHelper: MockProxy<OracleDriver>
  let helper: MockProxy<HelperClass>

  let sut: OracleRepository
  const error = new Error("Fake Oracle Error")

  beforeAll(() => {
    driver = mock()
    helper = mock()
    driverHelper = mock()
  })

  beforeEach(() => {
    sut = new OracleRepository(driver, helper)
  })


  it("Deve retornar um erro ao buscar cidadão por nome", async () => {
    driver.execute.mockRejectedValue(error)
    
    const result = sut.buscaCidadaoNominalCriminalParametrizada({})
    
    await expect(result).rejects.toThrow(error)
  })

  it("Deve retornar array vazio ao buscar cidadão na criminal por um nome inexistente (Parametrizada)", async () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [] })

    const result = sut.buscaCidadaoNominalCriminalParametrizada({})
    
    await expect(result).resolves.toEqual([])
  })

  it("Deve retornar um cidadão válido ao buscar na criminal por um nome válido (Parametrizada)", async () => {
    driver.execute.mockResolvedValue({ metadata: [], rows: [{ NUMEROPEDIDO: 321456, NUMEROPESSOA: 164856, NOME: 'Nome', PAI: 'Pai', MAE: 'Mae', TOTAL: 3 }]})

    const result = sut.buscaCidadaoNominalCriminalParametrizada({ page: 0, v_sNome: { value: 'nome qualquer', exata: false, formato: 0 }})
    await expect(result).resolves.toEqual([{ NUMEROPEDIDO: 321456, NUMEROPESSOA: 164856, NOME: 'Nome', PAI: 'Pai', MAE: 'Mae', TOTAL: 3 }])})
})
