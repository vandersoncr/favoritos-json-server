const jsonServer = require("json-server");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "db.json");
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);

const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Habilitar CORS
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // ou defina sua URL do frontend ex: https://meusite.vercel.app
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

server.use(router);

// Exportar como função handler para Vercel
module.exports = (req, res) => {
  server(req, res);
};
