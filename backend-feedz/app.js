require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3005;
const host = process.env.DB_HOST || "localhost";

//Config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// solve CORS (Problema quando executa as requisições pelo mesmo domínio)
app.use(cors({ credentials: true, origin: "http://192.168.0.250:3000" }));

// Upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connection
require("./config/db.js");

//routes
const router = require("./routes/Router.js");

app.use(router);

app.listen(port, host, () => {
  console.log(`App rodando em http://${host}:${port}`);
});
