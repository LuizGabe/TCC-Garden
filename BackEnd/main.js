import express from 'express';
import { Routes } from './src/routes/index.router.js';
import { clearUserExpiredTokens } from './src/auth/User/user.revoke.token.js'
import cron from 'node-cron';
import cors from 'cors';

const port = 3000;
const app = express();

// Daily revoke tokens
cron.schedule('0 0 0 * * *', async () => clearUserExpiredTokens);

// Cors configuration
app.use(cors());

app.use(express.json())

// Middleware de log
app.use((req, res, next) => {
  console.log(
    `[${new Date().toLocaleString('pt-BR',)}] - ${req.headers["x-forwarded-for"] || req.socket.remoteAddress
    } - ${req.method} - ${req.originalUrl}`
  );
  next()
})

app.use(Routes)

// Middleware de erro
app.use((req, res) => {
  res.status(404).json({ message: 'Não encontrado' })
})

// Start server
app.listen(port, () => {
  console.log(`My server is running in ${port} 🚀🚀🚀🚀🚀`);
})