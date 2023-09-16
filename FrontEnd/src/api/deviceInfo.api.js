import api from `./api`;

const deviceInfoPath = `/info`;

const getAll = async (token) => {
  return await api.get(`${deviceInfoPath}/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const getById = id => api.get(`${deviceInfoPath}/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const deleteManyByDeviceId = async (id, token) => {
  return await api.delete(`${deviceInfoPath}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteOneByDeviceInfoId = async (id, token) => {
  return await api.delete(`${deviceInfoPath}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const DeviceInfo = {
  getAll,
  getById,
  deleteManyByDeviceId,
  deleteOneByDeviceInfoId
}

export {
  DeviceInfo
}