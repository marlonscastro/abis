import { ExpressAdapter } from '@/main/adapters'
import { Controller } from '@/data/controllers/controller'
import { mock, MockProxy } from 'jest-mock-extended'
import { NextFunction, RequestHandler, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'

describe("Express Adapter", () => {
  let req: Request
  let res: Response
  let next: NextFunction
  let controller: MockProxy<Controller>
  let sut: RequestHandler

  beforeAll(() => {
    req = getMockReq({ body: { anyBody: 'any_body' } })
    res = getMockRes().res
    next = getMockRes().next
    controller = mock()
    controller.handle.mockResolvedValue({
      statusCode: 200,
      data: { data: 'any_data' }
    })
  })

  beforeEach(() => {
    sut = new ExpressAdapter().create(controller)
  })

  it('Deve chamar o metodo handle com os parametros corretos', async () => {
    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({ anyBody: 'any_body' })
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })

  it('Deve chamar o metodo handle com requisição vazia', async () => {
    const req = getMockReq()

    await sut(req, res, next)

    expect(controller.handle).toHaveBeenCalledWith({})
    expect(controller.handle).toHaveBeenCalledTimes(1)
  })  

  it('deve retornar status code 200 e dados validos', async () => {
    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ data: 'any_data' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('deve resultar no status code 204 e data vazio', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 204,
      data: null
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(null)
    expect(res.json).toHaveBeenCalledTimes(1)
  })  

  it('deve resultar em status code 400 com erro', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 400,
      data: new Error('any_error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ message: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  it('deve retornar status code 500 com erro valido', async () => {
    controller.handle.mockResolvedValueOnce({
      statusCode: 500,
      data: new Error('any_error')
    })

    await sut(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ message: 'any_error' })
    expect(res.json).toHaveBeenCalledTimes(1)
  })  

})