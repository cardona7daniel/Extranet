import {
  REQUEST_NPS_LIST,
  REQUEST_NPS_LIST_SUCCESS,
  REQUEST_NPS_LIST_EMPTY,
  REQUEST_NPS_LIST_FAILED,
  REQUEST_NPS_SAVE,
  REQUEST_NPS_SAVE_SUCCESS,
  REQUEST_NPS_SAVE_FAILED,
} from './const';
import setMessage from '../generic/action';
import { getNpsList, saveNps } from '../../api/postSale/nps';

function npsListProgress() {
  return {
    type: REQUEST_NPS_LIST,
  };
}

function npsListSuccess(ltNps) {
  return {
    type: REQUEST_NPS_LIST_SUCCESS,
    ltNps,
  };
}

function npsListSuccessEmpty() {
  return {
    type: REQUEST_NPS_LIST_EMPTY,
  };
}

function npsListFailed() {
  return {
    type: REQUEST_NPS_LIST_FAILED,
  };
}

function npsSaveProgress() {
  return {
    type: REQUEST_NPS_SAVE,
  };
}

function npsSaveSuccess() {
  return {
    type: REQUEST_NPS_SAVE_SUCCESS,
  };
}

function npsSaveFailed() {
  return {
    type: REQUEST_NPS_SAVE_FAILED,
  };
}

export function requestNps() {
  return (dispatch) => {
    dispatch(npsListProgress());
    getNpsList()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(npsListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(npsListSuccessEmpty());
        }
      })
      .catch(() => {
        dispatch(npsListFailed());
        dispatch(setMessage('Error obteniendo la configuración NPS', 'error'));
      });
  };
}

export function requestSaveNps(data, next) {
  return (dispatch) => {
    dispatch(npsSaveProgress());
    saveNps(data)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(npsSaveSuccess());
          dispatch(setMessage(response.data.Message.Message, 'success'));
          next();
        } else if (response.data.Message.Flag === false) {
          dispatch(npsSaveFailed());
        }
      })
      .catch(() => {
        dispatch(npsSaveFailed());
        dispatch(setMessage('Error guardando la configuración NPS', 'error'));
      });
  };
}
