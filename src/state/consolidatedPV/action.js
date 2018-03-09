import {
  REQUEST_CONSOLIDATED_LIST,
  REQUEST_CONSOLIDATED_LIST_SUCCESS,
  REQUEST_CONSOLIDATED_LIST_EMPTY,
  REQUEST_CONSOLIDATED_LIST_FAILED,
  REQUEST_CONSOLIDATED_SAVE,
  REQUEST_CONSOLIDATED_SAVE_SUCCESS,
  REQUEST_CONSOLIDATED_SAVE_FAILED,
} from './const';
import setMessage from '../generic/action';
import { getConsolidatedList, saveConsolidated } from '../../api/postSale/consolidated';

function consolidatedListProgress() {
  return {
    type: REQUEST_CONSOLIDATED_LIST,
  };
}

function consolidatedListSuccess(ltConsolidated) {
  return {
    type: REQUEST_CONSOLIDATED_LIST_SUCCESS,
    ltConsolidated,
  };
}

function consolidatedListSuccessEmpty() {
  return {
    type: REQUEST_CONSOLIDATED_LIST_EMPTY,
  };
}

function consolidatedListFailed() {
  return {
    type: REQUEST_CONSOLIDATED_LIST_FAILED,
  };
}

function consolidatedSaveProgress() {
  return {
    type: REQUEST_CONSOLIDATED_SAVE,
  };
}

function consolidatedSaveSuccess() {
  return {
    type: REQUEST_CONSOLIDATED_SAVE_SUCCESS,
  };
}

function consolidatedSaveFailed() {
  return {
    type: REQUEST_CONSOLIDATED_SAVE_FAILED,
  };
}

export function requestConsolidated() {
  return (dispatch) => {
    dispatch(consolidatedListProgress());
    getConsolidatedList()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(consolidatedListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(consolidatedListSuccessEmpty());
        }
      })
      .catch(() => {
        dispatch(consolidatedListFailed());
        dispatch(setMessage('Error obteniendo la configuración del Consolidado', 'error'));
      });
  };
}

export function requestSaveConsolidated(data, next) {
  return (dispatch) => {
    dispatch(consolidatedSaveProgress());
    saveConsolidated(data)
      .then((response) => {
        if (response.data.Message.Flag === true) {
          dispatch(consolidatedSaveSuccess());
          dispatch(setMessage(response.data.Message.Message, 'success'));
          next();
        } else if (response.data.Message.Flag === false) {
          dispatch(consolidatedSaveFailed());
        }
      })
      .catch(() => {
        dispatch(consolidatedSaveFailed());
        dispatch(setMessage('Error guardando la configuración del Cumplimiento delConsolidado', 'error'));
      });
  };
}

