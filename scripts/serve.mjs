// Tiny local preview server for dist/. `npm run dev`, then open http://localhost:8080
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
const port = Number(process.env.PORT) || 8080;

http
  .createServer((req, res) => {
    let p = path.join('dist', decodeURIComponent(new URL(req.url, 'http://x').pathname));
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
    if (!fs.existsSync(p)) {
      res.writeHead(404, { 'Content-Type': types['.html'] });
      return fs.createReadStream('dist/404.html').pipe(res);
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' });
    fs.createReadStream(p).pipe(res);
  })
  .listen(port, () => console.log(`Previewing dist/ at http://localhost:${port}`));
