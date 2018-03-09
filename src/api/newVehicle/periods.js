import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

// eslint-disable-next-line import/prefer-default-export
export function getPeriod(isPreliminar = true) {
  if (isPreliminar === true) {
    return axios.get('Period/GetExistPeriod');
  }
  return axios.get('Period/GetExistPeriodLsd');
}

export const getPeriods = () => axios.get('Period/List');

export const getPeriodsWithEventualities = () => axios.get('Period/ListWithEventualities');

export const getPeriodsWithLiquidation = () => axios.get('Period/ListWithLiquidation');

export const getPeriodById = id => axios.get('Period/GetPeriod', { params: { id } });

export const saveOrUpdatePeriod = params => axios.post('Period/SaveOrUpdate', { ...params });

export const removePeriod = id => axios.get('Period/Remove', { params: { id } });
