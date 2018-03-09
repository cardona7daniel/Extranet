import { instanceNewVehicle } from '../instance';

const axios = instanceNewVehicle();

export function generateNonDerogateLiquidation(periodId) {
  return axios.get('DerogateLiquidation/CreateNonDerogateLiquidation', { params: { Period: periodId } });
}

export function exportNonDerogateLiquidation(periodId) {
  return axios.get('DerogateLiquidation/ExportNonDerogateLiquidation', { params: { Period: periodId } });
}
