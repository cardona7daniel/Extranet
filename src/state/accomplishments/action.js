import * as types from './const';
import * as api from '../../api/newVehicle/accomplishments';
import setMessage from '../generic/action';

// #region "requestAllAccompplishments"
export function accomplishAllProgress() {
  return { type: types.REQUEST_ALL_ACCOMPLISHMENTS };
}

export function accomplishAllSuccess(accomplishments) {
  return {
    type: types.REQUEST_ALL_ACCOMPLISHMENTS_SUCCESS,
    accomplishments,
  };
}

export function accomplishAllSuccessEmpty() {
  return { type: types.REQUEST_ALL_ACCOMPLISHMENTS_SUCCESS_EMPTY };
}

export function accomplishAllFailed() {
  return { type: types.REQUEST_ALL_ACCOMPLISHMENTS_FAILED };
}

export function requestAllAccomplishments() {
  return (dispatch) => {
    dispatch(accomplishAllProgress());
    api.getAllAccomplish()
      .then((response) => {
        if (response.data.ModelData) {
          dispatch(accomplishAllSuccess(response.data.ModelData));
        } else if (response.data.Message.Flag === false) {
          dispatch(accomplishAllSuccessEmpty());
        }
      })
      .catch(() => {
        dispatch(accomplishAllFailed());
        dispatch(setMessage('Error obteniendo los porcentajes de Cumplimiento', 'error'));
      });
  };
}
// #endregion

// #region "filterItemsOnRemove"

export const removeAccomplishment = (id, next) => (dispatch) => {
  dispatch({
    type: types.ONREMOVE_ITEM_ACCOMPLISHMENTS,
    item: id,
  });
  next();
};

// #endregion

// #region "filterItemsOnAdd"
export function addItemsOnAdd(Id) {
  return {
    type: types.ONADD_ITEM_ACCOMPLISHMENTS,
    Id,
  };
}

export function filterItemsOnAdd(Id) {
  return (dispatch) => {
    dispatch(addItemsOnAdd(Id));
  };
}
// #endregion

// region "validationMessage"
export function validationMessage(type) {
  return (dispatch) => {
    switch (type) {
      case '1':
        dispatch(setMessage('El primer valor inicial en el Rango debe ser Cero.', 'error'));
        break;
      case '2':
        dispatch(setMessage('Ingrese el último valor con un porcentaje igual a "99999".', 'error'));
        break;
      default:
        break;
    }
  };
}
// endregion

// region "saveAccomplishments"
export function accomplishSaveFailed() {
  return { type: types.REQUEST_ALL_ACCOMPLISHMENTS_FAILED };
}

export function saveAccomplishments(params) {
  return (dispatch) => {
    dispatch(accomplishAllProgress());
    api.saveAccomplishments(params)
      .then((response) => {
        if (response.data.Message) {
          dispatch(requestAllAccomplishments());
          dispatch(setMessage(response.data.Message.Message, 'success'));
        }
      })
      .catch(() => {
        dispatch(accomplishSaveFailed());
        dispatch(setMessage('Error guardando los porcentajes de Cumplimiento', 'error'));
      });
  };
}
// #endregion
