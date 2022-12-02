import authMiddleware from '@/app/middleware/authMiddleware';

import { httpServer } from '@/main/adapters/protocols/http-server';
import { makeHttpServer } from '@/main/factories/http-server-factory';
import { routes } from './routes'

const httpServer: httpServer = makeHttpServer()

httpServer.addUseRouter('/wsCivil', authMiddleware)
httpServer.addUseRouter('/wsCriminal', authMiddleware)
httpServer.addRouters(routes)

export default httpServer