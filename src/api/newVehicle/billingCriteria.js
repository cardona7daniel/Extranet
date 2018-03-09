import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

export function getBillingCriteria(periodId) {
  return axios.get('BillingCriteria/ListWithSelected', {
    params: {
      periodId,
    },
  });
}

export function getAllBillingCriteria() {
  return axios.get('BillingCriteria/List');
}

export function getAllFamilyVehicles(id = null) {
  return axios.get('BillingCriteria/ListFamilyVehicle', {
    params: {
      id,
    },
  });
}

export function saveBillingCriteria(idsBillingCriteria, periodId) {
  return axios.post('BillingCriteriaPeriod/Save', {
    idsBillingCriteria,
    periodId,
  });
}

export function saveOrUpdate(params) {
  return axios.post('BillingCriteria/SaveOrUpdate', {
    ...params,
  });
}
