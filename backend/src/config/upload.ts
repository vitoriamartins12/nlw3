
import multer from 'multer';
import path from 'path';

const exportar = {
    storage:  multer.diskStorage({
        destination: path.join(__dirname, '..','..','uploads'),
        filename: (request, file, cb) => {
            const fileName = `${Date.now()}-${file.originalname}`;

            cb(null, fileName);
        },
    })
}; 
export default exportar;