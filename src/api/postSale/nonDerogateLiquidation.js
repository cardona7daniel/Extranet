import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getNamesPeriodLiquidation() {
  return axios.get('nonDerogateLiquidation/NamesPeriodLiquidation');
}

// eslint-disable-next-line import/prefer-default-export
export function getObjectiveWarrantyPeriodLiquidation(periodId, type) {
  return axios.get('nonDerogateLiquidation/getObjectiveWarrantyPeriodLiquidation', { params: { periodId, type } });
}

// eslint-disable-next-line import/prefer-default-export
export function getStatePeriodLiquidation() {
  return axios.get('nonDerogateLiquidation/StatePeriodLiquidation');
}

// eslint-disable-next-line import/prefer-default-export
export function getState() {
  return axios.get('nonDerogateLiquidation/getStates');
}

// eslint-disable-next-line import/prefer-default-export
export function getObjectivePeriod() {
  return axios.get('nonDerogateLiquidation/ObjectivePeriodList');
}

// eslint-disable-next-line import/prefer-default-export
export function getWarrantyPeriod() {
  return axios.get('nonDerogateLiquidation/WarrantyPeriodList');
}

// eslint-disable-next-line import/prefer-default-export
export function saveObjectiveWarrantyPeriod(year, month, periodId, type) {
  return axios.get('nonDerogateLiquidation/SaveObjectiveWarrantyPeriod', { params: { year, month, periodId, type } });
}

// eslint-disable-next-line import/prefer-default-export
export function getLastPeriod() {
  return axios.get('Period/GetLastPeriod');
}

// eslint-disable-next-line import/prefer-default-export
export function setStatePeriod(periodId, index) {
  return axios.get('nonDerogateLiquidation/setStatePeriod', {
    params: { periodId, index },
  });
}

// eslint-disable-next-line import/prefer-default-export
export function exportExcelLiquidation(periodId, generateLiquidation) {
  return axios.get('nonDerogateLiquidation/ExportNonDerogateLiquidation', {
    params: { periodId, generateLiquidation },
  });
}

// eslint-disable-next-line import/prefer-default-export
export function requestverifyDataLiquidation(periodId) {
  return axios.get('nonDerogateLiquidation/VerifyDataLiquidation', {
    params: { periodId },
  });
}

