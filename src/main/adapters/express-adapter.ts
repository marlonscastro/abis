
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '@/config/swaggerOptions.json';

import express, { Request, Response, Router, Express } from 'express'
import { Adapter, httpServer } from '@/main/adapters/protocols/http-server'
import { Route, Routes } from '@/main/routes/routes'

export class ExpressAdapter implements httpServer {
  private router: Router
  private app: Express

  constructor() { 
    this.router = Router()
    this.app = express();
  }

  public create: Adapter = controller => async (req: Request, res: Response) => {
    const { statusCode, data } = await controller.handle({ ...req.body, ...req.params, ...req.query })
    const json = [200, 204].includes(statusCode) ? data : { message: data.message }
    res.status(statusCode).json(json)
  }

  public addRouters(routes: Routes) {
    Object.keys(routes).forEach(verb => {
      routes[verb]?.forEach((route: Route) => { this.router[verb](route.path, this.create(route.handle)) })
    })
  }

  public addUseRouter(path: string, middleware?: any) {
    this.router.use(path, middleware)
  }

  public config(){
    this.app.use(cors())
    this.app.use(express.json());
    this.app.use(this.router)
  }

  public init(port: string | number) {
    this.config()

    this.app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

    const server = this.app.listen(port, () => {
      console.log('Server running at port: ' + port);
    });

    process.on('SIGINT', () => {
      server.close(() => {
        console.log('Servidor finalizado com sucesso!')
      })
    })
  }

  public getApp(): Express {
    this.config()
    return this.app
  }
}

