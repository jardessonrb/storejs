import multer from 'multer';
import path from 'path';

function renameFile(nameProduct: string, originalName: string){
  const nameSplit = nameProduct.split(" ");
  const originalNameSplit = originalName.split(".");
  let extencion = originalNameSplit[originalNameSplit.length - 1];

  let name = "";
  for(let i = 0; i < nameSplit.length; i ++){
    name += nameSplit[i] + "-";
  }

  name = `${name.substring(0, name.length - 1)}.${extencion}`;

  return name;
}

export default {
    storage: multer.diskStorage({
        destination: function(request, file, cb){
           const destination =  path.join(__dirname, '..', 'uploads');
           cb(null, destination);
        },
        filename: (request, file, callBack) => {
            const { name_product } = request.body;
            const filename = `${Date.now()}-${renameFile(name_product, file.originalname)}`;

            callBack(null, filename);
        }
    })
}
