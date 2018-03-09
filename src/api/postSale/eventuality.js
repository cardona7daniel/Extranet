import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getEventualityList(periodId) {
  return axios.get('Eventuality/List', { params: { periodId } });
}

// eslint-disable-next-line import/prefer-default-export
export function getEventualityDelete(Id) {
  return axios.get('Eventuality/Delete', { params: { Id } });
}

// eslint-disable-next-line import/prefer-default-export
export function eventualitySave(dataForm) {
  return axios.post('Eventuality/Save',
    {
      Id: dataForm.Id,
      PeriodId: dataForm.PeriodId,
      Name: dataForm.Name,
      Status: dataForm.Status,
      OperatorId: dataForm.OperatorId,
      ColumnId: dataForm.ColumnId,
      SegmentId: dataForm.SegmentId,
    },
  );
}

// eslint-disable-next-line import/prefer-default-export
export function getEventualityGetUpdate(Id) {
  return axios.get('Eventuality/GetUpdate', { params: { Id } });
}

// eslint-disable-next-line import/prefer-default-export
export function eventualitySaveState(eventualityState, PeriodId) {
  return axios.get('Eventuality/SaveState', { params: { eventualityState, PeriodId } });
}

// eslint-disable-next-line import/prefer-default-export
export function getSegmentColumns(PeriodId) {
  return axios.get('Eventuality/getSegmentColumns', { params: { PeriodId } });
}

// eslint-disable-next-line import/prefer-default-export
export function dataEventualityFile(PeriodId) {
  return axios.get('Eventuality/dataEventualityFile', { params: { PeriodId } });
}
