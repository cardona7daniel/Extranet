import {
  REQUEST_PERIODLIQ_LIST,
  REQUEST_PERIODLIQ_LIST_SUCCESS,
  REQUEST_PERIODLIQ_LIST_EMPTY,
  REQUEST_PERIODLIQ_LIST_FAILED,
  REQUEST_PERIODLIQ_DELETE_SUCCESS,
  REQUEST_PERIODLIQ_DELETE_FAILED,
  REQUEST_PERIODLIQ_SAVE_PROGRESS,
  REQUEST_PERIODLIQ_SAVE_SUCCESS,
  REQUEST_PERIODLIQ_SAVE_FAILED,
  REQUEST_PERIODLIQ_GET_UPDATE,
  REQUEST_PERIODLIQ_GET_UPDATE_SUCCESS,
  REQUEST_PERIODLIQ_GET_UPDATE_FAILED,
  REQUEST_PERIODLIQ_VERIFY_NPS_SUCCESS_TRUE,
  REQUEST_PERIODLIQ_VERIFY_NPS_SUCCESS_FALSE,
  REQUEST_PERIODLIQ_VERIFY_NPS_FAILED,
} from './const';

import setMessage from '../generic/action';

import {
  getPeriodList,
  getPeriodDelete,
  PeriodLiqSave,
  getPeriodGetUpdate,
  VerifyDataNpsLiquidation,
} from '../../api/postSale/periodLiq';

function periodListProgress() {
  return {
    type: REQUEST_PERIODLIQ_LIST,
  };
}

function periodListSuccess(ltPeriod) {
  return {
    type: REQUEST_PERIODLIQ_LIST_SUCCESS,
    ltPeriod,
  };
}

function periodListSuccessEmpty() {
  return {
    type: REQUEST_PERIODLIQ_LIST_EMPTY,
  };
}

function periodListFailed() {
  return {
    type: REQUEST_PERIODLIQ_LIST_FAILED,
  };
}

function periodDeleteSuccess() {
  return {
    type: REQUEST_PERIODLIQ_DELETE_SUCCESS,
  };
}

function periodDeleteFailed() {
  return {
    type: REQUEST_PERIODLIQ_DELETE_FAILED,
  };
}

function periodSaveProgress() {
  return {
    type: REQUEST_PERIODLIQ_SAVE_PROGRESS,
  };
}

function periodSaveSuccess() {
  return {
    type: REQUEST_PERIODLIQ_SAVE_SUCCESS,
  };
}

function periodSaveFailed() {
  return {
    type: REQUEST_PERIODLIQ_SAVE_FAILED,
  };
}

function periodGetUpdateProgress() {
  return {
    type: REQUEST_PERIODLIQ_GET_UPDATE,
  };
}

function periodGetUpdateSuccess(periodData) {
  return {
    type: REQUEST_PERIODLIQ_GET_UPDATE_SUCCESS,
    periodData,
  };
}

function periodGetUpdateFailed() {
  return {
    type: REQUEST_PERIODLIQ_GET_UPDATE_FAILED,
  };
}

function periodVerifyDataNpsSuccessTrue() {
  return {
    type: REQUEST_PERIODLIQ_VERIFY_NPS_SUCCESS_TRUE,
  };
}

function periodVerifyDataNpsSuccessFalse() {
  return {
    type: REQUEST_PERIODLIQ_VERIFY_NPS_SUCCESS_FALSE,
  };
}

function periodVerifyDataNpsFailed() {
  return {
    type: REQUEST_PERIODLIQ_VERIFY_NPS_FAILED,
  };
}

export function requestPeriod() {
  return (dispatch) => {
    dispatch(periodListProgress());
    getPeriodList()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(periodListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(periodListSuccessEmpty());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(periodListFailed());
        dispatch(setMessage('Error obteniendo los periodos de liquidación', 'error'));
      });
  };
}

export function requestDeletePeriod(id, callbackGetList) {
  return (dispatch) => {
    getPeriodDelete(id)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(periodDeleteSuccess());
          dispatch(setMessage(response.data.Message.Message, 'success'));
          callbackGetList();
        } else if (response.data.Message.Flag === false) {
          dispatch(periodDeleteFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(periodDeleteFailed());
        dispatch(setMessage('Error eliminando el periodo de liquidación', 'error'));
      });
  };
}

export function requestSavePeriod(dataForm, next) {
  return (dispatch) => {
    dispatch(periodSaveProgress());
    PeriodLiqSave(dataForm)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(periodSaveSuccess());
          next();
          dispatch(setMessage(response.data.Message.Message, 'success'));
        } else if (response.data.Message.Flag === false) {
          dispatch(periodSaveFailed());
          dispatch(setMessage(response.data.Message.Message, 'warning'));
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(periodSaveFailed());
        dispatch(setMessage('Error guardando datos del periodo de liquidación', 'error'));
      });
  };
}

export function requestVerifyNps(id) {
  return (dispatch) => {
    VerifyDataNpsLiquidation(id)
      .then((response) => {
        if (response.data.Message.Flag) {
          dispatch(periodVerifyDataNpsSuccessTrue());
        } else if (!response.data.Message.Flag) {
          dispatch(periodVerifyDataNpsSuccessFalse());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(periodVerifyDataNpsFailed());
        dispatch(setMessage('Error validando el estado nps - periodo Liquidación', 'error'));
      });
  };
}

export function requestGetUpdatePeriod(id) {
  return (dispatch) => {
    dispatch(periodGetUpdateProgress());
    getPeriodGetUpdate(id)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(periodGetUpdateSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(periodGetUpdateFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(periodGetUpdateFailed());
        dispatch(setMessage('Error consultando el periodo de liquidación a editar', 'error'));
      });
  };
}
