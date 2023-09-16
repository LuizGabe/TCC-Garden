import jwt from 'jsonwebtoken';

const privateKey = 'ChaveSecreta';

const deviceGenerateToken = (id) => {
  return jwt.sign({ id: id }, privateKey, {
    subject: String(id),
  })
}

export {
  deviceGenerateToken
}