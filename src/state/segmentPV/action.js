import * as types from './const';
import setMessage from '../generic/action';
import * as api from '../../api/postSale/segment';

function evenListProgress() {
  return {
    type: types.REQUEST_SEGMENT_LIST,
  };
}

function evenListSuccess(ltsGroupSegment) {
  return {
    type: types.REQUEST_SEGMENT_LIST_SUCCESS,
    ltsGroupSegment,
  };
}

function evenListSuccessEmpty() {
  return {
    type: types.REQUEST_SEGMENT_LIST_EMPTY,
  };
}

function evenListFailed() {
  return {
    type: types.REQUEST_SEGMENT_LIST_FAILED,
  };
}

export function requestGroupSegment() {
  return (dispatch) => {
    dispatch(evenListProgress());
    api.getSegmentList()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(evenListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(evenListSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(evenListFailed());
        dispatch(setMessage('Error obteniendo los segmentos', 'error'));
      });
  };
}

function segmentSaveProgress() {
  return {
    type: types.REQUEST_SEGMENT_SAVE_PROGRESS,
  };
}

function segmentSaveSuccess() {
  return {
    type: types.REQUEST_SEGMENT_SAVE_SUCCESS,
  };
}

function segmentSaveFailed() {
  return {
    type: types.REQUEST_SEGMENT_SAVE_FAILED,
  };
}

export function requestSave(dataForm, next) {
  return (dispatch) => {
    dispatch(segmentSaveProgress());
    api.segmentSave(dataForm)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(segmentSaveSuccess());
          next();
          dispatch(setMessage(response.data.Message.Message, 'success'));
        } else if (response.data.Message.Flag === false) {
          dispatch(segmentSaveFailed());
          dispatch(setMessage(response.data.Message.Message, 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(segmentSaveFailed());
        dispatch(setMessage('Error guardando datos del grupo de segmento', 'error'));
      });
  };
}

function segmentGetUpdate() {
  return {
    type: types.REQUEST_SEGMENT_GET_UPDATE,
  };
}

function segmentGetUpdateSuccess(segmentData) {
  return {
    type: types.REQUEST_SEGMENT_GET_UPDATE_SUCCESS,
    segmentData,
  };
}

function segmentGetUpdateFailed() {
  return {
    type: types.REQUEST_SEGMENT_GET_UPDATE_FAILED,
  };
}

export function requestGetUpdate(id) {
  return (dispatch) => {
    dispatch(segmentGetUpdate());
    api.getSegmentGetUpdate(id)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(segmentGetUpdateSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(segmentGetUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(segmentGetUpdateFailed());
        dispatch(setMessage('Error consultando la exclusión a editar', 'error'));
      });
  };
}

function segmentUpdate() {
  return {
    type: types.REQUEST_SEGMENT_GET_UPDATE,
  };
}

function segmentUpdateSuccess() {
  return {
    type: types.REQUEST_SEGMENT_GET_UPDATE_SUCCESS,
  };
}

function segmentUpdateFailed() {
  return {
    type: types.REQUEST_SEGMENT_GET_UPDATE_FAILED,
  };
}

export function requestUpdate(dataForm, next) {
  return (dispatch) => {
    dispatch(segmentUpdate());
    api.getSegmentUpdate(dataForm)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(segmentUpdateSuccess());
          next();
          dispatch(setMessage(response.data.Message.Message, 'success'));
        } else if (response.data.Message.Flag === false) {
          dispatch(segmentUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(segmentUpdateFailed());
        dispatch(setMessage('Error actualizando datos del grupo del segmento', 'error'));
      });
  };
}

function segmentDataClear() {
  return {
    type: types.REQUEST_SEGMENT_DATA_CLEAR,
  };
}

export function requestDataClear() {
  return (dispatch) => {
    dispatch(segmentDataClear());
  };
}

