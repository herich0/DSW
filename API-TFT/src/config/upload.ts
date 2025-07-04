import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

//dirname deve se usar 2 underlines.
const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default{
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    }
  })
}
