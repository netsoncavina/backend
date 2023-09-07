const multer = require("multer");
const Path = require("path");

// Configuração para armazenar os arquivos no disco
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

// Validação do arquivo
const fileFilter = (req, file, callback) => {
  const validExts = [".jpg", ".jpeg", ".png"];

  if (!validExts.includes(Path.extname(file.originalname))) {
    return callback(new Error("Somente imagens são permitidas"));
  }

  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 1048576) {
    return callback(new Error("Arquivo muito grande"));
  }

  callback(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  fileSize: 1048576,
});

module.exports = upload.single("image");
