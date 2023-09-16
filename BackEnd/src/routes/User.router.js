import { Router } from 'express';

import { User } from '../models/Database.js';
import { EnsureAuthenticateUser } from '../middlewares/EnsureAuthenticateUser.js';
import { userTokenBlacklist } from '../auth/User/user.revoke.token.js';
import { userGenerateToken } from '../auth/User/user.generate.token.js';
import { verifyEmailAndPassword } from '../utils/verifyEmailAndPassword.js';

const UserRouter = Router();

// Get all users from database
// TODO: Adicionar o middleware de autenticação apos testes
UserRouter.get('/All', async (req, res) => {
  const result = await User.getAllUsers()
  res.status(200).json(result);
})

// Register user
UserRouter.post('/register', async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password e nome são obrigatórios' })
  }
  if (!verifyEmailAndPassword({ email, password })) {
    return res.status(400).json({ error: 'Email ou senha inválidos' });
  }

  const userExists = await User.getUserByEmail(email);
  if (userExists) {
    return res.status(400).json({ error: 'Usuário já existe' });
  }

  User.createUser(email, password, name, "user")
    .then((result) => {
      res.status(201).json({
        message: 'User created',
        user: {
          id: result.id,
          name: result.name,
          email: result.email
        }
      })
    })
    .catch((error) => {
      res.status(400).json({ error: 'Erro criando usuário' })
      console.log(`Error creating user: ${error}`);
    })
})

// Authenticate user
UserRouter.post('/login', async (req, res) => {
  const { email, password } = req.body

  const userExist = await User.getUserByEmail(email);
  if (!userExist) {
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }

  if (userExist.password !== password) return res.status(400).json({ error: 'Email ou senha inválidos' });

  if (userExist.id) {
    return res.status(200).json({
      id: userExist.id,
      userData: {
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
        createdAt: userExist.createdAt
      },
      token: userGenerateToken(userExist.id)
    })
  }

  console.log(`Error creating user: ${userExist.id}`);
  res.status(400).json({ error: 'Email ou senha inválidos' });
})

// Get user by Id
UserRouter.get('/:id', EnsureAuthenticateUser, async (req, res) => {
  const id = req.params.id
  const result = await User.getUserById(id)
  res.status(200).json(result);
})

// Update user
UserRouter.put('/:id', EnsureAuthenticateUser, async (req, res) => {
  const { email, password } = req.body
  const id = req.params.id

  if (email === undefined || password === undefined) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' })
  }

  const result = await User.updateUser(id, email, password)
  res.status(200).json(result);
})

// Delete user
UserRouter.delete('/:id', EnsureAuthenticateUser, async (req, res) => {
  const id = req.params.id
  const token = req.headers.authorization.split(" ")[1];

  const userExists = await User.getUserById(id);
  if (!userExists) {
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }
  // Revoke token
  userTokenBlacklist.add(token);

  User.deleteUser(id)
    .then(() => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: 'Erro deletando usuário'
      });
      console.log(`Error deleting user: ${error}`);
    })
})

// TODO: Remove this route
UserRouter.put('/revoke', async (req, res) => {
  clearExpiredTokens()
})

UserRouter.post('/logout', async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  userTokenBlacklist.add(token);
  res.status(200).json({ message: 'Logged out' });
})

UserRouter.post('/isAuthenticated', EnsureAuthenticateUser, async (req, res) => {
  res.status(200).json({ message: 'Authenticated' });
})

export { UserRouter };