import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

export function getAllAccomplish() {
  return axios.get('Accomplish/GetAllAccomplish');
}

export function saveAccomplishments(params) {
  return axios.post('Accomplish/SaveAccomplishments', params);
}

export const removeAccomplishments = params => axios.get('Accomplish/Remove', { params });
