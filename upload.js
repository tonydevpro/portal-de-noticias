const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'publica/img');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // .png, .jpg, etc
        const nomeArquivo = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, nomeArquivo);
    }
});

const upload = multer({ storage });

module.exports = upload;
