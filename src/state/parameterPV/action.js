import * as actions from './const';
import setMessage from '../generic/action';
import * as api from '../../api/postSale/parameter';

function paramListProgress() {
  return {
    type: actions.REQUEST_PARAMETER_LIST,
  };
}

function paramListSuccess(ltParams) {
  return {
    type: actions.REQUEST_PARAMETER_LIST_SUCCESS,
    ltParams,
  };
}

function paramListEmpty() {
  return {
    type: actions.REQUEST_PARAMETER_LIST_EMPTY,
  };
}

function paramListFailed() {
  return {
    type: actions.REQUEST_PARAMETER_LIST_FAILED,
  };
}

function paramColumnProgress() {
  return {
    type: actions.REQUEST_PARAMETER_LIST_COL,
  };
}

function paramColumnSuccess(ltColumns) {
  return {
    type: actions.REQUEST_PARAMETER_LIST_SUCCESS_COL,
    ltColumns,
  };
}

function paramColumnEmpty() {
  return {
    type: actions.REQUEST_PARAMETER_LIST_EMPTY_COL,
  };
}

function paramColumnFailed() {
  return {
    type: actions.REQUEST_PARAMETER_LIST_FAILED_COL,
  };
}

function paramColorSuccess(ltColors) {
  return {
    type: actions.REQUEST_PARAMETER_LIST_COLOR_SUCCESS,
    ltColors,
  };
}

function paramColorFailed() {
  return {
    type: actions.REQUEST_PARAMETER_LIST_COLOR_FAILED,
  };
}

export function requestParameter(type) {
  return (dispatch) => {
    dispatch(paramListProgress());
    api.getParameterList(type)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(paramListSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(paramListEmpty());
        }
      })
      .catch(() => {
        dispatch(paramListFailed());
        dispatch(setMessage('Error obteniendo los parametros', 'error'));
      });
  };
}

export function requestColumns() {
  return (dispatch) => {
    dispatch(paramColumnProgress());
    api.getParameterColumn()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(paramColumnSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(paramColumnEmpty());
        }
      })
      .catch(() => {
        dispatch(paramColumnFailed());
        dispatch(setMessage('Error obteniendo las columnas', 'error'));
      });
  };
}

export function requestColors() {
  return (dispatch) => {
    api.getParameterColor()
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(paramColorSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(paramColorFailed());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(paramColorFailed());
        dispatch(setMessage('Error obteniendo colores', 'error'));
      });
  };
}
