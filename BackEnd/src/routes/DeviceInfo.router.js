import { Router } from "express";
import { Device, DeviceInfo } from "../models/Database.js";

const DeviceInfoRouter = Router();

// Get All Device Infos
DeviceInfoRouter.get('/All', async (req, res) => {
  const result = await DeviceInfo.getAllDevicesInfos()
  res.status(200).json(result);
})

// Get All Device Infos By Device Id
DeviceInfoRouter.get('/:id', async (req, res) => {
  const id = req.params.id
  const result = await DeviceInfo.getAllDevicesInfosByDeviceId(id)
  res.status(200).json(result);
})

// Delete one Device Info by id
DeviceInfoRouter.delete('/:id', async (req, res) => {
  const id = req.params.id
  
  const DeviceInfoExists = !!await DeviceInfo.getDeviceInfoById(id)
  if(!DeviceInfoExists) {
    return res.status(400).json({ error: 'Device Info id is required' })
  }

  const result = await DeviceInfo.deleteDeviceInfoById(id)
  res.status(200).json(result);
})

// Delete all Devices Info By DeviceID
DeviceInfoRouter.delete('/All/:id', async (req, res) => {
  const id = req.params.id
  
  const DeviceExists = !!await Device.getDeviceById(id)
  if(!DeviceExists) {
    return res.status(400).json({ error: 'Device Info id is required' })
  }

  const result = await DeviceInfo.deleteAllDeviceInfoByDeviceId(id)
  res.status(200).json(result);
})

// Add Device Info
DeviceInfoRouter.post('/', async (req, res) => {
  //TODO: Esperar o middleware de autenticação antes
})

export { DeviceInfoRouter }