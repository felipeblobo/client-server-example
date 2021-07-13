import { createServer } from 'http';

const port = process.env.PORT ? parseInt(process.env.PORT) : 8001;
const hostname = process.env.HOSTNAME || '127.0.0.1';

const server = createServer((req, res) => {
    switch(req.url) {
      case '/status': {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.write(JSON.stringify({
          status: 'Ok'
        }));
        res.end();
        break;
      }
    default: {
      res.writeHead(400, 'Serviço não encontrado.');
      res.end();
      break;
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Servidor rodando na Porta ${port}`);
})