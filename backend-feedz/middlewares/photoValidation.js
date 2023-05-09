const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Escolha uma Imagem");
      }
      return true;
    }),
  ];
};

module.exports = {
  photoInsertValidation,
};
