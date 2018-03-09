import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

export const getGroups = type => (
  axios.get('Group/List', {
    params: {
      type,
    },
  })
);

export const getCreateEditInfo = (type, id) => (
  axios.get('Group/GetDealersShip', {
    params: {
      type,
      id,
    },
  })
);

export function saveOrUpdate(params) {
  return axios.post('Group/SaveOrUpdate', {
    ...params,
  });
}
