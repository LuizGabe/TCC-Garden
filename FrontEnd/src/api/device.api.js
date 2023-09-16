import api from "./api";

const devicePath = "/device";

const getById = id => api.get(`${devicePath}/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`
  }
});

const Device = {
  getById
}

export {
  Device
}