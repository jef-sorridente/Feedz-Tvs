const express = require("express");
const app = express();
const port = 3000; // Pode ser alterado para a porta desejada

// Configura a pasta de arquivos estáticos para servir o aplicativo compilado
app.use(express.static("build"));

// Define uma rota para lidar com todas as solicitações e servir o arquivo index.html do aplicativo compilado
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

// Inicia o servidor
app.listen(port, "192.168.0.250", () => {
  console.log(`Servidor rodando em http://192.168.0.250:${port}`);
});