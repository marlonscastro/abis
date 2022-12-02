import 'dotenv/config'
import e from 'express'
import request from 'supertest'
import { ExpressAdapter } from '.'
import { routes } from '@/main/routes/routes'
import authMiddleware from '@/app/middleware/authMiddleware'

const paramsBuscaNominalParametrizada = {
  "page": 0,
  "v_sNome": {
    "value": "xxx1",
    "exata": false,
    "formato": 0
  }
}

describe("### /wsCivil ###", () => {
  let app: e.Express
  let httpServer: ExpressAdapter

  beforeEach(() => {
    httpServer = new ExpressAdapter()
    httpServer.addUseRouter('/wsCivil', authMiddleware)
    httpServer.addUseRouter('/wsCriminal', authMiddleware)
    httpServer.addRouters(routes)
    app = httpServer.getApp()
  })

  it("[e2e] (Deprecated) Buscar por RG válido '/wsCivil/BuscarPorRG/{rg}'", async () => {
    const response = await request(app).get('/wsCivil/BuscarPorRG/7620643')

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('NOME')
    expect(response.body[0]).toHaveProperty('PAI')
    expect(response.body[0]).toHaveProperty('MAE')
  })

  it("[e2e] (Deprecated) Buscar por RG invalido '/wsCivil/BuscarPorRG/{invalid_rg}'", async () => {
    const response = await request(app).get('/wsCivil/BuscarPorRG/1000')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'A Busca não encontrou resultados!' })
  })

  it("[e2e] Buscar Cidadão por RG válido '/wsCivil/BuscarCidadaoPorRG/{rg}'", async () => {
    const response = await request(app).get('/wsCivil/BuscarCidadaoPorRG/7620643')

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('Nome')
    expect(response.body[0]).toHaveProperty('Pai')
    expect(response.body[0]).toHaveProperty('Mae')
  })

  it("[e2e] Buscar Cidadão por RG invalido '/wsCivil/BuscarCidadaoPorRG/{invalid_rg}'", async () => {
    const response = await request(app).get('/wsCivil/BuscarCidadaoPorRG/1000')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'A Busca não encontrou resultados!' })
  })

  it("[e2e] Buscar Cidadão por nome válido '/wsCivil/BuscarCidadaoNominal?v_sNome=any name'", async () => {
    const response = await request(app).get('/wsCivil/BuscarCidadaoNominal?v_sNome=joao%20carlos%20alves%20da%20silva')

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('Nome')
    expect(response.body[0]).toHaveProperty('Pai')
    expect(response.body[0]).toHaveProperty('Mae')
  })

  it("[e2e] Buscar Cidadão por nome inexistente '/wsCivil/BuscarCidadaoNominal?v_sNome=invalid name'", async () => {
    const response = await request(app).get('/wsCivil/BuscarCidadaoNominal?v_sNome=xxx1')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'A Busca não encontrou resultados!' })
  })

  it("[e2e] Buscar Cidadão por nome válido !!! Rota Parametrizada !!! '/wsCivil/BuscarCidadaoNominal?v_sNome=any name'", async () => {
    const response = await request(app).post('/wsCivil/BuscarCidadaoNominalParametrizada').send({
      "page": 0,
      "v_sNome": {
        "value": "Marlon Santos Castro",
        "exata": false,
        "formato": 0
      }
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('registros')
    expect(response.body).toHaveProperty('total')
    expect(response.body.registros[0]).toHaveProperty('Nome')
    expect(response.body.registros[0]).toHaveProperty('Pai')
    expect(response.body.registros[0]).toHaveProperty('Mae')
  })


  it("[e2e] Buscar Cidadão por nome inexistente !!! Rota Parametrizada !!! '/wsCivil/BuscarCidadaoNominal?v_sNome=any name'", async () => {
    const response = await request(app).post('/wsCivil/BuscarCidadaoNominalParametrizada').send(paramsBuscaNominalParametrizada)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'A Busca não encontrou resultados!' })
  })

})

describe("### /wsCriminal ###", () => {
  let app: e.Express
  let httpServer: ExpressAdapter

  beforeEach(() => {
    httpServer = new ExpressAdapter()
    httpServer.addUseRouter('/wsCivil', authMiddleware)
    httpServer.addUseRouter('/wsCriminal', authMiddleware)
    httpServer.addRouters(routes)
    app = httpServer.getApp()
  })

  it("[e2e] Buscar Cidadão na Criminal por nome válido '/wsCriminal/BuscarCidadaoNominal?v_sNome=any name'", async () => {
    const response = await request(app).get('/wsCriminal/BuscarCidadaoNominal?v_sNome=Rafael souto raimundo')

    expect(response.status).toBe(200)
    expect(response.body[0]).toHaveProperty('Nome')
    expect(response.body[0]).toHaveProperty('Pai')
    expect(response.body[0]).toHaveProperty('Mae')
  })

  it("[e2e] Buscar Cidadão na Criminal por nome inexistente '/wsCriminal/BuscarCidadaoNominal?v_sNome=invalid name'", async () => {
    const response = await request(app).get('/wsCriminal/BuscarCidadaoNominal?v_sNome=xxx1')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'A Busca não encontrou resultados!' })
  })

  it("[e2e] Buscar dados Criminais do cidadão por nome válido !!! Rota Parametrizada !!! '/wsCriminal/BuscarCidadaoNominal?v_sNome=any name'", async () => {
    const response = await request(app).post('/wsCriminal/BuscarCidadaoNominalParametrizada').send({
      "page": 0,
      "v_sNome": {
        "value": "diego david da silva barros",
        "exata": false,
        "formato": 0
      }
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('registros')
    expect(response.body).toHaveProperty('total')
    expect(response.body.registros[0]).toHaveProperty('Nome')
    expect(response.body.registros[0]).toHaveProperty('Pai')
    expect(response.body.registros[0]).toHaveProperty('Mae')
  })


  it("[e2e] Buscar dados Criminais do cidadão por nome inexistente !!! Rota Parametrizada !!! '/wsCriminal/BuscarCidadaoNominal?v_sNome=any name'", async () => {
    const response = await request(app).post('/wsCriminal/BuscarCidadaoNominalParametrizada').send(paramsBuscaNominalParametrizada)

    expect(response.status).toBe(404)
    expect(response.body).toEqual({ message: 'A Busca não encontrou resultados!' })
  })

})