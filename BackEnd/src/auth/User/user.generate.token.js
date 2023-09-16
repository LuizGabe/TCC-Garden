import jwt from 'jsonwebtoken';

const privateKey = 'ChaveSecreta';

const userGenerateToken = (id) => {
  return jwt.sign({ id: id }, privateKey, {
    subject: String(id),
    expiresIn: '1d'
  })
}

export {
  userGenerateToken
}