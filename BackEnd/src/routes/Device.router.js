import { Router } from 'express';
import { Device, User } from '../models/Database.js';
import { deviceGenerateToken } from '../auth/Device/device.generate.token.js'

const DeviceRouter = Router();

// Get all devices from database
DeviceRouter.get('/All', async (req, res) => {
  const result = await Device.getAllDevices()
  res.status(200).json(result);
})

// Cadastrar um novo dispositivo
DeviceRouter.post('/register', async (req, res) => {
  const { name, type, userId } = req.body;

  // Name, type e userId verificação
  if (!name || !type || !userId) {
    return res.status(400).json({ message: 'Name, type e userId são obrigatórios' });
  }

  // UserId verificação
  const userExists = await User.getUserById(userId);
  if (!userExists) {
    return res.status(400).json({ message: 'Usuário não encontrado' });
  }

  const newDevice = {
    name: String(name),
    type: String(type),
    user: String(userId),
    permanetToken: '', // Vamos definir temporariamente como uma string vazia
  };

  // Adicionar dispositivo e obter o resultado
  const resultFromAdd = await Device.addDevice(newDevice.user, newDevice.name, newDevice.permanetToken, newDevice.type);

  // Gerar token permanente
  console.log(`Creating token for deviceId: ${resultFromAdd.id}`);
  const token = deviceGenerateToken(resultFromAdd.id); // Certifique-se de que deviceGenerateToken esteja implementada corretamente
  console.log(`Token: ${token}`);
  newDevice.permanetToken = token;

  // Atualizar informações do dispositivo com o token permanente
  const result = await Device.updateDevice(resultFromAdd.id, newDevice);

  res.status(201).json(result);
});


// Get device by Id
DeviceRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const result = await Device.getDeviceById(id)
  res.status(200).json(result);
})

DeviceRouter.put('/:id', async (req, res) => {
  const deviceId = req.params.id
  const newName = req.body.name

  const deviceExists = !!await Device.getDeviceById(deviceId)

  if (newName === undefined || !deviceExists) {
    return res.status(400).json({ error: 'Name or Device id are required' })
  }

  const result = await Device.updateDeviceName(deviceId, newName)
  res.status(200).json(result);
})


export { DeviceRouter }