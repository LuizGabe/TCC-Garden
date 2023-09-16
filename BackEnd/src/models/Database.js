import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function getUserById(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error('Erro ao obter o usuário:', error);
  }
}
async function createUser(email, password, name, role) {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        role
      },
    });
    return user;
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  }
}

async function updateDeviceName(deviceId, newName) {
  try {
    const updatedDevice = await prisma.device.update({
      where: { id: deviceId },
      data: { nome: newName },
    });
    return updatedDevice;
  } catch (error) {
    console.error('Erro ao atualizar o nome do dispositivo:', error);
  }
}

async function addDeviceInfo(deviceId, informacao) {
  try {
    const deviceInfo = await prisma.deviceInfo.create({
      data: {
        idDoDispositivo: deviceId,
        informacao,
      },
    });
    return deviceInfo;
  } catch (error) {
    console.error('Erro ao adicionar informações ao dispositivo:', error);
  }
}
async function addDevice(userId, name, permanentToken, type) {
  try {
    const device = await prisma.device.create({
      data: {
        name,
        permanentToken,
        type,
        user: userId
      }
    });
    return device;
  } catch (error) {
    console.error('Erro ao adicionar dispositivo:', error);
  }
}

async function deleteUser(userId) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: userId },
    });
    return deletedUser;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
  }
}
async function deleteDeviceInfoById(deviceInfoId) {
  try {
    const deletedDeviceInfo = await prisma.deviceInfo.delete({
      where: { id: deviceInfoId },
    });
    return deletedDeviceInfo;
  } catch (error) {
    console.error('Erro ao excluir informações do dispositivo:', error);
  }
}
async function updateUser(userId, email, password) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        password
      },
    });
    return updatedUser;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
  }
}
async function getAllUsers() {
  try {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  } catch (error) {
    console.error('Erro ao obter todos os usuários:', error);
  }
}
async function getAllDevices() {
  try {
    const allDevices = await prisma.device.findMany();
    return allDevices;
  } catch (error) {
    console.error('Erro ao obter todos os dispositivos:', error);
  }
}

async function getDeviceById(deviceId) {
  try {
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });
    return device;
  } catch (error) {
    console.error('Erro ao obter dispositivo pelo ID:', error);
  }
}
async function getDeviceByUserId(userId) {
  try {
    const devices = await prisma.device.findMany({
      where: { userId: userId },
    });
    return devices;
  } catch (error) {
    console.error('Erro ao obter dispositivos pelo ID do usuário:', error);
  }
}
async function getAllDevicesInfos() {
  try {
    const allDeviceInfos = await prisma.deviceInfo.findMany();
    return allDeviceInfos;
  } catch (error) {
    console.error('Erro ao obter todas as informações dos dispositivos:', error);
  }
}
async function getAllDevicesInfosByDeviceId(deviceId) {
  try {
    const deviceInfos = await prisma.deviceInfo.findMany({
      where: { device: { id: deviceId } },
    });
    return deviceInfos;
  } catch (error) {
    console.error('Erro ao obter informações dos dispositivos pelo ID do dispositivo:', error);
  }
}
async function getDeviceInfoById(deviceInfoId) {
  try {
    const deviceInfo = await prisma.deviceInfo.findUnique({
      where: { id: deviceInfoId },
    });
    return deviceInfo;
  } catch (error) {
    console.error('Erro ao obter informações do dispositivo pelo ID:', error);
  }
}
async function deleteAllDeviceInfoByDeviceId(deviceId) {
  try {
    const deletedDeviceInfos = await prisma.deviceInfo.deleteMany({
      where: { device: { id: deviceId } },
    });
    return deletedDeviceInfos;
  } catch (error) {
    console.error('Erro ao excluir informações dos dispositivos pelo ID do dispositivo:', error);
  }
}

async function getUserByEmail(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error('Erro ao obter usuário pelo email:', error);
  }
}

async function updateDevice(id, data) {
  try {
    const updatedDevice = await prisma.device.update({
      where: { id: id },
      data: data,
    });
    return updatedDevice;
  } catch (error) {
    console.error('Erro ao atualizar dispositivo:', error);
  }
}

const User = {
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserByEmail
}
const Device = {
  addDevice,
  getAllDevices,
  getDeviceById,
  getDeviceByUserId,
  updateDeviceName,
  updateDevice
}
const DeviceInfo = {
  addDeviceInfo,
  getAllDevicesInfos,
  getAllDevicesInfosByDeviceId,
  deleteDeviceInfoById,
  getDeviceInfoById,
  deleteAllDeviceInfoByDeviceId
}

export {
  User,
  Device,
  DeviceInfo
}