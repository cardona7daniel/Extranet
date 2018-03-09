import {
  REQUEST_EVENTUALITY_LIST,
  REQUEST_EVENTUALITY_LIST_EMPTY,
  REQUEST_EVENTUALITY_LIST_FAILED,
  REQUEST_EVENTUALITY_LIST_SUCCESS,
  REQUEST_EVENTUALITY_DELETE_SUCCESS,
  REQUEST_EVENTUALITY_DELETE_FAILED,
  REQUEST_EVENTUALITY_SAVE_FAILED,
  REQUEST_EVENTUALITY_SAVE_PROGRESS,
  REQUEST_EVENTUALITY_SAVE_SUCCESS,
  REQUEST_EVENTUALITY_UPDATE_FAILED,
  REQUEST_EVENTUALITY_UPDATE_PROGRESS,
  REQUEST_EVENTUALITY_UPDATE_SUCCESS,
  REQUEST_EVENTUALITY_DATA_CLEAR,
  REQUEST_EVENTUALITY_SAVE_STATE_PROGRESS,
  REQUEST_EVENTUALITY_SAVE_STATE_SUCCESS,
  REQUEST_EVENTUALITY_SAVE_STATE_FAILED,
  REQUEST_EVENTUALITY_GET_COLUMNS_SEGMENT_PROGRESS,
  REQUEST_EVENTUALITY_GET_COLUMNS_SEGMENT_SUCCESS,
  REQUEST_EVENTUALITY_GET_COLUMNS_SEGMENT_FAILED,
  REQUEST_EVENTUALITY_GET_COLUMNS_SEGMENT_EMPTY,
  REQUEST_VALIDATE_EVENTUALITY_PROGRESS,
  REQUEST_VALIDATE_EVENTUALITY_SUCCESS,
  REQUEST_VALIDATE_EVENTUALITY_FAILED,
} from './const';

import setMessage from '../generic/action';

import {
  getEventualityList,
  getEventualityDelete,
  eventualitySave,
  getEventualityGetUpdate,
  eventualitySaveState,
  getSegmentColumns,
  dataEventualityFile,
} from '../../api/postSale/eventuality';

function evenListProgress() {
  return {
    type: REQUEST_EVENTUALITY_LIST,
  };
}

function evenListSuccess(ltsEventuality) {
  return {
    type: REQUEST_EVENTUALITY_LIST_SUCCESS,
    ltsEventuality,
  };
}

function evenListSuccessEmpty() {
  return {
    type: REQUEST_EVENTUALITY_LIST_EMPTY,
  };
}

function evenListFailed() {
  return {
    type: REQUEST_EVENTUALITY_LIST_FAILED,
  };
}

function evenGetColumnsSegmentProgress() {
  return {
    type: REQUEST_EVENTUALITY_GET_COLUMNS_SEGMENT_PROGRESS,
  };
}

function evenGetColumnsSegmentSuccess(ltColumnSegment) {
  return {
    type: REQUEST_EVENTUALITY_GET_COLUMNS_SEGMENT_SUCCESS,
    ltColumnSegment,
  };
}

function evenGetColumnsSegmentEmpty() {
  return {
    type: REQUEST_EVENTUALITY_GET_COLUMNS_SEGMENT_EMPTY,
  };
}

function evenGetColumnsSegmentFailed() {
  return {
    type: REQUEST_EVENTUALITY_GET_COLUMNS_SEGMENT_FAILED,
  };
}

function validateDataEventualityProgress() {
  return {
    type: REQUEST_VALIDATE_EVENTUALITY_PROGRESS,
  };
}

function validateDataEventualitySuccess(dataValidateEventuality) {
  return {
    type: REQUEST_VALIDATE_EVENTUALITY_SUCCESS,
    dataValidateEventuality,
  };
}

function validateDataEventualityFailed() {
  return {
    type: REQUEST_VALIDATE_EVENTUALITY_FAILED,
  };
}

function evenDeleteSuccess() {
  return {
    type: REQUEST_EVENTUALITY_DELETE_SUCCESS,
  };
}

function evenDeleteFailed() {
  return {
    type: REQUEST_EVENTUALITY_DELETE_FAILED,
  };
}

function evenSaveProgress() {
  return {
    type: REQUEST_EVENTUALITY_SAVE_PROGRESS,
  };
}

function evenSaveSuccess() {
  return {
    type: REQUEST_EVENTUALITY_SAVE_SUCCESS,
  };
}

function evenSaveFailed() {
  return {
    type: REQUEST_EVENTUALITY_SAVE_FAILED,
  };
}

function evenSaveStateProgress() {
  return {
    type: REQUEST_EVENTUALITY_SAVE_STATE_PROGRESS,
  };
}

function evenSaveStateSuccess() {
  return {
    type: REQUEST_EVENTUALITY_SAVE_STATE_SUCCESS,
  };
}

function evenSaveStateFailed() {
  return {
    type: REQUEST_EVENTUALITY_SAVE_STATE_FAILED,
  };
}

function evenGetUpdateProgress() {
  return {
    type: REQUEST_EVENTUALITY_UPDATE_PROGRESS,
  };
}

function evenGetUpdateSuccess(aDataForm) {
  return {
    type: REQUEST_EVENTUALITY_UPDATE_SUCCESS,
    aDataForm,
  };
}

function evenGetUpdateFailed() {
  return {
    type: REQUEST_EVENTUALITY_UPDATE_FAILED,
  };
}

function dataClear() {
  return {
    type: REQUEST_EVENTUALITY_DATA_CLEAR,
  };
}

export function requestEventuality(periodId) {
  return (dispatch) => {
    dispatch(evenListProgress());
    getEventualityList(periodId)
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
        dispatch(setMessage('Error obteniendo las eventualidades', 'error'));
      });
  };
}

export function validateDataEventuality(periodId) {
  return (dispatch) => {
    dispatch(validateDataEventualityProgress());
    dataEventualityFile(periodId)
      .then((response) => {
        dispatch(validateDataEventualitySuccess(response.data.ModelData));
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(validateDataEventualityFailed());
        dispatch(setMessage('Error validando datos en las eventualidades', 'error'));
      });
  };
}

export function requestDeleteEventuality(id, callbackGetList) {
  return (dispatch) => {
    getEventualityDelete(id)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(evenDeleteSuccess());
          dispatch(setMessage(response.data.Message.Message, 'success'));
          callbackGetList();
        } else if (response.data.Message.Flag === false) {
          dispatch(evenDeleteFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(evenDeleteFailed());
        dispatch(setMessage('Error eliminando la eventualidad', 'error'));
      });
  };
}

export function requestSaveEventuality(dataForm, next) {
  return (dispatch) => {
    dispatch(evenSaveProgress());
    eventualitySave(dataForm)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(evenSaveSuccess());
          next();
          dispatch(setMessage(response.data.Message.Message, 'success'));
        } else if (response.data.Message.Flag === false) {
          dispatch(evenSaveFailed());
          dispatch(setMessage(response.data.Message.Message, 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(evenSaveFailed());
        dispatch(setMessage('Error guardando datos de la eventualidad', 'error'));
      });
  };
}

export function requestGetUpdate(id) {
  return (dispatch) => {
    dispatch(evenGetUpdateProgress());
    getEventualityGetUpdate(id)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(evenGetUpdateSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(evenGetUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(evenGetUpdateFailed());
        dispatch(setMessage('Error consultando la eventualidad a editar', 'error'));
      });
  };
}

export function requestDataClear() {
  return (dispatch) => {
    dispatch(dataClear());
  };
}

export function requestSaveStateEventuality(eventualityState, PeriodId) {
  return (dispatch) => {
    dispatch(evenSaveStateProgress());
    eventualitySaveState(eventualityState, PeriodId)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(evenSaveStateSuccess());
          dispatch(setMessage(response.data.Message.Message, 'success'));
        } else if (response.data.Message.Flag === false) {
          dispatch(evenSaveStateFailed());
          dispatch(setMessage(response.data.Message.Message, 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(evenSaveStateFailed());
        dispatch(setMessage('Error guardando el estado de la eventualidad', 'error'));
      });
  };
}

export function requestGetSegmentColumns(periodId) {
  return (dispatch) => {
    dispatch(evenGetColumnsSegmentProgress());
    getSegmentColumns(periodId)
      .then((response) => {
        if (response.data.Message.Flag) {
          dispatch(evenGetColumnsSegmentSuccess(response.data.ModelData));
        } else if (!response.data.Message.Flag) {
          dispatch(evenGetColumnsSegmentEmpty());
          dispatch(setMessage('No existen segmentos configurados', 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(evenGetColumnsSegmentFailed());
        dispatch(setMessage('Error obteniendo las columnas de los segmentos', 'error'));
      });
  };
}

