import {
  REQUEST_EXCLUSION_LIST,
  REQUEST_EXCLUSION_LIST_SUCCESS,
  REQUEST_EXCLUSION_LIST_EMPTY,
  REQUEST_EXCLUSION_LIST_FAILED,
  REQUEST_EXCLUSION_DELETE_SUCCESS,
  REQUEST_EXCLUSION_DELETE_FAILED,
  REQUEST_EXCLUSION_RANGE_SUCCESS,
  REQUEST_EXCLUSION_RANGE_FAILED,
  REQUEST_EXCLUSION_SEGMENT_LIST_SUCCESS,
  REQUEST_EXCLUSION_SEGMENT_LIST_EMPTY,
  REQUEST_EXCLUSION_SEGMENT_LIST_FAILED,
  REQUEST_EXCLUSION_LIQUIDATION_SUCCESS,
  REQUEST_EXCLUSION_LIQUIDATION_FAILED,
  REQUEST_EXCLUSION_FAMILY,
  REQUEST_EXCLUSION_FAMILY_SUCCESS,
  REQUEST_EXCLUSION_FAMILY_FAILED,
  REQUEST_EXCLUSION_REFERENCE,
  REQUEST_EXCLUSION_REFERENCE_SUCCESS,
  REQUEST_EXCLUSION_REFERENCE_FAILED,
  REQUEST_EXCLUSION_SAVE_PROGRESS,
  REQUEST_EXCLUSION_SAVE_SUCCESS,
  REQUEST_EXCLUSION_SAVE_FAILED,
  REQUEST_EXCLUSION_GET_UPDATE,
  REQUEST_EXCLUSION_GET_UPDATE_SUCCESS,
  REQUEST_EXCLUSION_GET_UPDATE_FAILED,
  REQUEST_EXCLUSION_UPDATE,
  REQUEST_EXCLUSION_UPDATE_SUCCESS,
  REQUEST_EXCLUSION_UPDATE_FAILED,
  REQUEST_EXCLUSION_DATA_CLEAR,
} from './const';
import setMessage from '../generic/action';
import {
  getExclusionList,
  getExclusionDelete,
  getRangeList,
  getExclusionSegment,
  getExclusionLiquidation,
  getExclusionFamily,
  getExclusionReference,
  getExclusionSave,
  getExclusionGetUpdate,
  getExclusionUpdate,
  getExclusionGroupSegment,
} from '../../api/postSale/exclusion';

function exclusionListProgress() {
  return {
    type: REQUEST_EXCLUSION_LIST,
  };
}

function exclusionListSuccess(ltExcl) {
  return {
    type: REQUEST_EXCLUSION_LIST_SUCCESS,
    ltExcl,
  };
}

function exclusionListSuccessEmpty() {
  return {
    type: REQUEST_EXCLUSION_LIST_EMPTY,
  };
}

function exclusionListFailed() {
  return {
    type: REQUEST_EXCLUSION_LIST_FAILED,
  };
}

function exclusionDeleteSuccess() {
  return {
    type: REQUEST_EXCLUSION_DELETE_SUCCESS,
  };
}

function exclusionDeleteFailed() {
  return {
    type: REQUEST_EXCLUSION_DELETE_FAILED,
  };
}

function exclusionRangeSuccess(groupSegment) {
  return {
    type: REQUEST_EXCLUSION_RANGE_SUCCESS,
    groupSegment,
  };
}

function exclusionRangeFailed() {
  return {
    type: REQUEST_EXCLUSION_RANGE_FAILED,
  };
}

function exclusionSegmentListSuccessEmpty() {
  return {
    type: REQUEST_EXCLUSION_SEGMENT_LIST_EMPTY,
  };
}

function exclusionSegmentSuccess(exSegment) {
  return {
    type: REQUEST_EXCLUSION_SEGMENT_LIST_SUCCESS,
    exSegment,
  };
}

function exclusionSegmentFailed() {
  return {
    type: REQUEST_EXCLUSION_SEGMENT_LIST_FAILED,
  };
}

function exclusionLiquidationSuccess(groupLiquidation) {
  return {
    type: REQUEST_EXCLUSION_LIQUIDATION_SUCCESS,
    groupLiquidation,
  };
}
function exclusionFamilyProgress() {
  return {
    type: REQUEST_EXCLUSION_FAMILY,
  };
}
function exclusionFamilySuccess(exFamily) {
  return {
    type: REQUEST_EXCLUSION_FAMILY_SUCCESS,
    exFamily,
  };
}

function exclusionFamilyFailed() {
  return {
    type: REQUEST_EXCLUSION_FAMILY_FAILED,
  };
}

function exclusionLiquidationFailed() {
  return {
    type: REQUEST_EXCLUSION_LIQUIDATION_FAILED,
  };
}

function exclusionReferenceProgress() {
  return {
    type: REQUEST_EXCLUSION_REFERENCE,
  };
}

function exclusionReferenceSuccess(exReference) {
  return {
    type: REQUEST_EXCLUSION_REFERENCE_SUCCESS,
    exReference,
  };
}

function exclusionReferenceFailed() {
  return {
    type: REQUEST_EXCLUSION_REFERENCE_FAILED,
  };
}

function exclusionSaveProgress() {
  return {
    type: REQUEST_EXCLUSION_SAVE_PROGRESS,
  };
}

function exclusionSaveSuccess() {
  return {
    type: REQUEST_EXCLUSION_SAVE_SUCCESS,
  };
}

function exclusionSaveFailed() {
  return {
    type: REQUEST_EXCLUSION_SAVE_FAILED,
  };
}

function exclusionGetUpdate() {
  return {
    type: REQUEST_EXCLUSION_GET_UPDATE,
  };
}

function exclusionGetUpdateSuccess(exclusionData) {
  return {
    type: REQUEST_EXCLUSION_GET_UPDATE_SUCCESS,
    exclusionData,
  };
}

function exclusionGetUpdateFailed() {
  return {
    type: REQUEST_EXCLUSION_GET_UPDATE_FAILED,
  };
}

function exclusionUpdate() {
  return {
    type: REQUEST_EXCLUSION_UPDATE,
  };
}

function exclusionUpdateSuccess() {
  return {
    type: REQUEST_EXCLUSION_UPDATE_SUCCESS,
  };
}

function exclusionUpdateFailed() {
  return {
    type: REQUEST_EXCLUSION_UPDATE_FAILED,
  };
}

function exclusionDataClear() {
  return {
    type: REQUEST_EXCLUSION_DATA_CLEAR,
  };
}

export function requestExclusion() {
  return (dispatch) => {
    dispatch(exclusionListProgress());
    getExclusionList()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(exclusionListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionListSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(exclusionListFailed());
        dispatch(setMessage('Error obteniendo las exclusiones', 'error'));
      });
  };
}

export function requestDeleteExclusion(id, callbackGetList) {
  return (dispatch) => {
    getExclusionDelete(id)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(exclusionDeleteSuccess());
          dispatch(setMessage(response.data.Message.Message, 'success'));
          callbackGetList();
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionDeleteFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(exclusionDeleteFailed());
        dispatch(setMessage('Error eliminando la exclusión', 'error'));
      });
  };
}

export function requestRangeExclusion() {
  return (dispatch) => {
    getRangeList()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(exclusionRangeSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionRangeFailed());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(exclusionRangeFailed());
        dispatch(setMessage('Error obteniendo segmento de exclusiones', 'error'));
      });
  };
}

export function requestSegmentExclusion() {
  return (dispatch) => {
    getExclusionSegment()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(exclusionSegmentSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionSegmentFailed());
          dispatch(setMessage('Error obteniendo segmento de exclusiones', 'error'));
        } else {
          dispatch(exclusionSegmentListSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(exclusionSegmentFailed());
        dispatch(setMessage('Error obteniendo segmento de exclusiones', 'error'));
      });
  };
}

export function requestFamilyExclusion() {
  return (dispatch) => {
    dispatch(exclusionFamilyProgress());
    getExclusionFamily()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(exclusionFamilySuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionFamilyFailed());
          dispatch(setMessage('Error obteniendo familia de exclusiones', 'error'));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(exclusionFamilyFailed());
        dispatch(setMessage('Error obteniendo familia de exclusiones', 'error'));
      });
  };
}

export function requestLiquidationExclusion() {
  return (dispatch) => {
    getExclusionLiquidation()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(exclusionLiquidationSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionLiquidationFailed());
          dispatch(setMessage('Error obteniendo campos de la liquidación', 'error'));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(exclusionLiquidationFailed());
        dispatch(setMessage('Error obteniendo campos de la liquidación', 'error'));
      });
  };
}

export function requestReference(value, next) {
  return (dispatch) => {
    dispatch(exclusionReferenceProgress());
    getExclusionReference(value)
      .then((response) => {
        console.log('response', response);
        if (response.data.Message.Flag && response.data.ModelData !== '') {
          dispatch(exclusionReferenceSuccess(response.data.ModelData));
          next(response.data.ModelData);
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionListSuccessEmpty());
          dispatch(setMessage(response.data.Message.Message, 'warning'));
        }
      })
      .catch((error) => {
        console.log('error', error);
        dispatch(exclusionReferenceFailed());
        dispatch(setMessage('Eror obteniendo las exclusiones', 'error'));
      });
  };
}

export function requestSaveExclusion(dataForm, next) {
  return (dispatch) => {
    dispatch(exclusionSaveProgress());
    getExclusionSave(dataForm)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(exclusionSaveSuccess());
          next();
          dispatch(setMessage(response.data.Message.Message, 'success'));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionSaveFailed());
          dispatch(setMessage(response.data.Message.Message, 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(exclusionSaveFailed());
        dispatch(setMessage('Error guardando datos de la exclusión', 'error'));
      });
  };
}

export function requestGetUpdateExclusion(id) {
  return (dispatch) => {
    dispatch(exclusionGetUpdate());
    getExclusionGetUpdate(id)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(exclusionGetUpdateSuccess(response.data.Exclusion));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionGetUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(exclusionGetUpdateFailed());
        dispatch(setMessage('Error consultando la exclusión a editar', 'error'));
      });
  };
}

export function requestUpdateExclusion(dataForm, next) {
  return (dispatch) => {
    dispatch(exclusionUpdate());
    getExclusionUpdate(dataForm)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(exclusionUpdateSuccess());
          next();
          dispatch(setMessage(response.data.Message.Message, 'success'));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(exclusionUpdateFailed());
        dispatch(setMessage('Error actualizando datos de la exclusión', 'error'));
      });
  };
}

export function requestDataExclusionClear() {
  return (dispatch) => {
    dispatch(exclusionDataClear());
  };
}

export function requestGroupSegmentExclusion(idForm) {
  return (dispatch) => {
    getExclusionGroupSegment(idForm)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(exclusionSegmentSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(exclusionSegmentFailed());
          dispatch(setMessage('Error obteniendo segmento de exclusiones', 'error'));
        } else {
          dispatch(exclusionSegmentListSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(exclusionSegmentFailed());
        dispatch(setMessage('Error obteniendo segmento de exclusiones', 'error'));
      });
  };
}
