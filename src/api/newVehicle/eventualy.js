import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

export const getEventualitiesByPeriod = periodId => axios.get('Eventuality/ListByPeriod', { params: { periodId } });

export const getEventuality = id => axios.get('Eventuality/Get', { params: { id } });

export const getColumnsEventuality = type => axios.get('Column/List', { params: { type } });

export const getListLogEventualities = periodId => axios.get('Eventuality/ListLogEventualities', { params: { periodId } });

export function saveOrUpdate(params) {
  return axios.post('Eventuality/SaveOrUpdate', {
    ...params,
  });
}
