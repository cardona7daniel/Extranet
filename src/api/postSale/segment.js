import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getSegmentList() {
  return axios.get('GroupSegment/ListAll');
}

// eslint-disable-next-line import/prefer-default-export
export function segmentSave(dataForm) {
  return axios.post('GroupSegment/Create',
    {
      Id: dataForm.Id,
      Name: dataForm.Name,
      Description: dataForm.Description,
      Objective: dataForm.Objective,
      Flag: dataForm.Flag,
      GroupSegment: dataForm.GroupSegment,
    },
  );
}

// eslint-disable-next-line import/prefer-default-export
export function getSegmentGetUpdate(Id) {
  return axios.get('GroupSegment/GetUpdate', { params: { Id } });
}

// eslint-disable-next-line import/prefer-default-export
export function getSegmentUpdate(dataForm) {
  return axios.post('GroupSegment/Update',
    {
      Id: dataForm.Id,
      Name: dataForm.Name,
      Description: dataForm.Description,
      Objective: dataForm.Objective,
      Flag: dataForm.Flag,
      GroupSegment: dataForm.GroupSegment,
    },
  );
}
