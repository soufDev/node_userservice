import http from 'http';
import app from '../app';
import Config from '../core/config/config.dev';

// retreive the Server Port
const { serverPort } = Config;

app.set('port', serverPort);
const server = http.createServer(app);
server.listen(serverPort, () => {
  console.info('Hey its Working on', serverPort);
});

export default server;
