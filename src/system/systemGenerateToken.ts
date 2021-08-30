import * as jwt from  'jsonwebtoken';

function generateToken(idUser: string){
  return jwt.sign({user_id: idUser}, process.env.SECRET_HASH_KEY, {
    expiresIn: 86400
  });
}


export { generateToken };
