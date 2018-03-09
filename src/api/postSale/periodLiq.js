import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getPeriodList() {
  return axios.get('PeriodLiq/List');
}

// eslint-disable-next-line import/prefer-default-export
export function getPeriodDelete(Id) {
  return axios.get('PeriodLiq/Delete', { params: { Id } });
}

// eslint-disable-next-line import/prefer-default-export
export function getPeriodGetUpdate(Id) {
  return axios.get('PeriodLiq/GetUpdate', { params: { Id } });
}
// eslint-disable-next-line import/prefer-default-export
export function VerifyDataNpsLiquidation(Id) {
  return axios.get('PeriodLiq/VerifyDataNpsLiquidation', { params: { Id } });
}

// eslint-disable-next-line import/prefer-default-export
export function PeriodLiqSave(dataForm) {
  return axios.post('PeriodLiq/Save',
    {
      Id: dataForm.Id,
      Name: dataForm.Name,
      ApplyNps: dataForm.ApplyNps,
      InitialDate: dataForm.InitialDate,
      FinalDate: dataForm.FinalDate,
      Flag: dataForm.Flag,
      StateId: dataForm.StateId,
      PeriodObjective: dataForm.PeriodObjective,
      PeriodWarranty: dataForm.PeriodWarranty,
      Eventuality: dataForm.Eventuality,
    },
  );
}
