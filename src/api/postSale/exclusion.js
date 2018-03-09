import { instancePostSale } from '../instance';

const axios = instancePostSale();

// eslint-disable-next-line import/prefer-default-export
export function getExclusionList() {
  return axios.get('Exclusion/List');
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionDelete(Id) {
  return axios.get('Exclusion/Delete', { params: { Id } });
}

// eslint-disable-next-line import/prefer-default-export
export function getRangeList() {
  return axios.get('GroupSegment/List');
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionSegment() {
  return axios.get('ExclusionSegment/List');
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionLiquidation() {
  return axios.get('ExclusionLiq/List');
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionFamily() {
  return axios.get('ExclusionFamily/List');
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionReference(reference) {
  return axios.get('ExcludeReferences/List', { params: { reference } });
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionSave(dataForm) {
  return axios.post('Exclusion/Create',
    {
      Name: dataForm.Name,
      Description: dataForm.Description,
      Flag: dataForm.Flag,
      ParameterId: dataForm.ParameterId,
      SegmentId: dataForm.SegmentId,
      FinalRange: dataForm.FinalRange,
      InitialRange: dataForm.InitialRange,
      GroupSegment: dataForm.GroupSegment,
      Segment: dataForm.Segment,
      Family: dataForm.Family,
      Reference: dataForm.Reference,
      LiqParameter: dataForm.LiqParameter,
    },
  );
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionGetUpdate(Id) {
  return axios.get('Exclusion/GetUpdate', { params: { Id } });
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionUpdate(dataForm) {
  return axios.post('Exclusion/Update',
    {
      Id: dataForm.Id,
      Name: dataForm.Name,
      Description: dataForm.Description,
      Flag: dataForm.Flag,
      ParameterId: dataForm.ParameterId,
      SegmentId: dataForm.SegmentId,
      FinalRange: dataForm.FinalRange,
      InitialRange: dataForm.InitialRange,
      GroupSegment: dataForm.GroupSegment,
      Segment: dataForm.Segment,
      Family: dataForm.Family,
      Reference: dataForm.Reference,
      LiqParameter: dataForm.LiqParameter,
    },
  );
}

// eslint-disable-next-line import/prefer-default-export
export function getExclusionGroupSegment(Id) {
  return axios.get('ExclusionSegment/GetSegment', { params: { Id } });
}
