import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.4.1:80',
});

const getData = () => {
  return api.get('/')
}

export {
  getData
}