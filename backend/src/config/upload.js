const multer = require("multer");
const path = require("path");

module.exports = {
    // save files on disk storage
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const ext  = path.extname(file.originalname); // busca a extensão
            const name = path.basename(file.originalname, ext); // utiliza o nome original do arquivo

            cb(null, `${name}-${Date.now()}${ext}`);
        }
    })
}