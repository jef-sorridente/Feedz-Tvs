const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Destino da imagem

const imageStore = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    cb(null, `uploads/${folder}/`);
  },
  filename: (req, file, cb) => {
    // Utilização do uuid para fazer um Id unico como nome do arquivo
    const uniqueSuffix = Date.now() + "-" + uuidv4();
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Verificar bilbioteca UUID

const imageUpload = multer({
  storage: imageStore,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // Upload PNG ou JPG
      return cb(new Error("Por favor, envie apenas imagens PGN ou JPG"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };