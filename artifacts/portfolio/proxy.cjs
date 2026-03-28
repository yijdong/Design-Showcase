#!/usr/bin/env node
// Opens port 21113 immediately (satisfies health check), spawns Vite on 21115,
// and proxies all traffic between them.
const http = require('http');
const net = require('net');
const { spawn } = require('child_process');

const PROXY_PORT = 21113;
const VITE_PORT = 21115;

// Spawn Vite as a child process on a different port
const vite = spawn(
  'pnpm',
  ['--filter', '@workspace/portfolio', 'run', 'dev'],
  {
    env: { ...process.env, PORT: String(VITE_PORT), BASE_PATH: '/' },
    stdio: 'inherit',
    cwd: '/home/runner/workspace',
  }
);
vite.on('exit', (code) => process.exit(code ?? 0));

// HTTP proxy: forward all requests to Vite
const server = http.createServer((req, res) => {
  const opts = {
    hostname: 'localhost',
    port: VITE_PORT,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };
  const proxy = http.request(opts, (r) => {
    res.writeHead(r.statusCode, r.headers);
    r.pipe(res, { end: true });
  });
  proxy.on('error', () => { res.writeHead(502); res.end(); });
  req.pipe(proxy, { end: true });
});

// WebSocket proxy (Vite HMR)
server.on('upgrade', (req, socket, head) => {
  const conn = net.connect(VITE_PORT, 'localhost', () => {
    const lines = [`${req.method} ${req.url} HTTP/1.1`];
    for (const [k, v] of Object.entries(req.headers)) lines.push(`${k}: ${v}`);
    conn.write(lines.join('\r\n') + '\r\n\r\n');
    if (head && head.length) conn.write(head);
  });
  socket.pipe(conn);
  conn.pipe(socket);
  conn.on('error', () => socket.destroy());
  socket.on('error', () => conn.destroy());
});

// Bind to 21113 immediately — this is what the health check detects
server.listen(PROXY_PORT, '0.0.0.0', () => {
  console.log(`[proxy] :%d → :%d`, PROXY_PORT, VITE_PORT);
});
