import 'dotenv/config';
import './config/module-alias'

import httpServer from './main/routes';

const PORT = process.env.PORT || 8080

httpServer.init(PORT)
