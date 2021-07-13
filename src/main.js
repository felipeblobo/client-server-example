import { createServer } from 'http';
import { readFile } from 'fs';
import { resolve } from 'path';
import { parse } from 'querystring';

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
      case '/sign-in': {
        const path = resolve(__dirname, './pages/sign-in.html');
        readFile(path, (error, file) => {
          if (error) {
            res.writeHead(500, 'Erro ao processar arquivo!');
            res.end();
            return;
          }
          res.writeHead(200);
          res.write(file);
          res.end();
        })
        break;
      }

      case '/home': {
        const path = resolve(__dirname, './pages/home.html');
        readFile(path, (error, file) => {
          if (error) {
            res.writeHead(500, 'Erro ao processar arquivo!');
            res.end();
            return;
          }
          res.writeHead(200);
          res.write(file);
          res.end();

        })
        break;
      }

      case '/authenticate': {
        let data = '';
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => {
          const params = parse(data).JSON
          res.writeHead(301, {
            Location: '/home',
          })
          res.end();
        })
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