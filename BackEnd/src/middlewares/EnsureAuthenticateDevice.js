import jwt from "jsonwebtoken"
import { deviceTokenBlacklist } from "../auth/Device/device.revoke.token"

async function EnsureAuthenticateDevice(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({
    message: "Invalid Token"
  })

  const [_, token] = authHeader.split(" ")

  // Verificar se o token está na lista negra
  if (deviceTokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token revoked. Please login again.' });
  }

  try {
    const { sub } = jwt.verify( token, "ChaveSecreta" )

    req.userId = sub

    return next()
  }
  catch (error) {
    return res.status(401).json({
      message: "Invalid Token"
    })
  }
}

export {
  EnsureAuthenticateDevice
}