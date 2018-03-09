import * as types from './const';
import * as api from '../../api/postSale/ranges';
import setMessage from '../generic/action';

// #region "requestAllAccompplishments"
export function rangesAllProgress() {
  return { type: types.REQUEST_ALL_RANGES };
}

export function rangesAllSuccess(accomplishments) {
  return {
    type: types.REQUEST_ALL_RANGES_SUCCESS,
    accomplishments,
  };
}

export function rangesAllSuccessEmpty() {
  return { type: types.REQUEST_ALL_RANGES_SUCCESS_EMPTY };
}

export function rangesAllFailed() {
  return { type: types.REQUEST_ALL_RANGES_FAILED };
}

export function requestAllRanges() {
  return (dispatch) => {
    dispatch(rangesAllProgress());
    api.getAllRanges()
      .then((response) => {
        if (response.data.ModelData) {
          dispatch(rangesAllSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(rangesAllSuccessEmpty());
        }
      })
      .catch(() => {
        dispatch(rangesAllFailed());
        dispatch(setMessage('Error obteniendo los porcentajes de Cumplimiento', 'error'));
      });
  };
}
// #endregion

// #region "filterItemsOnRemove"
export const removeAccomplishment = (id, next) => (dispatch) => {
  dispatch({
    type: types.ONREMOVE_ITEM_RANGES,
    item: id,
  });
  next();
};
// #endregion

// #region "filterItemsOnAdd"
export function addItemsOnAdd(Id) {
  return {
    type: types.ONADD_ITEM_RANGES,
    Id,
  };
}

export function filterItemsOnAdd(Id) {
  return (dispatch) => {
    dispatch(addItemsOnAdd(Id));
  };
}
// #endregion

// #region "validationMessage"
export function validationMessage(type) {
  return (dispatch) => {
    switch (type) {
      case '1':
        dispatch(setMessage('No se puede configurar porcentajes con campos vacíos.', 'error'));
        break;
      case '2':
        dispatch(setMessage('Ingrese el último valor con un porcentaje igual a "99999".', 'error'));
        break;
      default:
        break;
    }
  };
}
// #endregion

// #region "saveRanges"
export function rangesSaveFailed() {
  return { type: types.REQUEST_ALL_RANGES_FAILED };
}

export function saveRanges(params) {
  return (dispatch) => {
    dispatch(rangesAllProgress());
    api.saveRanges(params)
      .then((response) => {
        if (response.data.Message) {
          dispatch(requestAllRanges());
          dispatch(setMessage(response.data.Message.Message, 'success'));
        }
      })
      .catch(() => {
        dispatch(rangesSaveFailed());
        dispatch(setMessage('Error guardando los porcentajes de Cumplimiento', 'error'));
      });
  };
}

function rangesDeleteSuccess() {
  return {
    type: types.DELETE_ALL_RANGES_SUCCESS,
  };
}

function rangesDeleteFailed() {
  return {
    type: types.DELETE_ALL_RANGES_FAILED,
  };
}

export function requestDeleteRange(id, callbackGetList) {
  return (dispatch) => {
    api.getDeleteRange(id)
      .then((response) => {
        if (response.data.ModelData !== '') {
          dispatch(rangesDeleteSuccess());
          dispatch(setMessage(response.data.Message.Message, 'success'));
          callbackGetList();
        } else if (response.data.Message.Flag === false) {
          dispatch(rangesDeleteFailed());
        }
      })
      .catch((error) => {
        console.log(error.response);
        dispatch(rangesDeleteFailed());
        dispatch(setMessage('Error eliminando la exclusión', 'error'));
      });
  };
}
// #endregion
