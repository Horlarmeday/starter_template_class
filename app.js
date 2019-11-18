import './src/startup/logger';
import './src/startup/database';

import winston from 'winston';
import server from './src/startup/server';
import config from './src/config/secret';

server.listen(config.port, () => winston.info(`Running on port ${config.port}...`));
