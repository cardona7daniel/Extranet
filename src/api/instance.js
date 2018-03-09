import axios from 'axios';

export function instanceNewVehicle() {
  return axios.create({
    baseURL: process.env.REACT_APP_PATH_API,
  });
}

export function instancePostSale() {
  return axios.create({
    baseURL: process.env.REACT_APP_PATH_API_POST_SALES,
  });
}
