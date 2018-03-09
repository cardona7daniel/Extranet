import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

export function getAllExclusion() {
  return axios.get('Exclusion/List');
}

export function getAllFamilyVehiclesColumnsExclusion(typeColumns, id = null) {
  return axios.get('Exclusion/ListFamilyVehicleColumns', {
    params: {
      type: typeColumns,
      id,
    },
  });
}

export function saveOrUpdate(params) {
  return axios.post('Exclusion/SaveOrUpdate', {
    ...params,
  });
}
