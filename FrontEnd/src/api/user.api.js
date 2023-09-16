import api from "./api";

const userPath = "/user";

const login = async (email, password) => {
  const userDataLogin = {
    email: email,
    password: password
  }
  return await api.post(`${userPath}/login`, userDataLogin);
}

const register = async (email, password, name) => {
  const userDataRegister = {
    email: email,
    password: password,
    name: name
  }
  return await api.post(`${userPath}/register`, userDataRegister);
}

const getAllUsers = async (token) => {
  return await api.get(`${userPath}/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const deleteUser = async (id, token) => {
  return await api.delete(`${userPath}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// TODO: Implement this function
const updateUser = async (id, token, userData) => {
  return await api.put(`${userPath}/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const isAuthenticated = async ( token ) => {
  return await api.post(`${userPath}/isAuthenticated`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

const User = {
  login,
  register,
  getAllUsers,
  deleteUser,
  isAuthenticated
}

export {
  User 
}