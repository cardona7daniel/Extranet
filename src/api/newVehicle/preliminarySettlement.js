import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

// eslint-disable-next-line import/prefer-default-export
export function getGenerateSettlement(periodId) {
  return axios.get('PreliminaryLiquidation/CreatePreliminaryLiquidation', { params: { Period: periodId } });
}
